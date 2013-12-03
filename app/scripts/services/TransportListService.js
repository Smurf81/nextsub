'use strict';

angular.module('nextsubApp')
  .factory('Transportlistservice', function($http) {
        var all = function(){
            return $http({
                method:'GET',
                url:'/api/transports'
            });
        }
        var findByLigne = function(ligne){
            return $http({
                method:'GET',
                url:'/ligne/'+ligne
            });
        }
        var findByReseau = function(reseau){
            return $http({
                method:'GET',
                url:'/api/reseau/'+reseau
            });
        }
        var findDestination = function(reseau,line){
            return $http({
                method:'GET',
                url:'/api/reseau/'+reseau+'/'+line
            });
        }
        var findStation = function(destination){
            return $http({
                method:'GET',
                url:'/api/destination/'+destination
            });
        }

        return {
            allTransports : function(){
                return all();
            },
            findByLigne : function(ligne){
                return findByLigne(ligne);
            },
            findByReseau : function(reseau){
                return findByReseau(reseau);
            },
            findDestination : function(reseau,line){
                return findDestination(reseau,line);
            },
            findStation : function(destination){
                return findStation(destination);
            }
        }
  });
