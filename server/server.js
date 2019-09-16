// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var helmet = require('helmet');

global.app = module.exports = loopback();

app.use(loopback.static("client/"));


app.use(helmet());
app.disable('x-powered-by');
app.use(helmet.noCache());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.xssFilter({
  setOnOldIE: true
}));

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, {
  appRootDir: __dirname, dataSources: {
    "mongodb": {
      "host": process.env.MONGO_HOST || "localhost",
      "port": process.env.MONGO_PORT || "27017",
      "url": "",
      "database": "vsfgg",
      "password": "",
      "name": "mongodb",
      "user": "",
      "connector": "mongodb",
      "debug": false,
      "loggerLevel": -1
    }
  }
}, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
