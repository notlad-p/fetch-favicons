module.exports = ($) => {
  let tile = $(
    'meta[name="msapplication-TileImage"]',
    "head"
  ).attr("content");

  return tile ? [tile] : [];
}