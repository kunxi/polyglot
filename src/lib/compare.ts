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
  type: 'h2' | 'h3' | 'table';
  heading?: string;
  items?: ItemRow[];
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

// meta.md and language files share the same shape:
// h1 = title, h2 = topic, h3 = group, h4 = leaf.
export function validateLanguage(langTree: Section, metaTree: Section, langName: string): void {
  const langRoot = langTree.children.find((c) => c.level === 1);
  if (!langRoot) throw new Error(`${langName}: missing h1 title`);
  const metaRoot = metaTree.children.find((c) => c.level === 1);
  if (!metaRoot) throw new Error('meta.md: missing h1 title');

  for (const topic of langRoot.children) {
    const metaTopic = findChild(metaRoot, topic.heading);
    if (!metaTopic) {
      throw new Error(`${langName}: topic "${topic.heading}" not found in meta.md`);
    }
    for (const group of topic.children) {
      const metaGroup = findChild(metaTopic, group.heading);
      if (!metaGroup) {
        throw new Error(`${langName}: section "${group.heading}" under "${topic.heading}" not found in meta.md`);
      }
      for (const leaf of group.children) {
        if (!findChild(metaGroup, leaf.heading)) {
          throw new Error(`${langName}: section "${leaf.heading}" under "${topic.heading} > ${group.heading}" not found in meta.md`);
        }
      }
    }
  }
}

export function renderComparison(metaTree: Section, lang1Tree: Section, lang2Tree: Section): Block[] {
  const metaRoot = metaTree.children.find((c) => c.level === 1);
  if (!metaRoot) throw new Error('meta.md: missing h1 title');
  const l1 = lang1Tree.children.find((c) => c.level === 1);
  const l2 = lang2Tree.children.find((c) => c.level === 1);
  const blocks: Block[] = [];

  for (const topic of metaRoot.children) {
    blocks.push({ type: 'h2', heading: topic.heading });
    const t1 = l1 ? findChild(l1, topic.heading) : undefined;
    const t2 = l2 ? findChild(l2, topic.heading) : undefined;

    for (const group of topic.children) {
      blocks.push({ type: 'h3', heading: group.heading });
      const g1 = t1 ? findChild(t1, group.heading) : undefined;
      const g2 = t2 ? findChild(t2, group.heading) : undefined;

      const items: ItemRow[] = [];
      if ((g1?.content ?? '').trim() || (g2?.content ?? '').trim()) {
        items.push({ label: '', content1: g1?.content ?? '', content2: g2?.content ?? '' });
      }

      for (const leaf of group.children) {
        const leaf1 = g1 ? findChild(g1, leaf.heading) : undefined;
        const leaf2 = g2 ? findChild(g2, leaf.heading) : undefined;
        items.push({ label: leaf.heading, content1: leaf1?.content ?? '', content2: leaf2?.content ?? '' });
      }

      blocks.push({ type: 'table', items });
    }
  }

  return blocks;
}
