import fs from "node:fs";
import { describe, it, expect } from "vitest";
import {
  parseSections,
  renderMD,
  normalize,
  buildLookup,
  esc,
  validateLanguage,
  renderComparison,
} from "../src/lib/compare";

const read = (name: string) =>
  fs.readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf-8");

const META_MD = read("meta.md");
const PY_LANG_MD = read("python-lang.md");
const KT_LANG_MD = read("kotlin-lang.md");

// -- parseSections --

describe("parseSections", () => {
  it("parses a flat heading tree", () => {
    const md = "# Title\n\n## Section\nsome text\n\n### Sub\nmore";
    const tree = parseSections(md);
    expect(tree.children.length).toBe(1);
    expect(tree.children[0].level).toBe(1);
    expect(tree.children[0].heading).toBe("Title");
    expect(tree.children[0].children.length).toBe(1);
    expect(tree.children[0].children[0].level).toBe(2);
    expect(tree.children[0].children[0].heading).toBe("Section");
    expect(tree.children[0].children[0].content).toContain("some text");
  });

  it("collects content under a heading until the next heading", () => {
    const md = `# H1\n\ncontent here\nmore content\n\n## H2`;
    const tree = parseSections(md);
    expect(tree.children[0].content.trim()).toBe("content here\nmore content");
  });

  it("handles empty input", () => {
    const tree = parseSections("");
    expect(tree.level).toBe(0);
    expect(tree.children).toHaveLength(0);
  });

  it("parses the consolidated Python fixture into topics, groups, and leaves", () => {
    const tree = parseSections(PY_LANG_MD);
    const h1 = tree.children[0];
    expect(h1?.heading).toBe("Python");
    expect(h1?.children.map((c) => c.heading)).toEqual(["Types", "Collections"]);

    const types = h1?.children[0];
    expect(types?.children.map((c) => c.heading)).toEqual(["Number", "String", "Boolean"]);
    expect(types?.children[0].children.map((c) => c.heading)).toEqual([
      "integer",
      "float",
      "arithmetic",
    ]);
  });

  it("captures topic-level intro content", () => {
    const tree = parseSections(KT_LANG_MD);
    const collections = tree.children[0]?.children[1];
    expect(collections?.heading).toBe("Collections");
    expect(collections?.content).toContain("immutable");
  });

  it("ignores # lines inside fenced code blocks", () => {
    const md = `# Title\n\n## Section\n\n## Sub\n\n### item1\n\n\`\`\`python\n# this is a comment\n# neither is this\n\`\`\`\n\n### item2\ntext\n`;
    const tree = parseSections(md);
    const h2 = tree.children[0]?.children[1];
    expect(h2?.heading).toBe("Sub");
    expect(h2?.children.map((c) => c.heading)).toEqual(["item1", "item2"]);
    expect(h2?.children[0].content).toContain("# this is a comment");
  });
});

// -- renderMD --

describe("renderMD", () => {
  it("returns empty string for empty input", () => {
    expect(renderMD("")).toBe("");
    expect(renderMD("   \n  ")).toBe("");
  });

  it("wraps plain text in <p>", () => {
    const html = renderMD("hello world");
    expect(html).toBe("<p>hello world</p>");
  });

  it("renders inline code", () => {
    const html = renderMD("use `foo()` here");
    expect(html).toBe("<p>use <code>foo()</code> here</p>");
  });

  it("renders fenced code blocks", () => {
    const html = renderMD("```python\nprint(1+2)\n```");
    expect(html).toContain('<pre><code class="language-python">');
    expect(html).toContain("print(1+2)");
    expect(html).toContain("</code></pre>");
  });

  it("escapes HTML in plain text", () => {
    const html = renderMD("a < b & c > d");
    expect(html).toBe("<p>a &lt; b &amp; c &gt; d</p>");
  });

  it("preserves blank lines inside code blocks", () => {
    const html = renderMD("```python\na = 1\n\nb = 2\n```");
    expect(html).toContain("a = 1");
    expect(html).toContain("b = 2");
    expect(html.match(/a = 1\n\nb = 2/)).toBeTruthy();
  });

  it("splits paragraphs on double newline", () => {
    const html = renderMD("first\n\nsecond");
    expect(html).toBe("<p>first</p>\n<p>second</p>");
  });

  it("uses <br> for single newline within paragraph", () => {
    const html = renderMD("line1\nline2");
    expect(html).toBe("<p>line1<br>line2</p>");
  });

  it("renders inline code inside a description paragraph", () => {
    const html = renderMD("`list`, `dict`, and `set` are built-in");
    expect(html).toBe("<p><code>list</code>, <code>dict</code>, and <code>set</code> are built-in</p>");
  });
});

