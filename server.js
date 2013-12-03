'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs');

var app = express();

// Connect to database
var db = require('./lib/db/mongo');

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with dummy data
require('./lib/db/transport');

// Controllers
var api = require('./lib/controllers/api');
var time = require('./lib/controllers/time');
var traffic = require('./lib/controllers/traffic');

// Express Configuration
app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function(){
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.compress());
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
});

// Routes
// Transport
app.get('/api/transports', api.index);
app.get('/api/reseau/:reseau',api.findByReseau);
app.get('/api/reseau/:reseau/:line',api.findDestination);
app.get('/api/destination/:destination',api.findStation);
app.post('/api/transports',api.addTransport);
app.put('/api/transports/:id',api.updateTransport);
app.delete('/api/transports/:id',api.deleteTransport);
// Horaire
app.get('/time/:ligne/:destination/:station',time.nextTrain);
// Traffic
app.get('/traffic/rer',traffic.rerTraffic);
app.get('/traffic/metro',traffic.metroTraffic);
app.get('/traffic/sncf',traffic.sncfTraffic);
app.get('/traffic/bus',traffic.busTraffic);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
