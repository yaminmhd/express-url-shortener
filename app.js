if(process.env.ENV !== 'production'){
  require('dotenv').load();
}

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const url = require('./routes/url');
const Url = require('./models/url');
const Counter = require('./models/counter');

const app = express();

//app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use('/', url);

const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, async function(err){
  try {
    console.log('Connected successfully');
    await Url.remove({});
    console.log('URL collection removed');
    await Counter.remove({});
    console.log('Counter collection removed');
    const counter = new Counter({_id: 'url_count', count: 10000});
    await counter.save();
    console.log('counter inserted');
  } catch (error) {
    throw error
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
