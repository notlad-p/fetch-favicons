const axios = require('axios');

module.exports = async ($, domainUrl) => {
  const icons = []
  const href = $("link[rel='manifest']", "head").attr("href");
  let url;

  /^http/.test(href) ? url = href : url = domainUrl + href;

  href && await axios.get(url).then((res) => {
    //console.log(res.data.icons)
    res.data.icons.forEach((icn) => {
      icons.push(icn.src);
    })
  }).catch((err) => {
    console.log('No manifest');
  })

  return icons;
  //return href ? [url] : [];
}