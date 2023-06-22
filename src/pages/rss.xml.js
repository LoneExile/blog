import rss from '@astrojs/rss'
import {getCollection} from 'astro:content'
import {description} from '@utils/enum'

// NOTE: https://docs.astro.build/en/guides/rss/

export async function get(context) {
  const posts = await getCollection('blogs')
  return rss({
    title: 'VoidBox Blog',
    description: description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.created,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    stylesheet: '/rss/styles.xsl',
  })
}
