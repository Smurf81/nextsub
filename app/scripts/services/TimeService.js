'use strict';

angular.module('nextsubApp')
  .factory('Timeservice', function ($http) {
        var time = function(ligne,destination,station) {
            return $http({
                method:'GET',
                url:'/time/'+ligne+'/'+destination+'/'+station
            });
        }

        return {
            getTime : function(ligne,destination,station){
                return time(ligne,destination,station);
            }
        }
  });