// -- normalize --

describe("normalize", () => {
  it("lowercases and collapses whitespace", () => {
    expect(normalize("  Is Key Present  ")).toBe("is key present");
  });
});

// -- buildLookup --

describe("buildLookup", () => {
  it("maps all headings by normalized key", () => {
    const tree = parseSections(KT_LANG_MD);
    const lookup = buildLookup(tree);
    expect(lookup.has("kotlin")).toBe(true);
    expect(lookup.has("collections")).toBe(true);
    expect(lookup.has("dictionary")).toBe(true);
    expect(lookup.has("literal")).toBe(true);
    expect(lookup.has("integer")).toBe(true);
  });
});

// -- validateLanguage --

describe("validateLanguage", () => {
  it("accepts a language whose sections are all in meta.md", () => {
    const meta = parseSections(META_MD);
    expect(() => validateLanguage(parseSections(PY_LANG_MD), meta, "python")).not.toThrow();
    expect(() => validateLanguage(parseSections(KT_LANG_MD), meta, "kotlin")).not.toThrow();
  });

  it("throws when a topic is missing from meta.md", () => {
    const meta = parseSections(META_MD);
    const md = PY_LANG_MD.replace("## Collections", "## Collections\n\n## Other\n\n### Dictionary");
    expect(() => validateLanguage(parseSections(md), meta, "python")).toThrow(
      /topic "Other" not found/
    );
  });

  it("throws when a group is missing from meta.md", () => {
    const meta = parseSections(META_MD);
    const md = PY_LANG_MD.replace("### List", "### Tuple\n\n### List");
    expect(() => validateLanguage(parseSections(md), meta, "python")).toThrow(
      /section "Tuple"/
    );
  });

  it("throws when a leaf is missing from meta.md", () => {
    const meta = parseSections(META_MD);
    const md = PY_LANG_MD.replace(
      "#### lookup",
      "#### extra\n\n```python\nx\n```\n\n#### lookup"
    );
    expect(() => validateLanguage(parseSections(md), meta, "python")).toThrow(
      /section "extra"/
    );
  });
});

// -- renderComparison --

describe("renderComparison", () => {
  const meta = parseSections(META_MD);
  const py = parseSections(PY_LANG_MD);
  const kt = parseSections(KT_LANG_MD);

  it("renders topics, groups, and tables in template order", () => {
    const blocks = renderComparison(meta, py, kt);
    expect(blocks.map((b) => b.type)).toEqual([
      "h2", "h3", "table", "h3", "table", "h3", "table",
      "h2", "intro", "h3", "table", "h3", "table", "h3", "table",
    ]);
    expect(blocks[0]).toEqual({ type: "h2", heading: "Types" });
    expect(blocks[7]).toEqual({ type: "h2", heading: "Collections" });
  });

  it("emits an intro block only for topics that have a paragraph", () => {
    const blocks = renderComparison(meta, py, kt);
    // Types has no topic-level paragraph
    expect(blocks[1].type).toBe("h3");
    // Collections has one
    const intro = blocks[8].intro!;
    expect(intro.meta).toContain("store multiple values");
    expect(intro.lang1).toContain("mutable");
    expect(intro.lang2).toContain("immutable");
  });

  it("fills both language contents for leaves matched through the meta template", () => {
    const blocks = renderComparison(meta, py, kt);
    const number = blocks[2].items!;
    expect(number.map((i) => i.label)).toEqual(["integer", "float", "arithmetic"]);

    const integer = number.find((i) => i.label === "integer")!;
    expect(integer.content1).toContain("int('42')");
    expect(integer.content2).toContain('"42".toInt()');
  });

  it("renders in reverse with sides swapped", () => {
    const blocks = renderComparison(meta, kt, py);
    expect(blocks[8].intro!.lang1).toContain("immutable");
    expect(blocks[8].intro!.lang2).toContain("mutable");

    const list = blocks[10].items!;
    const size = list.find((i) => i.label === "size")!;
    expect(size.content1).toContain("a.size");
    expect(size.content2).toContain("len(a)");
  });
});

// -- esc --

describe("esc", () => {
  it("escapes HTML entities", () => {
    expect(esc('<div class="foo">')).toBe('&lt;div class="foo"&gt;');
    expect(esc("a & b")).toBe("a &amp; b");
  });
});
