import 'mdast-util-mdx-jsx'
import type { Root } from 'hast'
import { CONTINUE, SKIP } from 'unist-util-visit'
import { visitParents } from 'unist-util-visit-parents'

const elementTagNames = new Set(['img', 'picture'])
const mdxJsxFlowElementNames = new Set(['img', 'picture', 'astro-image', 'Image', 'Picture'])

export function rehypeImageZoom() {
  return function transformer(tree: Root) {
    visitParents(tree, ['element', 'mdxJsxFlowElement'], (node, parents) => {
      if (node.type !== 'element' && node.type !== 'mdxJsxFlowElement') return CONTINUE
      if (node.type === 'element' && !elementTagNames.has(node.tagName)) return CONTINUE
      if (node.type === 'mdxJsxFlowElement' && node.name && !mdxJsxFlowElementNames.has(node.name)) return CONTINUE

      // Skip images with the `data-zoom-off` attribute.
      if (
        (node.type === 'element' && 'dataZoomOff' in node.properties) ||
        (node.type === 'mdxJsxFlowElement' &&
          node.attributes.some(
            (attribute) => attribute.type === 'mdxJsxAttribute' && attribute.name === 'data-zoom-off',
          ))
      ) {
        return SKIP
      }

      const isInvalidImage = parents.some((parent) => {
        return (
          parent.type === 'element' &&
          // Exclude images wrapped in an element with the CSS class `not-content`.
          (String(parent.properties['className']).includes('not-content') ||
            // Exclude images wrapped in an interactive element.
            parent.tagName === 'button' ||
            (parent.tagName === 'a' && 'href' in parent.properties))
        )
      })

      if (isInvalidImage) return SKIP

      let alt = ''

      if (node.type === 'element' && node.tagName === 'img') {
        alt = String(node.properties['alt']).trim()
      }

      const parent = parents.at(-1)
      const index = parent?.children.indexOf(node)

      if (!parent || index === undefined) return CONTINUE

      parent.children[index] = {
        type: 'element',
        tagName: 'image-zoom-zoomable',
        properties: {},
        children: [
          node,
          {
            type: 'element',
            tagName: 'button',
            properties: {
              'aria-label': `Zoom image${alt.length > 0 ? `: ${alt}` : ''}`,
              class: 'image-zoom-control',
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  'aria-hidden': 'true',
                  fill: 'currentColor',
                  viewBox: '0 0 24 24',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'use',
                    properties: {
                      href: 'image-zoom-icon-zoom',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      }

      return SKIP
    })
  }
}
