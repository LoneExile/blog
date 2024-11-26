import 'mdast-util-mdx-jsx'
import type { Root } from 'hast'
import { CONTINUE, SKIP } from 'unist-util-visit'
import { visitParents } from 'unist-util-visit-parents'

const elementTagNames = new Set(['img', 'picture'])
const mdxJsxFlowElementNames = new Set(['img', 'picture', 'astro-image', 'Image', 'Picture'])

function isValidNodeType(node: any) {
  if (node.type !== 'element' && node.type !== 'mdxJsxFlowElement') return false;
  if (node.type === 'element' && !elementTagNames.has(node.tagName)) return false;
  if (node.type === 'mdxJsxFlowElement' && node.name && !mdxJsxFlowElementNames.has(node.name)) return false;
  return true;
}

function hasZoomOffAttribute(node: any) {
  if (node.type === 'element' && 'dataZoomOff' in node.properties) return true;
  if (node.type === 'mdxJsxFlowElement') {
    return node.attributes.some(
      (attribute: any) => attribute.type === 'mdxJsxAttribute' && attribute.name === 'data-zoom-off'
    );
  }
  return false;
}

function isInvalidParent(parent: any) {
  return (
    parent.type === 'element' &&
    (String(parent.properties['className']).includes('not-content') ||
      parent.tagName === 'button' ||
      (parent.tagName === 'a' && 'href' in parent.properties))
  );
}

function createZoomableElement(node: any, alt: string) {
  return {
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
  };
}

export function rehypeImageZoom() {
  return function transformer(tree: Root) {
    visitParents(tree, ['element', 'mdxJsxFlowElement'], (node, parents) => {
      if (!isValidNodeType(node)) return CONTINUE;
      if (hasZoomOffAttribute(node)) return SKIP;
      
      if (parents.some(isInvalidParent)) return SKIP;

      let alt = '';
      if (node.type === 'element' && node.tagName === 'img') {
        alt = String(node.properties['alt']).trim();
      }

      const parent = parents.at(-1);
      const index = parent?.children.indexOf(node);
      if (!parent || index === undefined) return CONTINUE;

      parent.children[index] = createZoomableElement(node, alt);
      return SKIP;
    });
  };
}
