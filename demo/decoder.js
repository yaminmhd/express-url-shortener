// run this file with `node demo/decoding-example.js` to see how you can encode/decode a string
const atob = require("atob");

function decode(hash, URLs) {
  const matchingUrls = URLs.filter(element => element.hash === hash);
  if (matchingUrls.length === 0) {
    throw new Error("url does not exist in our data store");
  }

  id = atob(matchingUrls[0].hash);
  matchingUrl = URLs.filter(element => element.id === id)[0];
  url = matchingUrl.url;

  return url;
}

const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

console.log(decode("MQ==", existingURLs));
console.log(decode("Mg==", existingURLs));
// console.log(decode("Xya0", existingURLs)); // this will throw an Error because this hash does not exist in URLs

module.exports = decode;
