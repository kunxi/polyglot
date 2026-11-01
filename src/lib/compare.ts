export interface Section {
  level: number;
  heading: string;
  content: string;
  children: Section[];
}

export interface ItemRow {
  label: string;
  content1: string;
  content2: string;
}

export interface Block {
  type: 'h2' | 'h3' | 'h4' | 'table' | 'intro' | 'group-intro';
  heading?: string;
  items?: ItemRow[];
  intro?: { meta: string; lang1: string; lang2: string };
  prose?: { content1: string; content2: string };
}

// -- parse markdown into section tree --

export function parseSections(text: string): Section {
  const lines = text.split('\n');
  const root: Section = { level: 0, heading: '', content: '', children: [] };
  const stack = [root];
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (stack.length > 0) stack[stack.length - 1].content += line + '\n';
      continue;
    }
    if (inCodeBlock) {
      if (stack.length > 0) stack[stack.length - 1].content += line + '\n';
      continue;
    }
    const m = line.match(/^(#{1,6})\s+(.+)/);
    if (m) {
      const node: Section = { level: m[1].length, heading: m[2].trim(), content: '', children: [] };
      while (stack[stack.length - 1].level >= node.level) stack.pop();
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    } else if (stack.length > 0) {
      stack[stack.length - 1].content += line + '\n';
    }
  }
  return root;
}

// -- markdown to HTML --

export function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const BLOCK_PLACEHOLDER = '%%BLOCK%%';

export function renderMD(s: string): string {
  let out = s.trim();
  if (!out) return '';

  const blocks: string[] = [];
  out = out.replace(/```(\w*)\n([\s\S]*?)```/g,
    (_: string, lang: string, code: string) => {
      blocks.push(`<pre><code class="language-${lang}">${esc(code.trim())}</code></pre>`);
      return BLOCK_PLACEHOLDER + (blocks.length - 1) + BLOCK_PLACEHOLDER;
    }
  );

  out = esc(out);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\[([^\]]+)\]\(((?:https?:\/\/)[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  const parts = out.split(/\n\n+/);
  return parts.map((p: string) => {
    p = p.trim();
    if (!p) return '';
    p = p.replace(new RegExp(BLOCK_PLACEHOLDER + '(\\d+)' + BLOCK_PLACEHOLDER, 'g'), (_: string, i: string) => blocks[+i]);
    if (p.startsWith('<pre>')) return p;
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).filter(Boolean).join('\n');
}

// -- helpers --

export function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function buildLookup(node: Section): Map<string, Section> {
  const map = new Map<string, Section>();
  function walk(n: Section) {
    if (n.heading) map.set(normalize(n.heading), n);
    for (const c of n.children) walk(c);
  }
  walk(node);
  return map;
}

function findChild(node: Section, heading: string): Section | undefined {
  return node.children.find((c) => normalize(c.heading) === normalize(heading));
}

// -- meta.md validation & template rendering --

// meta.md and language files share the same tree shape; sections nest to
// arbitrary depth (h2 category -> h3 topic -> h4 group -> h5 leaf).
export function validateLanguage(langTree: Section, metaTree: Section, langName: string): void {
  const langRoot = langTree.children.find((c) => c.level === 1);
  if (!langRoot) throw new Error(`${langName}: missing h1 title`);
  const metaRoot = metaTree.children.find((c) => c.level === 1);
  if (!metaRoot) throw new Error('meta.md: missing h1 title');

  function walk(langNode: Section, metaNode: Section, path: string) {
    for (const child of langNode.children) {
      const m = findChild(metaNode, child.heading);
      if (!m) {
        throw new Error(`${langName}: section "${child.heading}" under "${path}" not found in meta.md`);
      }
      walk(child, m, `${path} > ${child.heading}`);
    }
  }

  walk(langRoot, metaRoot, langName);
}

export function renderComparison(metaTree: Section, lang1Tree: Section, lang2Tree: Section): Block[] {
  const metaRoot = metaTree.children.find((c) => c.level === 1);
  if (!metaRoot) throw new Error('meta.md: missing h1 title');
  const l1 = lang1Tree.children.find((c) => c.level === 1);
  const l2 = lang2Tree.children.find((c) => c.level === 1);
  const blocks: Block[] = [];

  function headingType(level: number): 'h2' | 'h3' | 'h4' {
    if (level === 2) return 'h2';
    if (level === 3) return 'h3';
    return 'h4';
  }

  function walk(metaNode: Section, n1: Section | undefined, n2: Section | undefined) {
    if (metaNode.level >= 2) {
      blocks.push({ type: headingType(metaNode.level), heading: metaNode.heading });
    }

    const c1 = n1?.content ?? '';
    const c2 = n2?.content ?? '';
    if (metaNode.content.trim()) {
      blocks.push({ type: 'intro', intro: { meta: metaNode.content, lang1: c1, lang2: c2 } });
    } else if (c1.trim() || c2.trim()) {
      blocks.push({ type: 'group-intro', prose: { content1: c1, content2: c2 } });
    }

    if (metaNode.children.length === 0) return;

    const childrenAreLeaves = metaNode.children.every((c) => c.children.length === 0);
    if (childrenAreLeaves) {
      const items: ItemRow[] = [];
      for (const leaf of metaNode.children) {
        const leaf1 = n1 ? findChild(n1, leaf.heading) : undefined;
        const leaf2 = n2 ? findChild(n2, leaf.heading) : undefined;
        items.push({ label: leaf.heading, content1: leaf1?.content ?? '', content2: leaf2?.content ?? '' });
      }
      blocks.push({ type: 'table', items });
    } else {
      for (const child of metaNode.children) {
        const c1n = n1 ? findChild(n1, child.heading) : undefined;
        const c2n = n2 ? findChild(n2, child.heading) : undefined;
        walk(child, c1n, c2n);
      }
    }
  }

  for (const child of metaRoot.children) {
    walk(
      child,
      l1 ? findChild(l1, child.heading) : undefined,
      l2 ? findChild(l2, child.heading) : undefined
    );
  }

  return blocks;
}
