/**
 * Hydrate on first click on the window
 * @type {import('astro').ClientDirective}
 */
export default (load, opts, el) => {
  const element = document.querySelector(opts.value);
  if (!element) {
    return;
  }
  element.addEventListener(
    "click",
    async () => {
      const hydrate = await load();
      await hydrate();
    },
    { once: true },
  );
};
