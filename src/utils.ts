import {persistentMap, persistentAtom} from '@nanostores/persistent'

export const isCartOpen = persistentAtom<string>('isCartOpen', 'false')
// export const theme = persistentAtom<string>('theme', 'dark')

export type SettingsValue = {
  // sidebar: 'show' | 'hide'
  theme: 'night' | 'winter'
}

export const settings = persistentMap<SettingsValue>('settings:', {
  // sidebar: 'show',
  theme: 'night',
})

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
