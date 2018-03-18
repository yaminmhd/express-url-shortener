process.env.ENV = 'test'

const app = require('../../app');
const request = require('supertest');
const Url = require('../../models/url');
const mongoose = require('mongoose');
const btoa = require('btoa');
const Counter = require('../../models/counter');

describe('routes/urls', ()=>{
  let db;

  beforeAll(async() => {
    const dbUri = 'mongodb://localhost/url-shortener-test-db';
    db = await mongoose.connect(dbUri, async ()=>{
      try {
        console.log("connected to test DB successfully");
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
  });

  it('POST/shorten-url should return a status of 200 and display the url created', async() => {
    const urlString = 'www.google.com';

    const response = await request(app)
      .post('/shorten-url')
      .send({url: urlString});

    expect(response.status).toEqual(200);
    expect(response.header['content-type']).toContain('application/json');
    expect(response.body.url).toEqual(urlString);
    expect(response.body.hash).toEqual('MTAwMDA=');
  });

  it('GET/expand-url/:hash shoud return a status of 200 and expand the hash to a url', async () => {
    const response = await request(app)
      .get('/expand-url/MTAwMDA=')
    expect(response.status).toEqual(200);
    expect(response.body.url).toEqual('www.google.com');
  });

  it('DELETE/expand-url/:hash should return a status of 200 and delete the hash from the DB', async() => {
    const response = await request(app)
      .delete('/expand-url/MTAwMDA=')

      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual('URL with hash value \'MTAwMDA=\' deleted successfully');
  });

  afterAll(async() =>{
    await Url.deleteMany();
    await Counter.deleteMany();
    await db.close();
  })

})