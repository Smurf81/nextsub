'use strict';

var mongoose = require('mongoose'),
TransportModel = mongoose.model('Transport'),
    async = require('async'),
    Transport = require('../db/transport');

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

exports.findByReseau = function(req,res) {
    return TransportModel.findOne({'reseau':req.params.reseau},'lignes.ligne',function(err,reseau){
        if(!err){
            res.jsonp(reseau);
        } else {
            console.log(err);
        }
    });
}

exports.findDestination = function(req,res){ return TransportModel.aggregate(
            {
                $unwind:"$lignes"
            },
            {
                $project:{
                    '_id':0,
                    'lignes.ligne':1,
                    'lignes.destinations.destination' : 1,
                    'lignes.destinations.id': 1
                }
            },
            {
                $match:{
                    'lignes.ligne':req.params.line
                }
            }
            ,function(e,d){
            if(!e){
                res.jsonp(d[0].lignes.destinations);
            } else {
                console.log(e);
            }
        });
}

exports.findStation = function(req,res){ return TransportModel.aggregate(
    {
        $unwind:"$lignes"
    },
    {
        $project:{
            '_id':0,
            'lignes.ligne':1,
            'lignes.destinations.destination' : 1,
            'lignes.destinations.id': 1,
            'lignes.destinations.stations':1
        }
    },
    {
        $unwind:"$lignes.destinations"
    },
    {
        $match:{
            'lignes.destinations.id':req.params.destination
        }
    }
    ,function(e,d){
        if(!e){
            res.jsonp(d[0].lignes.destinations.stations);
        } else {
            console.log(e);
        }
    });
}

exports.addTransport = function(req,res) {
	var transport;
	transport = new TransportModel({
		reseau: req.body.reseau,
		lignes: req.body.lignes,
		id: req.body.id
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
