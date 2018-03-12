# Build a URL shortener web service using Express.js 

Build a URL-shortener service like [bit.ly](https://bitly.com/) or [goo.gl](https://goo.gl/) using Express.js.

## Getting started
- Fork and clone the repo
- Install dependencies: `yarn install`
- Start the application: `node server.js`
  - You can also use `nodemon` to automatically restart your application with every code change: `nodemon server.js`

## Your Task

At a very high level, the URL shortener works by taking an entered URL and creating a relatively shortened version simplified into an easy to share format.

In this assignment, you need to implement two API endpoints:

### POST /shorten-url

The body of the HTTP request should be an JSON object containing one field `url`, e.g.

```json
{
   "url": "https://facebook.github.io/jest/docs/en/asynchronous.html"
}
```

The response body is an JSON object containing one field `hash`, e.g.

```json
{
   "hash": "MTAwMDA="
}
```

Requirements:

- The `hash` in the response is a unique value for each given `url` (i.e. two different URLs should maps to different `hash` values)
- Calling the API multiple times with the same `url` value should get back the same `hash` value. Each time this API is called, the HTTP status code in the response should be `200`, even if the url has been shortened before

Hint: the trick here is how to generate a hash value that's short and unique.

One of the solution is:

- keep a counter on the server side
- assign a unique counter value for each new URL submitted
- generate [base64 encoding](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding) of the counter value as the hash value

### GET /expand-url?hash=someHash

There is a query parameter to the URL called `hash`, e.g.

```text
GET /expand-url?hash=MTAwMDA%3D
```

Note that the query parameter `MTAwMDA%3D` is [url-encoded](https://www.urlencoder.org/) value of `MTAwMDA=`. It has to be encoded so that it can be used as part of URL.

There are two scenarios you need to handle:

#### Scenario 1

Suppose the given hash value does not correspond to any valid URLs registered with `/shorten-url`, the API should return HTTP status code `404` and the response body should look like

```json
{
  "message": "There is no long URL registered for hash value 'MTAwMDA='";
}
```

#### Scenario 2

Suppose the given hash value maps to an existing URL registered with `/shorten-url`, the API should return HTTP status code `200` with a JSON string in body:

```json
{
   "url": "https://facebook.github.io/jest/docs/en/asynchronous.html"
}
```

### DELETE /expand-url?hash=someHash

Suppose someone wants to delete the record of the shortened URL (people do that when they don't want their bitly link to be accessible anymore). The API should delete the record if it exists and return a HTTP status code `200` and a JSON string in body.

```json
{
   "message": "URL with hash value 'MTAwMDA=' deleted successfully";
}
```

If the record doesn't exist, it should return a HTTP status code `404` and a JSON string in body.

```json
{
   "message": "URL with hash value 'MTAwMDA=' does not exist";
}
```

You can try make a HTTP request (GET /expand-url?hash=someHash) to verify that the record was deleted successfully
