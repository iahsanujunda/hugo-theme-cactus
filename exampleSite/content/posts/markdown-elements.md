---
title: "An overview of all Markdown elements"
date: 2016-11-01T00:00:00+00:00
tags: ["markdown", "demo"]
categories: ["documentation"]
---

This post provides an overview of all the Markdown elements and how they are
rendered by this theme. Use it as a reference and as a visual test page.

<!--more-->

## Block Elements

### Paragraphs and Line Breaks

A paragraph is one or more consecutive lines of text separated by one or more
blank lines.

This will be inline.

This is second paragraph.

To produce a line break, end a line with two or more spaces.
This will be not inline.

### Headers

Markdown supports two styles of headers, *Setext* and *atx*.

```markdown
This is an H1
=============

This is an H2
-------------

# This is an H1
## This is an H2
###### This is an H6
```

Rendered:

#### This is an H4
##### This is an H5
###### This is an H6

### Blockquotes

> This is a blockquote with two paragraphs. Donec sit amet nisl. Aliquam semper
> ipsum sit amet velit.
>
> > This is nested blockquote.

### Lists

Unordered:

- Red
- Green
- Blue

Ordered:

1. Bird
2. McHale
3. Parish

Nested:

- A
  - A1
  - A2
- B
- C

### Code Blocks

An indented code block:

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

A fenced code block with a language hint (hover it for the copy button):

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

### Horizontal Rules

***

- - -

___

### Table

| Left      | Center | Right |
| :-------- | :----: | ----: |
| aaa       | bbb    | ccc   |
| ddd       | eee    | fff   |

## Span Elements

### Links

An [inline link](http://example.com/ "Title"), and a reference-style [link][id].

[id]: http://example.com/ "Optional Title"

### Emphasis

*single asterisks* and _single underscores_ for italic; **double asterisks** and
__double underscores__ for bold.

### Code

Use backticks for `printf()`. To include a literal backtick, ``use double
backticks (`) like this``.

### Images

![Alt text](/images/logo.png "Optional title")

### Strikethrough

~~Mistaken text.~~

## Miscellaneous

### Automatic Links

<http://example.com/> and <address@example.com>.

### Backslash Escapes

Use a backslash to produce literal characters: \*literal asterisks\*.

## Inline HTML

When you need something Markdown doesn't cover, drop down to raw HTML. Span-level
HTML is processed inline, block-level HTML is left alone:

<span>**Work**</span> renders the emphasis, but <div>**No Work**</div> does not.
