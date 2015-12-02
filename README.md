express-batch-deep
=============

[![Build Status][travis-img]][travis-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![License][license-img]][license-url]

## Description

Handler for [Express 4](http://expressjs.com/4x/api.html) application that allows for batch requests.

It's attached as handler of an particular route, like any kind of middelware.

If you need to perform several different but simultaneous requests to one API endpoint, `express-batch-deep` allows you to combine them all together (in one querystring) and send only one request to the handler's route. This began as a fork of [express-batch](https://github.com/yarikos/express-batch) by [yarikos](https://github.com/yarikos) with the intention of adding support for nested field-value pairs within querystrings. The original `express-batch` module (and many like it) already leveraged `req.query` to separate the distinct batched API endpoints via field-value pairs. However, if any of those batched API endpoints required field-value pairs, it no longer worked. `express-batch-deep`, however, allows for you to pass in an optional "separator" value (in the test, `|` is used as an example), to indicate that the endpoints should not be separated by `&`, and that `&` should rather be considered an integral part of the endpoint's query string. In other words, whereas before `/api/batch?one=/api/test?option1=true&option2=false&two=/api/test` would be represented in the `requests` object as something like

```js
{
  one: '/api/test?option1=true',
  option2: 'false',
  two: '/api/test'
}
```

it is now possible, by initializing the middleware with an optional parameter (e.g., `app.use('/api/batchNested', expressBatchDeep(app, { separator: '|' }))`), and changing the batch endpoint query string accordingly to `/api/batch?one=/api/test?option1=true&option2=false|two=/api/test`, it will now be represented as:

```js
{
  one: '/api/test?option1=true&option2=false',
  two: '/api/test'
}
```

as it might be desired.

All responses are sent back as a JSON object with sections for each response.

Currently only routes for GET locations are supported.

## Example

```js
// app init
var express = require("express");
var expressBatchDeep = require("express-batch");
var app = express();

// mounting batch handler
app.use("/api/batch", expressBatchDeep(app));


// mounting ordinary API endpoints
app.get("/api/constants/pi", function apiUserHandler(req, res) {
    res.send(Math.PI);
});

app.get("/api/users/:id", function apiUserHandler(req, res) {
    res.json({
        id: req.params.id,
        name: "Alice"
    });
});

// starting app
app.listen(3000);
```
[This example in code.](example)

With this example request to  `http://localhost:3000/api/batch?users=/api/users/49&pi=api/constants/pi&nonexistent=/not/existent/route` will return:

```js
{
    users: {
        result: {
            id: "49",
            name: "Alice"
        },
        status: 200
    },
    pi: {
        result: 3.141592653589793,
        status: 200
    },
    nonexistent: {
        result: "Not Found",
        status: 404
    }
}
```
   
   
## License

  [MIT](LICENSE)

============= 


[travis-img]: https://travis-ci.org/ajschlosser/express-batch-deep.svg?branch=master
[travis-url]: https://travis-ci.org/ajschlosser/express-batch-deep
[downloads-img]: https://img.shields.io/npm/dm/express-batch-deep.svg
[downloads-url]: https://npmjs.org/package/express-batch-deep
[license-img]: https://img.shields.io/npm/l/express-batch-deep.svg
[license-url]: LICENSE