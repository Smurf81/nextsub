'use strict';

var http = require('http');
var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;

var options = {
    host: 'ratp-bridge2.fabernovel.com',
    port: '80',
    method:'GET'
};

exports.nextTrain = function(req,res) {
    //options.path +='/'+req.params.ligne+'/'+req.params.station+'/'+req.params.destination;
    options.path= 'ratp.schedule?reseau=2&direction=15&station=1';

    console.log('req options : '+options.path);

    var request = http.request(options,function(result){
        console.log('STATUS: ' + result.statusCode);
        console.log('HEADERS: ' + JSON.stringify(result.headers));

        result.setEncoding('utf8');

        result.on('data',function(chunk){
            console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(chunk);
            var nodes = xpath.select("//texte1", doc);
            //res.json(200,chunk);

            res.send(200,nodes[0].firstChild.data);
        });
    });

    request.on('error',function(e){
        console.log('problem with request: '+e.message);
    });

    request.end();
}
