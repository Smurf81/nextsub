'use strict';

angular.module('nextsubApp')
  .factory('Trafficservice', function($http) {
        var rerTraffic = function(){
            return $http({
                method:'GET',
                url:'/traffic/rer'
            });
        }
        var metroTraffic = function(){
            return $http({
                method:'GET',
                url:'/traffic/metro'
            });
        }
        var busTraffic = function(){
            return $http({
                method:'GET',
                url:'/traffic/bus'
            });
        }
        var sncfTraffic = function(){
            return $http({
                method:'GET',
                url:'/traffic/sncf'
            });
        }

        return {
            getTraffic : function(type){
                switch(type){
                    case "rer":
                        return rerTraffic();
                    case "metro":
                        return metroTraffic();
                    case "bus":
                        return busTraffic();
                    case "sncf":
                        return sncfTraffic();
                    default :
                        return null;
                }
            }
        }
  });
