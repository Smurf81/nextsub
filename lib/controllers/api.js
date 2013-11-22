'use strict';

var mongoose = require('mongoose'),
TransportModel = mongoose.model('Transport'),
    async = require('async');

exports.index = function(req,res) {
	return TransportModel.find(function(err,transports){
		if(!err){
			res.json(transports);
		} else {
			console.log(err);
		}
	});
}

exports.findById = function(req,res) {
	return TransportModel.findById(req.params.id,function(err,transport){
		if(!err){
			res.jsonp(transport);
		} else {
			console.log(err);
		}
	});
}

exports.findByLigne = function(req,res) {
    return TransportModel.findOne({'ligne':req.params.ligne},function(err,transport){
       if(!err){
           res.jsonp(transport);
       } else {
           console.log(err);
       }
    });
}

exports.addTransport = function(req,res) {
	var transport;
	transport = new TransportModel({
		ligne: req.body.ligne,
		destinations: req.body.destinations,
		stations: req.body.stations
	});
	transport.save(function(err){
		if(!err){
			console.log("created");
		} else {
			console.log(err);
		}
	});

	return res.send(transport);
}

exports.updateTransport = function(req,res) {
    return TransportModel.findById(req.params.id,function(err,transport){
        transport.ligne = req.body.ligne;
        transport.destinations = req.body.destinations;
        transport.stations = req.body.stations;

        transport.save(function(err){
            if(!err){
                console.log('saved');
                res.send(transport);
            } else {
                console.log(err);
            }
        });
    });
}

exports.deleteTransport = function(req,res) {
    return TransportModel.findById(req.params.id,function(err,transport){
        return transport.remove(function(err){
            if(!err){
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });

    });
}
