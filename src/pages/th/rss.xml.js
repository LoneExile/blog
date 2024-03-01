import rss from "@astrojs/rss";
import { loadData } from "@utils/load-data.ts";
import props from "./_props.json";
import { loadCollection } from "@utils/load-data.ts";

const language = props.language;
let data = await loadData(language);

export async function GET(context) {
  let posts = await loadCollection(language);
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
