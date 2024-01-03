import { useEffect } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { settings, type SettingsValue } from "@utils/store";

export default function ThemeUpdate() {
  type Theme = Extract<SettingsValue["theme"], SettingsValue["theme"]>;
  const $settings = useStore(settings);

  const toggleTheme = (val: SettingsValue) => {
    const element = document.querySelector("#theme-update");
    element?.classList.add("theme-loaded");
    let theme: Theme = val.theme === "dark" ? "light" : "dark";
    settings.setKey("theme", theme);
    document.body.dataset.theme = theme;
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.querySelector("#darkTheme")?.classList.add("hidden");
      document.querySelector("#lightTheme")?.classList.remove("hidden");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.querySelector("#lightTheme")?.classList.add("hidden");
      document.querySelector("#darkTheme")?.classList.remove("hidden");
    }
  };

  useEffect(() => {
    toggleTheme($settings);
  }, []);

  return <div id="theme-update" onClick={() => toggleTheme($settings)}></div>;
}
