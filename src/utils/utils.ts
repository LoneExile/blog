const formattedDate = (date: string): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

import type {CollectionEntry} from 'astro:content'
const getBlogNoDrafts = (post: CollectionEntry<'blogs'>) => {
  if (import.meta.env.PROD) {
    return post.data.draft !== true
  } else {
    return post
  }
}

export {formattedDate, getBlogNoDrafts}
