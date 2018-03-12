// run this file with `node demo/encoding-example.js` to see how you can encode/decode a string
const btoa = require("btoa");
const atob = require("atob");

function encode(url, URLs) {
  const matchingUrls = URLs.filter(element => element.url === url);

  if (matchingUrls.length > 0) {
    encodedString = btoa(matchingUrls[0].id);
  } else {
    id = URLs.length + 1;
    URLs.push({ id: id, url: url });
    encodedString = btoa(id);
  }

  return encodedString;
}

const existingURLs = [
  { id: "1", url: "www.google.com", encodedId: "MQ==" },
  { id: "2", url: "www.facebook.com", encodedId: "Mg==" }
];

console.log(encode("www.google.com", existingURLs));
console.log(encode("www.new-website.com", existingURLs));

module.exports = encode;
