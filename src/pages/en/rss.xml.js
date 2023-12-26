import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import data from "@data/en.json";

// NOTE: https://docs.astro.build/en/guides/rss/

export async function get(context) {
  const posts = await getCollection("blogs");
  return rss({
    title: "VoidBox Blog",
    description: data.siteDescription,
    site: context.site,
    items: posts
      .filter((post) => !post.data.draft)
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.created,
        description: post.data.description,
        link: `/blogs/${post.slug}/`,
      })),
    stylesheet: "/rss/styles.xsl",
  });
}
