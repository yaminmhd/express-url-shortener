const mongoose = require('mongoose');
const Counter = require('./counter');
const btoa = require('btoa');

const urlSchema = new mongoose.Schema({
  _id: {type:Number},
  url: '',
  hash: '',
  created_at: ''
});

urlSchema.pre('save', async function(next){
  console.log('running pre-save');
  let doc = this;
  const counter = await Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {count: 1}});
  try {
    console.log(counter);
    console.log(counter.count);
    doc._id = counter.count;
    doc.hash = btoa(doc._id);
    doc.created_at = new Date();
    console.log(doc);
    next();
  } catch (err) {
    if(err) return next(err);
  }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;