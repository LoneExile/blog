declare global {
  // Shape of src/data/en.json and src/data/th.json (keep the two in step).
  interface SiteData {
    language: string;
    siteDescription: string;
    siteTitle: string;
    author: string;
    skipLink: string;
    home: {
      path: string;
      hero: {
        title: string;
        description: string;
      };
      latest: {
        title: string;
        all: string;
      };
    };
    navbar: {
      label: string;
      home: string;
      articles: string;
      about: string;
      menuOpen: string;
      menuClose: string;
      darkTheme: string;
    };
    articles: {
      title: string;
      description: string;
      intro: string;
      /** "__" is replaced with the number of posts. */
      postCount: string;
      postCountOne: string;
      path: string;
    };
    about: {
      title: string;
      description: string;
      path: string;
      aboutSite: {
        title: string;
        description: string;
        closing: string;
      };
      rebrand: {
        title: string;
        description: string;
      };
      aboutAuthor: {
        title: string;
        role: string;
        location: string;
        description: string;
        photoAlt: string;
      };
    };
    relateArticles: {
      title: string;
    };
    comments: {
      title: string;
    };
    post: {
      lastUpdated: string;
    };
    newSletter: {
      title: string;
      description: string;
      label: string;
      placeholder: string;
      button: string;
      busy: string;
      checking: string;
      needCheck: string;
      checkFailed: string;
      success: string;
      error: string;
      subDescription: string;
      privacyPolicyLink: string;
    };
    pageNotFound: {
      title: string;
      description: string;
      path: string;
      heading: string;
      body: string;
      browse: string;
      recent: string;
    };
    tags: {
      title: string;
      description: string;
      back: string;
    };
    footer: {
      privacy: string;
      terms: string;
      source: string;
      license: string;
      rss: string;
    };
  }
}

export {};
