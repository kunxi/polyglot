import { describe, it, expect } from 'vitest';
import { parseSections, renderMD, normalize, buildLookup, collectItems, flatten, esc } from '../src/lib/compare';

const PYTHON_MD = `# Kotlin

## Collections

### Dictionary

#### literal

\`\`\`python
d = {'t': 1, 'f': 0}
\`\`\`

#### size
\`len(d)\`

#### lookup

\`\`\`python
d['t']  # may raise KeyError
d.get('foo')  # returns None
\`\`\`

#### update

\`\`\`python
d['u'] = -1

d.update(u=-1)
\`\`\`

#### is key present
\`\`\`python
'y' in d
d.__contains__('y')
\`\`\`

#### delete
\`\`\`python
del d['t']  # may raise KeyError
v = d.pop('t')  # may raise KeyError
v = d.pop('t', None)  # returns None if t is absent
\`\`\`

#### from array of pairs

\`\`\`python
a = [['a', 1], ['b', 2], ['c', 3]]
d = dict(a)

a = ['a', 1, 'b', 2, 'c', 3]
d = dict(zip(a[::2], a[1::2]))
\`\`\`

#### merge

\`\`\`python
d.update({'a': 1, 'b': 2})
d.udpate(a=1, b=2)
\`\`\`

#### invert

\`\`\`python
to_sym = {v: k for k, v in d.items()}
\`\`\`

#### keys and values as arrays

\`keys()\` and \`values()\` return iterators
in Python 3 and lists in Python 2

\`\`\`python
list(d.keys())
list(d.values())
\`\`\`
`;

const KOTLIN_MD = `# Kotlin

## Collections

### Dictionary

\`Map<K, V>\` is not an inheritor of the Collection interface; however, it's a Kotlin collection type as well

#### literal

\`\`\`kotlin
val d = mapOf('t' to 1, 'f' to 0)
\`\`\`

#### size
\`d.size\`

#### lookup

\`\`\`kotlin
d['t']  // may return null
d.get('t')  // may return null
\`\`\`

#### update
\`\`\`kotlin
val d = mutalbleMapOf('t' to 1, 'f' to 0)

d['u'] = -1
d.put('u', -1)
\`\`\`

#### is key present

\`\`\`kotlin
'c' in d
d.contains('c')
\`\`\`

#### delete
\`\`\`kotlin
v = d.remove('t')  // return None if t is absent
\`\`\`

#### from array of pairs

\`\`\`kotlin
val keys = listOf('t', 'f')
val values = listOf(1, 0)
val d = (keys zip values).map { it.first to it.second }.toMap()
\`\`\`

#### merge

\`\`\`kotlin
d.putAll(mapOf('u' to -1))
\`\`\`

#### invert

\`\`\`kotlin
d.map { it.value to it.key }.toMap()
\`\`\`

#### keys and values as arrays

\`keys\` and \`values\` returns the set of keys and values respectively.
`;

// -- parseSections --

describe('parseSections', () => {
  it('parses a flat heading tree', () => {
    const md = '# Title\n\n## Section\nsome text\n\n### Sub\nmore';
    const tree = parseSections(md);
    expect(tree.children.length).toBe(1);
    expect(tree.children[0].level).toBe(1);
    expect(tree.children[0].heading).toBe('Title');
    expect(tree.children[0].children.length).toBe(1);
    expect(tree.children[0].children[0].level).toBe(2);
    expect(tree.children[0].children[0].heading).toBe('Section');
    expect(tree.children[0].children[0].content).toContain('some text');
  });

  it('collects content under a heading until the next heading', () => {
    const md = `# H1\n\ncontent here\nmore content\n\n## H2`;
    const tree = parseSections(md);
    expect(tree.children[0].content.trim()).toBe('content here\nmore content');
  });

  it('handles empty input', () => {
    const tree = parseSections('');
    expect(tree.level).toBe(0);
    expect(tree.children).toHaveLength(0);
  });

  it('parses the full Python markdown', () => {
    const tree = parseSections(PYTHON_MD);
    // h1 -> h2 -> h3 -> 10 h4 items
    const h2 = tree.children[0]?.children[0];
    expect(h2?.heading).toBe('Collections');
    const h3 = h2?.children[0];
    expect(h3?.heading).toBe('Dictionary');
    expect(h3?.children).toHaveLength(10);
    const headings = h3!.children.map(c => c.heading);
    expect(headings).toContain('literal');
    expect(headings).toContain('size');
    expect(headings).toContain('keys and values as arrays');
  });

  it('parses Kotlin markdown identically in structure', () => {
    const tree = parseSections(KOTLIN_MD);
    const h3 = tree.children[0]?.children[0]?.children[0];
    expect(h3?.heading).toBe('Dictionary');
    expect(h3?.children).toHaveLength(10);
    // Kotlin has h3 content (the Map description)
    expect(h3?.content).toContain('Map');
  });

  it('ignores # lines inside fenced code blocks', () => {
    const md = `# Title\n\n## Section\n\n### Sub\n\n#### item1\n\n\`\`\`python\n# this is a comment, not a heading\n# neither is this\n\`\`\`\n\n#### item2\ntext\n`;
    const tree = parseSections(md);
    const h3 = tree.children[0]?.children[0]?.children[0];
    expect(h3?.heading).toBe('Sub');
    expect(h3?.children.map(c => c.heading)).toEqual(['item1', 'item2']);
    expect(h3?.children[0].content).toContain('# this is a comment');
  });
});

