const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Url = require('../models/url');
const fetch = require('fetch').fetchUrl;
// load our own helper functions
//const encode = require('../demo/encode');
//const decode = require("../demo/decode");
const btoa = require('btoa');
const atob = require('atob');
//create existingURL array
const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

// TODO: Implement functionalities specified in README
router.get("/", async function(req, res) {
  const allUrls = await Url.find({});
  res.send(allUrls);
});


//POST/shorten-url
router.post('/shorten-url', async function(req,res){
  const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
  const regexp = new RegExp(expression);
  const urlData = req.body.url;
  const validUrl = regexp.test(urlData);
  if (validUrl) {
    try {
      const doc = await Url.findOne({url:urlData})
      if(doc){
        res.send({
          url:urlData,
          hash: btoa(doc._id),
          status: 200,
          statusTxt: 'OK'
        });
      }else{
        console.log('entry not found in db, saving new');
        const url = new Url({
          url: urlData
        });
        await url.save()
        res.send({
          url:urlData,
          hash: btoa(url._id),
          status: 200,
          statusTxt: 'OK'
        });
      }
    }catch(error) {
      throw error;
    }
  }else{
    res.send({
      message: 'Invalid URL provided. Try again'
    });
  }
  // const shortenedUrl = {
  //    id: existingURLs.length+1,
  //    url,
  //    hash
  // }

  // existingURLs.push(shortenedUrl);
  // res.send(existingURLs);
});


//GET/expand-url
router.get("/expand-url/:hash", async function(req,res){
  try {
    const id = await atob(req.params.hash);
    const urlString = await Url.findOne({_id:id});
    res.send({url: urlString.url})
  } catch (error) {
    res.status(404);
    res.send({
      message: `There is no long URL registered for hash value '${req.params.hash}'`
    })
  }
});


//DELETE /expand-url:hash
router.delete('/expand-url/:hash', async function(req,res){
  try {
    const hashToDelete = await Url.findOne({hash:req.params.hash});
    //console.log(`Item to delete : ${hashToDelete}`);
    if(hashToDelete){
      await Url.findOneAndRemove(hashToDelete.hash)
      res.send({message: `URL with hash value '${req.params.hash}' deleted successfully`});
    }else{
      res.send({message: `URL with hash value '${req.params.hash}' does not exist`})
    }
  } catch (error) {
    throw error;
  }
});

//bonus task: GET /:someHash should redirect user to the actual URL (e.g. www.google.com)
router.get('/:hash', async function(req,res){
  //const checkHashExist = existingURLs.some(obj => obj["hash"] === req.params.hash);
  try {
    const {url} = await Url.findOne({hash:req.params.hash});
    res.redirect(`https://${url}`);
  } catch (error) {
    res.status(404);
    res.send({message: `URL with hash value ${req.params.hash} does not exist`});
  }
});

module.exports = router;