// run this file with `node demo/encoding-example.js` to see how you can encode/decode a string
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

const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

console.log(encode("www.google.com", existingURLs));
console.log(encode("www.new-website.com", existingURLs));

module.exports = encode;
