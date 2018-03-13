const btoa = require("btoa");

function encode(url, URLs) {
  const matchingUrls = URLs.filter(element => element.url === url);

  return matchingUrls.length > 0
    ? matchingUrls[0].hash
    : (encodedString = btoa(URLs.length + 1));
}

module.exports = encode;
