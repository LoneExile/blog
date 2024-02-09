import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import data from "@data/th.json";

export async function GET(context) {
  const posts = await getCollection("blogs");
  return rss({
    title: "VoidBox Blog",
    description: data.siteDescription,
    site: context.site,
    items: posts
      .filter(
        (post) =>
          !post.data.draft && (post.data.show === undefined || post.data.show),
      )
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.created,
        description: post.data.description,
        link: `/th/articles/${post.slug}/`,
      })),
    customData: `<language>th-th</language>`,
    stylesheet: "/rss/styles.xsl",
  });
}
