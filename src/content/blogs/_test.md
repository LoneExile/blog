---
title: "Testing Content"
description: "this is test"
thumbnail:
created: 2023-05-13 13:07
updated: 2023-05-13 15:42
tags: ["me", "you"]
category: ["tech", "life"]
draft: true
slug: "2023-05-13-Testing-Content"
author: "Apinant U-suwantim"
---

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

<!-- ![dragon](/images/blogs/dragon.webp) -->
![dragon](../../../assets/test/dragon.webp)

## Horizontal Rules

---

---

---

## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,, -- ---

"Smartypants, double quotes" and 'single quotes'

## Emphasis

**This is bold text**

**This is bold text**

_This is italic text_

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Blockquotes can also be nested...
>
> > ...by using additional greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

## Lists

Unordered

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

4. You can use sequential numbers...
5. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

```
Sample text here...
```

Syntax highlighting

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

<!-- ## Mermaid -->

<!-- ```mermaid -->
<!-- quadrantChart -->
<!--     title Reach and engagement of campaigns -->
<!--     x-axis Low Reach --> High Reach -->
<!--     y-axis Low Engagement --> High Engagement -->
<!--     quadrant-1 We should expand -->
<!--     quadrant-2 Need to promote -->
<!--     quadrant-3 Re-evaluate -->
<!--     quadrant-4 May be improved -->
<!--     Campaign A: [0.3, 0.6] -->
<!--     Campaign B: [0.45, 0.23] -->
<!--     Campaign C: [0.57, 0.69] -->
<!--     Campaign D: [0.78, 0.34] -->
<!--     Campaign E: [0.40, 0.34] -->
<!--     Campaign F: [0.35, 0.78] -->
<!-- ``` -->

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

Right aligned columns

| Option |                                                               Description |
| -----: | ------------------------------------------------------------------------: |
|   data | path to data files to supply the data that will be passed into templates. |
| engine |    engine to be used for processing templates. Handlebars is the default. |
|    ext |                                      extension to be used for dest files. |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link <https://github.com/nodeca/pica> (enable linkify to see)

## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg "The Dojocat"

## Plugins

The killer feature of `markdown-it` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).

### [Emojies]()

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;) 🫠

### [Subscript]() / [Superscript]()

- 19^th^
- H~2~O

### Footnotes

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

<!-- ### Definition lists -->

<!-- Term 1 -->

<!-- : Definition 1 with lazy continuation. -->

<!-- Term 2 with _inline markup_ -->

<!-- : Definition 2 -->

<!--         { some code, part of Definition 2 } -->

<!--     Third paragraph of definition 2. -->

<!-- _Compact style:_ -->

<!-- Term 1 ~ Definition 1 -->

<!-- Term 2 ~ Definition 2a ~ Definition 2b -->

### Abbreviations

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

\*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning _here be dragons_ :::