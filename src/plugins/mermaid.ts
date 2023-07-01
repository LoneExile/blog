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
        data-theme="light"
        style="overflow: auto; max-width: 100%; background: none; background-color: #d2e9e5;">
        ${node.value}
      </pre>
    `
  })
}
