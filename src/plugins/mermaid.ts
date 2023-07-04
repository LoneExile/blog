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

// TODO: compile mermaid.js myself, can't use initialize()
//       because script run on service worker
//       if I want to customize theme

// https://github.com/BuilderIO/partytown/blob/main/tests/integrations/mermaid/index.html
/*
      <script src="https://unpkg.com/mermaid@10.2.4/dist/mermaid.min.js">
      </script>

      <script src="/scripts/mermaid.js">
      </script>

      <script>
      mermaid.initialize({ 
      startOnLoad: true,
      'theme': 'base',
      'themeVariables': {
        'primaryColor': '#BB2528',
        'primaryTextColor': '#fff',
        'primaryBorderColor': '#7C0000',
        'lineColor': '#F8B229',
        'secondaryColor': '#006100',
        'tertiaryColor': '#fff'
        },
      });
      </script>
*/
