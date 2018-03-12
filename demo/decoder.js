// run this file with `node demo/decoding-example.js` to see how you can encode/decode a string
const btoa = require("btoa");
const atob = require("atob");

function decode(encodedId, URLs) {
  const matchingUrls = URLs.filter(element => element.encodedId === encodedId);
  if (matchingUrls.length === 0) {
    throw new Error("url does not exist in our data store");
  }

  id = atob(matchingUrls[0].encodedId);
  matchingUrl = URLs.filter(element => element.id === id)[0];
  url = matchingUrl.url;

  return url;
}

const existingURLs = [
  { id: "1", url: "www.google.com", encodedId: "MQ==" },
  { id: "2", url: "www.facebook.com", encodedId: "Mg==" }
];

console.log(decode("MQ==", existingURLs));
console.log(decode("Mg==", existingURLs));
// console.log(decode("Xya0", existingURLs)); // this will throw an Error because this encodedId does not exist in URLs

module.exports = decode;
