'use strict';

var http = require('http');
var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;

//var xml = '<?xml version="1.0" encoding="UTF-8"?><ratp><disruptions><disruption order="1"><value><![CDATA[ Mercredi 27 novembre 2013 (14:36) Trafic normal sur l\'ensemble des lignes de RER.]]></value></disruption></disruptions></ratp>';

var options = {
    host: 'ratp-bridge.fabernovel.com',
    port: '80',
    method:'GET'
};

var string_ok = 'Trafic normal sur l\'ensemble des lignes';

var callback = function(response){
    console.log('reponse reçu :'+response);
}

exports.rerTraffic = function(req,res){
    options.path ='/ratp.traffic.status?reseau=4';

    //console.log('req options : '+options.path);

    var etat={};

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        result.on('data',function(chunk){
            console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(chunk);
            var nodes = xpath.select("//value", doc);

            var stringToParse = nodes[0].toString();

            if(stringToParse.contains(string_ok)){
                etat.status = 1;
            } else {
                etat.status = 2;
            }
            etat.message = stringToParse;

            res.json(200,etat);
        });

        result.on('error',function(e){
            etat.status = 3;

            res.json(200,etat);
        });
    });
    request.end();
}
exports.sncfTraffic = function(req,res){
    options.path ='/ratp.traffic.status?reseau=3';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        var etat = {};

        result.on('data',function(chunk){
            //console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(chunk);
            var nodes = xpath.select("//value", doc);

            var stringToParse = nodes[0].toString();

            if(stringToParse.contains(string_ok)){
                etat.status = 1;
            } else {
                etat.status = 2;
            }

            etat.message = stringToParse;

            res.json(200,etat);
        });

        result.on('error',function(e){
            etat.status = 3;

            res.json(200,etat);
        });
    });
    request.end();
}
exports.metroTraffic = function(req,res){
    options.path ='/ratp.traffic.status?reseau=2';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        var etat = {};

        result.on('data',function(chunk){
            //console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(chunk);
            var nodes = xpath.select("//value", doc);

            var stringToParse = nodes[0].toString();

            if(stringToParse.contains(string_ok)){
                etat.status = 1;
            } else {
                etat.status = 2;
            }
            etat.message = stringToParse;

            res.json(200,etat);
        });

        result.on('error',function(e){
            etat.status = 3;

            res.json(200,etat);
        });
    });
    request.end();
}
exports.busTraffic = function(req,res){
    options.path ='/ratp.traffic.status?reseau=1';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        var etat = {};

        result.on('data',function(chunk){
            //console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(chunk);
            var nodes = xpath.select("//value", doc);

            var stringToParse = nodes[0].toString();

            if(stringToParse.contains(string_ok)){
                etat.status = 1;
            } else {
                etat.status = 1;
            }
            etat.message = stringToParse;

            res.json(200,etat);
        });

        result.on('error',function(e){
            etat.status = 3;

            res.json(200,etat);
        });
    });
    request.end();
}