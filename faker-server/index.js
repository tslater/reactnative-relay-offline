var jsf = require('json-schema-faker');

var schema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/positiveInt'
        },
        'first_name': {
          type: 'string',
          faker: 'name.firstName'
        },
        'last_name': {
          type: 'string',
          faker: 'name.lastName'
        },
        'email_address': {
          type: 'string',
          format: 'email',
          faker: 'internet.email'
        }
      },
      required: ['id', 'name', 'first_name', 'last_name', 'email_address']
    }
  },
  required: ['user'],
  definitions: {
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};

var restify = require('restify');

function respond(req, res, next) {
  const count = parseInt(req.params.number)
  console.log('count', count)
  let results = Array(count).fill().map(() => jsf(schema));
  res.send(results);
  next();
}

var server = restify.createServer();
server.get('/people/:number', respond);
server.head('/people/:number', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
