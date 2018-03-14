const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');

const app = express();
// load our own helper functions
const encode = require("./demo/encode");
const decode = require("./demo/decode");

//create existingURL array
const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

//app.set('view engine', 'ejs');
app.use(bodyParser.json());

// TODO: Implement functionalities specified in README
app.get("/", function(req, res) {
  res.send("Hello world!");
});


//POST/shorten-url
app.post('/shorten-url', function(req,res){
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
app.get("/expand-url/:hash", function(req,res){
  try {
    const url = decode(req.params.hash, existingURLs);
    const obj = existingURLs.filter(item => item["url"] === url);
    res.send({url})
  } catch (error) {
    res.status(404);
    res.send({
      message: `There is no long URL registered for hash value '${req.params.hash}'`
    })
  }
});


//delete /expand-url:hash
app.delete('/expand-url/:hash', function(req,res){
  const item = existingURLs.filter(obj => obj["hash"] === req.params.hash);
  if(item){
    res.send(item);
  }else{
    res.send({message: "Not found!"})
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send("error");
});

module.exports = app;
