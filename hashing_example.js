// run this file with `node hashing_example.js` to see how you can encode/decode a string
const btoa = require("btoa");
const atob = require("atob");
const URL = "www.google.com";

const hashedURL = btoa(URL);
console.log(hashedURL);

const output = atob(hashedURL);
console.log(output);
