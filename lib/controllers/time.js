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
    options.path= '/ratp.schedule?reseau='+req.params.ligne+'&direction='+req.params.destination+'&station='+req.params.station;

    console.log('req options : '+options.path);

    /*
    var string = {
        times : [
            {
                time:"Train à approche",
                direction:'Boissy'
            },{
                time:"09:30",
                direction:'Cergy'
            }
        ]
    }

    res.jsonp(200,string);
    */
    var request = http.request(options,function(result){
        console.log('STATUS: ' + result.statusCode);
        console.log('HEADERS: ' + JSON.stringify(result.headers));

        result.setEncoding('utf8');

        var jsonResult = {};
        jsonResult.times = [];

        result.on('data',function(chunk){
            console.log('BODY :'+chunk);
            var doc = new dom().parseFromString(chunk);
            var dir = xpath.select("//texte1", doc);
            //res.json(200,chunk);
            //jsonResult.direction = dir[0].firstChild.data;
            var times = xpath.select("//texte2", doc);

            for(var i=0;i<times.length;i++){
                if(i<2){
                    var tmp = {}
                    tmp.time = times[i].firstChild.data;
                    tmp.direction = dir[i].firstChild.data;

                    jsonResult.times[i] = tmp;
                }
            }
            res.json(200,jsonResult);
        });
    });

    request.on('error',function(e){
        console.log('problem with request: '+e.message);
    });

    request.end();
}
