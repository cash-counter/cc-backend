'use strict';

global.WINSTON = require('winston');

const app = require('./app/app');

function startup() {
  const port = process.env.PORT || 3010;
  const source = app.startup({
    port: port,
    disableCache: true
  });
  source.subscribe(
    app =>
      global.WINSTON.info(
        `Server started at ${new Date().toISOString()} on port ${app.get('port')}`
      ),
    err => {
      global.WINSTON.error(err);
      process.exit(1);
    }
  );
}


function shutdown() {
  global.WINSTON.info('Received kill signal, shutdown server...');
  app.shutdown();
  global.WINSTON.info('Server has been successfully shutdown');
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startup();