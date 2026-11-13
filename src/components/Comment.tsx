import { useEffect } from "preact/hooks";

type Theme = "dark" | "light";

declare global {
  interface Window {
    REMARK42?: {
      changeTheme(theme: Theme): void;
      createInstance(config: unknown): void;
    };
    remark_config?: unknown;
  }
}

export function Comments({ title }: { title: string }) {
  // Follow the blog's theme button (see ThemeSwitcher.astro).
  useEffect(() => {
    const onThemeChange = (event: Event) => {
      window.REMARK42?.changeTheme((event as CustomEvent<Theme>).detail);
    };
    window.addEventListener("theme-change", onThemeChange);
    return () => window.removeEventListener("theme-change", onThemeChange);
  }, []);

  useEffect(() => {
    const { document } = window;

    const insertScript = (id: string, parentElement: HTMLElement, theme: Theme) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.id = id;
      let url = window.location.origin + window.location.pathname;
      if (url.endsWith("/")) {
        url = url.slice(0, -1);
      }
      const host = import.meta.env.PUBLIC_REMARK_URL;
      script.innerHTML = `
        var remark_config = {
          host: "${host}",
          site_id: "remark",
          url: "${url}",
          theme: "${theme}",
          components: ["embed"],
          no_footer: true,
          simple_view: true,
          show_email_subscription: true,
        };
        !function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`;
      parentElement.appendChild(script);
    };

    if (document.getElementById("remark42")) {
      const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
      insertScript("comments-script", document.body, theme);
    }
    if (window.REMARK42 && window.remark_config) {
      window.REMARK42.createInstance(window.remark_config);
    }
  }, []);

  return (
    <section aria-labelledby="comments-title" class="mt-16">
      <h2 id="comments-title" class="mb-4 text-xl font-bold">
        {title}
      </h2>
      {/* Reserve room for the comment box so it doesn't push the page down
          when it loads. */}
      <div id="remark42" class="min-h-60"></div>
    </section>
  );
}
