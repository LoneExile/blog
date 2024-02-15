import rss from "@astrojs/rss";
import data from "@data/en.json";
import { collections, loadCollection } from "@utils/load-data.ts";
// import { getCollection } from "astro:content";

export async function GET(context) {
  let posts = await loadCollection("en");
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
        link: `/articles/${post.slug}/`,
      })),
    customData: `<language>en-us</language>`,
    stylesheet: "/rss/styles.xsl",
  });
}
