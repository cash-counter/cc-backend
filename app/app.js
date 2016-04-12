'use strict';

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const databaseAPI = require('./apis/database-api');
const routes = require('./routes');
const Rx = require('rxjs');
const app = express();

app.set('port', process.env.PORT || 3010);

app.disable('etag');

app.use(bodyParser.json());
app.use(morgan('dev'));
routes(app);

const server = http.createServer(app);

function startup() {
  return Rx.Observable.create(observer => {
    databaseAPI.createConnection().subscribe(() => {
      server.listen(app.get('port'), () => {
        observer.next(app);
        observer.complete();
      });
    }, (err) => {
      observer.error(err);
    });
  });
}

function shutdown() {
  server.close();
  databaseAPI.closeConnection();
}

exports.startup = startup;
exports.shutdown = shutdown;
