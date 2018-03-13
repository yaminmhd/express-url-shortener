const atob = require("atob");

function decode(hash, URLs) {
  const matchingUrls = URLs.filter(element => element.hash === hash);

  if (matchingUrls.length === 0) {
    throw new Error("url does not exist in our data store");
  }

  id = atob(matchingUrls[0].hash);
  matchingUrl = URLs.filter(element => element.id === id)[0];
  return matchingUrl.url;
}

module.exports = decode;
