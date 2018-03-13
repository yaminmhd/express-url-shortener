const btoa = require("btoa");

function encode(url, URLs) {
  const matchingUrls = URLs.filter(element => element.url === url);

  if (matchingUrls.length > 0) {
    encodedString = matchingUrls[0].hash;
  } else {
    id = URLs.length + 1;
    encodedString = btoa(id);
  }

  return encodedString;
}

module.exports = encode;
