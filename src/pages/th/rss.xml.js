import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { loadData } from "@utils/loadData.ts";
import props from "./_props.json";

const language = props.language;
let data = await loadData(language);

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
        link: `/${language}/articles/${post.slug}/`,
      })),
    customData: `<language>${language}-${language}</language>`,
    stylesheet: "/rss/styles.xsl",
  });
}
