import { getCollection } from "astro:content";
import { type CollectionEntry } from "astro:content";
import { collections } from "../content/config.ts"
type MyCollectionKeys = keyof typeof collections;
type AnyCollectionEntry = CollectionEntry<MyCollectionKeys>;

async function loadData(language: string) {
  if (language === "th") {
    return import("@data/th.json").then((module) => module.default);
  } else {
    return import("@data/en.json").then((module) => module.default);
  }
}
async function loadCollection(language: string) {
  if (!language) {
    language = "en";
  }
  let posts: AnyCollectionEntry[] = [];

  for (const collection of Object.keys(collections) as MyCollectionKeys[]) {
    let collectionEntries = await getCollection(collection, ({ data }) => {
      if (import.meta.env.PROD && data.language === language && data.draft !== true) {
        return true;
      } else if (!import.meta.env.PROD && data.language === language) {
        return true;
      }
      return false;
    });

    posts = posts.concat(collectionEntries);
  }

  return posts;
}

async function listCollectionByLanguage(language: string) {
  if (!language) {
    language = "en";
  }
  const postsByLanguage: Record<string, any[]> = {};
  for (const collection of Object.keys(collections) as MyCollectionKeys[]) {
    let collectionEntries = await getCollection(collection, ({ data }) => {
      if (import.meta.env.PROD /* && (data.show === undefined || data.show) */ && data.language === language && data.draft !== true) {
        return true;
      }
      return false;
    });

    if (!postsByLanguage[language]) {
      postsByLanguage[language] = [];
    }
    postsByLanguage[language] = postsByLanguage[language].concat(collectionEntries);
  }

  return postsByLanguage
}


export { loadData, loadCollection, listCollectionByLanguage, type AnyCollectionEntry, type MyCollectionKeys, collections }
