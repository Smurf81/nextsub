'use strict';

var http = require('http');

var options = {
    host: 'api-ratp.pierre-grimaud.fr',
    port: '80',
    path: '/rer',
    method:'GET'
};

exports.nextTrain = function(req,res) {
    options.path +='/'+req.params.ligne+'/'+req.params.station+'/'+req.params.destination;

    console.log('req options : '+options.path);

    var request = http.request(options,function(result){
        console.log('STATUS: ' + result.statusCode);
        console.log('HEADERS: ' + JSON.stringify(result.headers));

        result.setEncoding('utf8');

        result.on('data',function(chunk){
            console.log('BODY :'+chunk);
            res.json(200,chunk);
        });
    });

    request.on('error',function(e){
        console.log('problem with request: '+e.message);
    });

    request.end();
}
