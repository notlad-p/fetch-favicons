const axios = require("axios");

module.exports = async (domainUrl) => {
  let favicon;
  const url = new URL("/favicon.ico", domainUrl).href;

  await axios.get(url).then(() => {
    favicon = url;
  }).catch((err) => {
    console.log("No favicon");
  });

  return favicon ? [favicon] : [];
}