// -- renderMD --

describe('renderMD', () => {
  it('returns empty string for empty input', () => {
    expect(renderMD('')).toBe('');
    expect(renderMD('   \n  ')).toBe('');
  });

  it('wraps plain text in <p>', () => {
    const html = renderMD('hello world');
    expect(html).toBe('<p>hello world</p>');
  });

  it('renders inline code', () => {
    const html = renderMD('use `foo()` here');
    expect(html).toBe('<p>use <code>foo()</code> here</p>');
  });

  it('renders fenced code blocks', () => {
    const html = renderMD('```python\nprint(1+2)\n```');
    expect(html).toContain('<pre><code class="language-python">');
    expect(html).toContain('print(1+2)');
    expect(html).toContain('</code></pre>');
  });

  it('escapes HTML in plain text', () => {
    const html = renderMD('a < b & c > d');
    expect(html).toBe('<p>a &lt; b &amp; c &gt; d</p>');
  });

  it('preserves blank lines inside code blocks', () => {
    const html = renderMD('```python\na = 1\n\nb = 2\n```');
    expect(html).toContain('a = 1');
    expect(html).toContain('b = 2');
    // blank line between preserved
    expect(html.match(/a = 1\n\nb = 2/)).toBeTruthy();
  });

  it('splits paragraphs on double newline', () => {
    const html = renderMD('first\n\nsecond');
    expect(html).toBe('<p>first</p>\n<p>second</p>');
  });

  it('uses <br> for single newline within paragraph', () => {
    const html = renderMD('line1\nline2');
    expect(html).toBe('<p>line1<br>line2</p>');
  });

  it('renders the Kotlin Dictionary description block correctly', () => {
    const content = '`Map<K, V>` is not an inheritor of the Collection interface; however, it\'s a Kotlin collection type as well';
    const html = renderMD(content);
    expect(html).toContain('<code>Map&lt;K, V&gt;</code>');
    expect(html).toContain('<p>');
    expect(html).toContain('</p>');
  });
});

// -- normalize --

describe('normalize', () => {
  it('lowercases and collapses whitespace', () => {
    expect(normalize('  Is Key Present  ')).toBe('is key present');
  });

  it('handles special characters', () => {
    expect(normalize('Hello World!')).toBe('hello world!');
  });
});

// -- buildLookup --

describe('buildLookup', () => {
  it('maps all headings by normalized key', () => {
    const tree = parseSections(KOTLIN_MD);
    const lookup = buildLookup(tree);
    expect(lookup.has('kotlin')).toBe(true);
    expect(lookup.has('collections')).toBe(true);
    expect(lookup.has('dictionary')).toBe(true);
    expect(lookup.has('literal')).toBe(true);
    expect(lookup.has('is key present')).toBe(true);
    expect(lookup.has('keys and values as arrays')).toBe(true);
  });
});

// -- flatten --

