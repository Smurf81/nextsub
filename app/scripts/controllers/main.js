'use strict';

angular.module('nextsubApp')
  .controller('MainCtrl', function ($scope, $http,Timeservice) {
    $http.get('/api/transports').success(function(data) {
      $scope.transports = data;
    });

        $scope.$watch('stationSelected',function(event){
            if($scope.ligneSelected && $scope.destinationSelected && $scope.stationSelected){
                Timeservice.getTime($scope.ligneSelected.ligne,$scope.destinationSelected.destination,$scope.stationSelected.station)
                    .success(function(data){
                        console.log(data);
                });
            }
        });
  });
