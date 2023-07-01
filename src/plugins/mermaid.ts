import type {RemarkPlugin} from '@astrojs/markdown-remark'
import {visit} from 'unist-util-visit'
import dedent from 'ts-dedent'

export const mermaid: RemarkPlugin<[]> = () => (tree) => {
  visit(tree, 'code', (node) => {
    if (node.lang !== 'mermaid') return

    // @ts-ignore
    node.type = 'html'
    node.value = dedent`
      <pre
        class="mermaid"
        style="
        overflow: auto;
        max-width: 100%;
        background: none;
        background-color: #BDD1CE;
        width: 100%;
      ">
        ${node.value}
      </pre>
    `
  })
}
