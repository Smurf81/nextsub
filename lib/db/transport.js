'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TransportSchema = new Schema({
		reseau: {type: String, required:true},
        id: {type:Number,required:true},
		lignes:[
            {
                ligne: String,
                twitter:String,
                destinations:[
                    {
                        destination:String,
                        id:String,
                        stations:[
                            {
                                station:String,
                                id:Number
                            }
                        ]
                    }
                ]
            }
        ]
	});

module.exports = mongoose.model('Transport',TransportSchema);

