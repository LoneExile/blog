export async function loadData(language: string) {
  if (language === "th") {
    return import("@data/th.json").then((module) => module.default);
  } else if (language === "en") {
    return import("@data/en.json").then((module) => module.default);
  } else {
    throw new Error("Unsupported language");
  }
}
