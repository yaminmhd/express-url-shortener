process.env.ENV = 'test'

const app = require('../../app');
const request = require('supertest');
const Url = require('../../models/url');
const mongoose = require('mongoose');

describe('routes/urls', ()=>{
  let db;

  beforeAll(async() => {
    const dbUri = 'mongodb://localhost/url-shortener-test-db';
    db = await mongoose.connect(dbUri, ()=>{
      console.log("connected to test db successfully");
    });
    await Url.deleteMany();
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

  afterAll(async() =>{
    await Url.deleteMany();
    await db.close();
  })
})