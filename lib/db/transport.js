'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TransportSchema = new Schema({
		ligne: {type: String, required:true},
		destinations:[{destination: String}],
		stations:[{station: String}]
	});

var TransportModel = mongoose.model('Transport',TransportSchema);

