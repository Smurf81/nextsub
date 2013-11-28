'use strict';

angular.module('nextsubApp')
  .controller('MainCtrl', function ($scope, $http,Timeservice,Transportlistservice,Trafficservice) {
        Trafficservice.getTraffic('rer').success(function(data){
            $scope.trafficRER = data;
        });
        Trafficservice.getTraffic('metro').success(function(data){
            $scope.trafficMetro = data;
        });
        Trafficservice.getTraffic('sncf').success(function(data){
            $scope.trafficSNCF = data;
        });
        Trafficservice.getTraffic('bus').success(function(data){
            $scope.trafficBUS = data;
        });

        Transportlistservice.allTransports().success(function(data){
            $scope.transports = data;
        });

        $scope.$watch('stationSelected',function(event){
            if($scope.ligneSelected && $scope.destinationSelected && $scope.stationSelected){
                Timeservice.getTime($scope.ligneSelected.ligne,$scope.destinationSelected.destination,$scope.stationSelected.station)
                    .success(function(data){
                        $scope.time = data;
                });
            }
        });
  });
