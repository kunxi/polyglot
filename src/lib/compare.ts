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

// -- flatten into display blocks --

export function collectItems(node: Section, lookIn2: Section | null): ItemRow[] {
  const items: ItemRow[] = [];

  // h3 direct content from either side as first row with empty label
  const c1 = node.content.trim();
  const c2 = (lookIn2?.content ?? '').trim();
  if (c1 || c2) {
    items.push({ label: '', content1: node.content, content2: lookIn2?.content ?? '' });
  }

  const hasH4 = node.children.some((c: Section) => c.level >= 4);
  const matchHasH4 = lookIn2?.children.some((c: Section) => c.level >= 4);

  // ponytail: scoped lookup within the matched h3, not global, to avoid
  // collisions when both Dictionary and List have headings like "literal"
  const matchKids = buildLookup(lookIn2 ?? { level: 0, heading: '', content: '', children: [] });

  if (hasH4) {
    for (const gc of node.children) {
      if (gc.level >= 4) {
        const gm = matchKids.get(normalize(gc.heading));
        items.push({ label: gc.heading, content1: gc.content, content2: gm?.content ?? '' });
      }
    }
  } else if (matchHasH4 && lookIn2) {
    for (const gc of lookIn2.children) {
      if (gc.level >= 4) {
        // lang2 leads, so look in lang1's h3 for matching h4
        const gm = buildLookup(node).get(normalize(gc.heading));
        items.push({ label: gc.heading, content1: gm?.content ?? '', content2: gc.content });
      }
    }
  }
  return items;
}

export function flatten(node: Section, lookup2: Map<string, Section>): Block[] {
  const blocks: Block[] = [];

  function walk(n: Section) {
    for (const child of n.children) {
      if (child.level === 2) {
        blocks.push({ type: 'h2', heading: child.heading });
        walk(child);
      } else if (child.level === 3) {
        const match = lookup2.get(normalize(child.heading));
        blocks.push({ type: 'h3', heading: child.heading });
        blocks.push({ type: 'table', items: collectItems(child, match) });
        walk(child);
      } else {
        walk(child);
      }
    }
  }

  walk(node);
  return blocks;
}