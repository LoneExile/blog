import { getCollection } from "astro:content";
import { type CollectionEntry } from "astro:content";
import { collections } from "../content.config.ts"
type MyCollectionKeys = keyof typeof collections;
type AnyCollectionEntry = CollectionEntry<MyCollectionKeys>;

async function loadData(language: string) {
  if (language === "th") {
    return import("@data/th.json").then((module) => module.default);
  } else {
    return import("@data/en.json").then((module) => module.default);
  }
}

async function getFilteredCollections(language: string = "en") {
  let posts: AnyCollectionEntry[] = [];

  for (const collection of Object.keys(collections) as MyCollectionKeys[]) {
    let collectionEntries = await getCollection(collection, ({ data }) => {
      if (data.language !== language) return false;
      if (import.meta.env.PROD) {
        return !data.draft;
      }
      return true;
    });

    posts = posts.concat(collectionEntries);
  }

  return posts;
}

async function loadCollection(language: string) {
  return getFilteredCollections(language);
}

// Posts readers can browse: not drafts (in production) and not the legal pages
// (`show: false`), newest first. `created` strings ("2024-04-21 19:24") sort
// correctly as text.
async function loadPublishedPosts(language: string) {
  const posts = await getFilteredCollections(language);
  return posts
    .filter((post) => post.data.show !== false)
    .sort((a, b) => b.data.created.localeCompare(a.data.created));
}

export { loadData, loadCollection, loadPublishedPosts, type AnyCollectionEntry, type MyCollectionKeys, collections }
