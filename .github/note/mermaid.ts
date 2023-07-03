import type {RemarkPlugin} from '@astrojs/markdown-remark'
import {visit} from 'unist-util-visit'
import puppeteer from 'puppeteer'
import dedent from 'ts-dedent'

// @ts-ignore
async function generateDiagram(source) {
  const browser = await puppeteer.launch({headless: 'new'})
  const page = await browser.newPage()

  // This script will be run in the Puppeteer page
  const script = `
  (() => {
    mermaid.initialize({ startOnLoad: true,

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
    const container = document.createElement('div');
    container.className = 'mermaid';
    container.textContent = \`${source}\`;
    document.body.appendChild(container);
    return new Promise((resolve) => {
      mermaid.init(undefined, '.mermaid', () => {
        resolve(container.innerHTML);
      });
    });
  })();
`

  await page.addScriptTag({
    url: 'https://unpkg.com/mermaid@10.2.4/dist/mermaid.min.js',
  })
  const diagram = await page.evaluate(script)
  await browser.close()

  return diagram
}

export const mermaid: RemarkPlugin<[]> = () => {
  return async (tree) => {
    // @ts-ignore
    const mermaidNodes = []

    // First pass: collect all the Mermaid nodes
    visit(tree, 'code', (node) => {
      if (node.lang !== 'mermaid') return
      mermaidNodes.push(node)
    })

    // Second pass: transform the Mermaid nodes
    // @ts-ignore
    for (const node of mermaidNodes) {
      // Generate the Mermaid diagram
      const diagram = await generateDiagram(node.value)

      // Replace the code node with the diagram
      node.type = 'html'
      node.value = dedent`
        <pre class="mermaid"
             style="
             overflow: auto;
             max-width: 100%;
             width: 100%;
             line-height: 1.3;
           "
        >
          ${diagram}
        </pre>
      `
    }
  }
}
