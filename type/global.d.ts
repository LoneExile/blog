declare global {
  interface SiteData {
    language: string;
    siteDescription: string;
    siteTitle: string;
    author: string;
    home: {
      path: string;
      hero: {
        title: string;
        description: string;
      };
    }
    navbar: {
      home: string;
      articles: string;
      about: string;
    };
    articles: {
      title: string;
      description: string;
      quote: string;
      daysAgo: string;
      path: string;
    };
    about: {
      title: string;
      description: string;
      path: string;
      aboutSite: {
        title: string;
        description: string;
      }
      aboutAuthor: {
        title: string;
        role: string;
        location: string;
        description: string;
      }
    };
    newSletter: {
      title: string;
      placeholder: string;
      button: string;
      buttonSuccess: string;
      buttonError: string;
      buttonVerifying: string;
      subDescription: string;
      privacyPolicyLink: string;
    };
    pageNotFound: {
      title: string;
      description: string;
      path: string;
    };
    tags: {
      title: string;
      description: string;
    };
  }
}

export { };
