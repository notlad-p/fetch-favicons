const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const getLinks = require("./api/links");
const getTile = require("./api/tile");
const getManifest = require("./api/manifest");
const getFavicon = require("./api/favicon");

const app = express();
const port = process.env.PORT || 3000;

/* 

  Inspiration:
  https://favicongrabber.com/
  https://github.com/wonoly/favicons
  https://github.com/zongyz/get-website-favicon
  https://github.com/normanlol/retrieve-favicon

*/

/* 

  To do:

  Organize code: DONE
    - Api folder
      - router.js - for route
      - manifest.js
      - favicon.js
      - links.js
      - tile.js

  Request manifest data in manifest.js

*/

// send error if domain is not present
app.get("/api", (req, res) => {
  return res.status(422).json({ error: "Domain name not provided" });
});

app.get("/api/:domain", async (req, res) => {
  const { domain } = req.params;

  let errorObj = {
    error: false,
    message: "",
    statusCode: null,
  };

  // add protocall
  let url = `http://${domain}`;

  let icons = [];

  await axios
    .get(url)
    .then(async (res) => {
      if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);

        const links = getLinks($);
        const tile = getTile($);
        const manifest = await getManifest($, url);
        const favicon = await getFavicon(url);

        icons = [...links, ...tile, ...manifest, ...favicon];
      }
    })
    .catch((err) => {
      //console.log(err)
      // invalid url
      errorObj = {
        error: true,
        message: "Domain unreachable",
        statusCode: 422,
      };
    });

  // check for relative paths
  icons.forEach((href, i) =>
    /^http/.test(href) ? href : (icons[i] = url + href)
  );

  if (!errorObj.error) {
    return res.status(200).json({
      requestedDomain: domain,
      requestedUrl: url,
      icons,
    });
  } else {
    return res.status(errorObj.statusCode).json({ error: errorObj.message });
  }
});

app.listen(port, () => {
  console.log(`listening on: http://localhost:${port}`);
});
