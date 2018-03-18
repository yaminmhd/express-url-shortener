if(process.env.ENV !== 'production'){
  require('dotenv').load();
}

const app = require("./app");
const mongoose = require('mongoose');
const Url = require('./models/url');
const Counter = require('./models/counter');

const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, async function(err){
  try {
    console.log('DB connected successfully');
    await Url.remove({});
    console.log('URL collection removed');
    await Counter.remove({});
    console.log('Counter collection removed');
    const counter = new Counter({_id: 'url_count', count: 10000});
    await counter.save();
    console.log(`One Counter inserted: ${counter}`);
  } catch (error) {
    throw error
  }
});

const server = app.listen(process.env.PORT || 3000, function() {
  console.log(`Listening on port ${server.address().port}...`);
});