describe('flatten', () => {
  it('produces correct block sequence for python vs kotlin', () => {
    const tree1 = parseSections(PYTHON_MD);
    const tree2 = parseSections(KOTLIN_MD);
    const lookup2 = buildLookup(tree2);
    const blocks = flatten(tree1, lookup2);

    expect(blocks).toHaveLength(3); // h2, h3, table

    expect(blocks[0]).toEqual({ type: 'h2', heading: 'Collections' });
    expect(blocks[1]).toEqual({ type: 'h3', heading: 'Dictionary' });
    expect(blocks[2].type).toBe('table');

    const items = blocks[2].items!;
    // First row: empty label, Kotlin description
    expect(items[0].label).toBe('');
    expect(items[0].content1.trim()).toBe('');
    expect(items[0].content2.trim()).toContain('Map');

    // Remaining rows: h4 items sorted by python order
    expect(items).toHaveLength(11);
    const labels = items.slice(1).map(i => i.label);
    expect(labels).toEqual([
      'literal', 'size', 'lookup', 'update', 'is key present',
      'delete', 'from array of pairs', 'merge', 'invert', 'keys and values as arrays',
    ]);
  });

  it('produces correct block sequence for kotlin vs python (reverse)', () => {
    const tree1 = parseSections(KOTLIN_MD);
    const tree2 = parseSections(PYTHON_MD);
    const lookup2 = buildLookup(tree2);
    const blocks = flatten(tree1, lookup2);

    expect(blocks).toHaveLength(3);
    expect(blocks[0].type).toBe('h2');
    expect(blocks[1].type).toBe('h3');
    expect(blocks[2].type).toBe('table');

    const items = blocks[2].items!;
    // first row: kotlin has description, python doesn't
    expect(items[0].label).toBe('');
    expect(items[0].content1.trim()).toContain('Map');
    expect(items[0].content2.trim()).toBe('');

    expect(items).toHaveLength(11);
  });

  it('fills content1 and content2 for matching items', () => {
    const tree1 = parseSections(PYTHON_MD);
    const tree2 = parseSections(KOTLIN_MD);
    const lookup2 = buildLookup(tree2);
    const blocks = flatten(tree1, lookup2);
    const items = blocks[2].items!;

    // literal row
    const lit = items.find(i => i.label === 'literal')!;
    expect(lit.content1).toContain("d = {'t': 1, 'f': 0}");
    expect(lit.content2).toContain("val d = mapOf('t' to 1, 'f' to 0)");

    // size row
    const sz = items.find(i => i.label === 'size')!;
    expect(sz.content1).toContain('len(d)');
    expect(sz.content2).toContain('d.size');
  });

  it('leaves content2 blank when lang2 has no matching heading', () => {
    const tree1 = parseSections(PYTHON_MD);
    const tree2 = parseSections(KOTLIN_MD);
    // Remove "invert" from kotlin's Dictionary h4 children
    const ktDict = tree2.children[0]!.children[0]!.children[0]!;
    ktDict.children = ktDict.children.filter(c => c.heading !== 'invert');

    const lookup2 = buildLookup(tree2);
    const blocks = flatten(tree1, lookup2);
    const items = blocks[2].items!;
    const inv = items.find(i => i.label === 'invert')!;
    expect(inv.content1).toContain('to_sym');
    expect(inv.content2).toBe('');
  });

  it('handles multiple h2 sections', () => {
    const md1 = '# L1\n## A\n### X\n#### a\ncode1\n## B\n### Y\n#### b\ncode2\n';
    const md2 = '# L2\n## A\n### X\n#### a\nother1\n## B\n### Y\n#### b\nother2\n';
    const tree1 = parseSections(md1);
    const tree2 = parseSections(md2);
    const lookup2 = buildLookup(tree2);
    const blocks = flatten(tree1, lookup2);

    expect(blocks).toHaveLength(6); // h2, h3, table, h2, h3, table
    expect(blocks[0]).toEqual({ type: 'h2', heading: 'A' });
    expect(blocks[3]).toEqual({ type: 'h2', heading: 'B' });
  });
});

// -- esc --

describe('esc', () => {
  it('escapes HTML entities', () => {
    expect(esc('<div class="foo">')).toBe('&lt;div class="foo"&gt;');
    // Note: only &, <, > are escaped per current implementation
    expect(esc('a & b')).toBe('a &amp; b');
  });
});