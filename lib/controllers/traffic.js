'use strict';

var http = require('http');
var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;

//var xml = '<?xml version="1.0" encoding="UTF-8"?><ratp><disruptions><disruption order="1"><value><![CDATA[ Mercredi 27 novembre 2013 (14:36) Trafic normal sur l\'ensemble des lignes de RER.]]></value></disruption></disruptions></ratp>';

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
            //console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(xml);
            var nodes = xpath.select("//value", doc);

            //console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
            //console.log("node: " + nodes[0].toString());

            res.send(200,nodes[0].firstChild.data);
        });
    });
    request.end();
}
exports.sncfTraffic = function(req,res){
    options.path +='2';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        result.on('data',function(chunk){
            //console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(xml);
            var nodes = xpath.select("//value", doc);

            //console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
            //console.log("node: " + nodes[0].toString());

            res.send(200,nodes[0].firstChild.data);
        });
    });
    request.end();
}
exports.metroTraffic = function(req,res){
    options.path +='2';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        result.on('data',function(chunk){
            //console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(xml);
            var nodes = xpath.select("//value", doc);

            //console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
            //console.log("node: " + nodes[0].toString());

            res.send(200,nodes[0].firstChild.data);
        });
    });
    request.end();
}
exports.busTraffic = function(req,res){
    options.path +='1';

    var request = http.request(options,function(result){
        result.setEncoding('utf8');

        result.on('data',function(chunk){
            //console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(xml);
            var nodes = xpath.select("//value", doc);

            //console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
            //console.log("node: " + nodes[0].toString());

            res.send(200,nodes[0].firstChild.data);
        });
    });
    request.end();
}