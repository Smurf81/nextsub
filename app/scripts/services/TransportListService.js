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

        return {
            allTransports : function(){
                return all();
            },
            findByLigne : function(ligne){
                return findByLigne(ligne);
            }
        }
  });
