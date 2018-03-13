// run this file with `node demo/encoding-decoding-example-2.js` to see how you can encode/decode a string
const encode = require("./encode");
const decode = require("./decode");

const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

// encoder example
console.log(encode("www.google.com", existingURLs));
console.log(encode("www.new-website.com", existingURLs));

// decoder example
// console.log(decode("MQ==", existingURLs));
// console.log(decode("Mg==", existingURLs));
// console.log(decode("Xya0", existingURLs)); // this will throw an Error because this hash does not exist in URLs
