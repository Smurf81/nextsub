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

        $scope.$watch('stationSelected',function(event){
            if($scope.ligneSelected && $scope.destinationSelected && $scope.stationSelected){
                Timeservice.getTime($scope.ligneSelected.ligne,$scope.destinationSelected.destination,$scope.stationSelected.station)
                    .success(function(data){
                        $scope.time = data;
                });
            }
        });
  })
    .controller('TimeCtrl', function($scope,Transportlistservice,Timeservice){

        $scope.network = function(selectedNetwork){
            $scope.selectedNetwork = selectedNetwork;
            Transportlistservice.findByReseau($scope.selectedNetwork).success(function(data){
                $scope.listNetwork = data.lignes;
            });
        }

        $scope.selectLine = function(selectedLine){
            $scope.selectedLine = selectedLine.network.ligne;
            Transportlistservice.findDestination($scope.selectedNetwork,$scope.selectedLine).success(function(data){
                $scope.listDestination = data;
            });
        }

        $scope.selectDest = function(selectedDesti){
            $scope.selectedDestination = selectedDesti;
            Transportlistservice.findStation($scope.selectedDestination.id).success(function(data){
                $scope.listStations = data;
            });
        }

        $scope.selectSta = function(selectedSta){
            $scope.selectedStation = selectedSta;
            var id_network;
            switch ($scope.selectedNetwork){
                case 'RER':
                    id_network = 4;
                    break;
                case 'METRO':
                    id_network= 2;
                    break;
                case 'SNCF':
                    id_network=3;
                    break;
                case 'BUS':
                    id_network=1;
                    break;
            }
            if(id_network){
                Timeservice.getTime(id_network,$scope.selectedDestination.id,$scope.selectedStation.id).success(function(data){
                    $scope.times = data;
                })
            }
        }
    });
