const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// load our own helper functions
const encode = require('../demo/encode');
const decode = require("../demo/decode");
//create existingURL array
const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

// TODO: Implement functionalities specified in README
router.get("/", function(req, res) {
  res.send("Hello world!");
});


//POST/shorten-url
router.post('/shorten-url', function(req,res){
  const url = req.body.url;
  const hash = encode(url, existingURLs);

  const shortenedUrl = {
     id: existingURLs.length+1,
     url,
     hash
  }

  existingURLs.push(shortenedUrl);
  res.send(existingURLs);
});


//GET/expand-url
router.get("/expand-url/:hash", function(req,res){
  try {
    const url = decode(req.params.hash, existingURLs);
    //const obj = existingURLs.filter(item => item["url"] === url);
    res.send({url})
  } catch (error) {
    res.status(404);
    res.send({
      message: `There is no long URL registered for hash value '${req.params.hash}'`
    })
  }
});


//DELETE /expand-url:hash
router.delete('/expand-url/:hash', function(req,res){
  const itemToDelete = existingURLs.filter(obj => obj["hash"] === req.params.hash);
  if(itemToDelete.length !== 0){
    res.send({message: `URL with hash value '${req.params.hash}' deleted successfully`});
  }else{
    res.send({message: `URL with hash value '${req.params.hash}' does not exist`})
  }
});

//bonus task: GET /:someHash should redirect user to the actual URL (e.g. www.google.com)
router.get('/:hash', function(req,res){
  const checkHashExist = existingURLs.some(obj => obj["hash"] === req.params.hash);

  try {
    const url = decode(req.params.hash, existingURLs);
    if(checkHashExist === true){
      res.redirect(`https://${url}`);
    }
  } catch (error) {
    res.status(404);
    res.send({message: `URL with hash value ${req.params.hash} does not exist`});
  }
});

module.exports = router;