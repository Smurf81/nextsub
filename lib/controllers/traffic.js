'use strict';

var http = require('http');

var options = {
    host: 'ratp-bridge.fabernovel.com',
    port: '80',
    path: '/ratp.traffic.status?reseau=',
    method:'GET'
};

var callback = function(response){
    console.log('reponse reçu :'+response);
}

exports.rerTraffic = function(req,res){
    options.path +='4';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        result.on('data',function(chunk){
            console.log('BODY :'+chunk);
        });
    });
    request.end();
}
exports.sncfTraffic = function(req,res){
    options.path +='2';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        result.on('data',function(chunk){
            console.log('BODY :'+chunk);
        });
    });
    request.end();
}
exports.metroTraffic = function(req,res){
    options.path +='2';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        result.on('data',function(chunk){
            console.log('BODY :'+chunk);
        });
    });
    request.end();
}
exports.busTraffic = function(req,res){
    options.path +='1';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        result.on('data',function(chunk){
            console.log('BODY :'+chunk);
        });
    });
    request.end();
}