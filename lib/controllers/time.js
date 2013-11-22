'use strict';

var http = require('http');

var options = {
    host: 'api-ratp.pierre-grimaud.fr',
    port: '80',
    path: '/rer',
    method:'GET'
};

var callback = function(response) {
    console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(response.headers));

    response.setEncoding('utf8');

    response.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
}

exports.nextTrain = function(req,res) {
    //console.log(req);
    options.path +='/'+req.param.ligne+'/'+req.param.destination+'/'+req.param.station;

    http.request(options,callback).end();
}