const iconSelectors = [
  "link[rel='icon']",
  "link[rel='shortcut icon']",
  "link[rel='image_src']",
  "link[rel='apple-touch-icon']",
  "link[rel='apple-touch-icon-precomposed']",
  "link[rel='apple-touch-startup-image']",
  "link[rel='alternate icon']",
  "link[rel='mask-icon']",
  "link[rel='fluid-icon']",
].join();

module.exports = ($) => {
  let icons = [];

  $(iconSelectors).each(function () {
    icons.push($(this).attr("href"));
  });

  return icons;
}