'use strict';

angular.module('nextsubApp')
  .controller('MainCtrl', function ($scope, $http,Timeservice,Transportlistservice,Trafficservice,$cookieStore) {
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

        $scope.reload = function(){
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
        }

        $scope.cookie = $cookieStore.get('nextSub');
  })
    .controller('TimeCtrl', function($scope,Transportlistservice,Timeservice,$cookieStore){

        $scope.selectNetwork = function(selectedNetwork){
            $scope.selectedNetwork = selectedNetwork;
            Transportlistservice.findByReseau($scope.selectedNetwork).success(function(data){
                $scope.listNetwork = data.lignes;
            });
        }

        $scope.selectLine = function(selectedLine){
            $scope.selectedLine = selectedLine;
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

        $scope.clear = function(type){
            switch(type){
                case 'network':
                    $scope.selectedNetwork = undefined;
                case 'line':
                    $scope.selectedLine = undefined;
                    if(angular.isUndefined( $scope.listNetwork) && !angular.isUndefined($scope.selectedNetwork)){
                        $scope.selectNetwork($scope.selectedNetwork);
                    }
                case 'destination':
                    $scope.selectedDestination = undefined;
                    if(angular.isUndefined($scope.listDestination) && !angular.isUndefined($scope.selectedLine)){
                        $scope.selectLine($scope.selectedLine);
                    }
                case 'station':
                    $scope.selectedStation = undefined;
                    if(angular.isUndefined($scope.listStations) && !angular.isUndefined($scope.selectedDestination)){
                        $scope.selectDest($scope.selectedDestination);
                    }
            }
        }

        $scope.add = function(index){
            $scope.alreadyAdd = true;
            var f = {
                selectedNetwork:$scope.selectedNetwork,
                selectedLine:$scope.selectedLine,
                selectedDestination:$scope.selectedDestination,
                selectedStation: $scope.selectedStation,
                alreadyAdd : $scope.alreadyAdd
            };
            $scope.listTimeToFollow[index] = f;
            $scope.listTimeToFollow.push({});
            $cookieStore.put('nextSub',$scope.listTimeToFollow);
        }

        $scope.minus = function(index){
            $scope.listTimeToFollow.splice(index,1);
            $cookieStore.put('nextSub',$scope.listTimeToFollow);
        }

        $scope.init = function(index){
            console.log('index :'+index);
            console.log($scope.listTimeToFollow);


            if($scope.listTimeToFollow.length > index){
                $scope.selectedNetwork = $scope.listTimeToFollow[index].selectedNetwork;
                $scope.selectedLine = $scope.listTimeToFollow[index].selectedLine;
                $scope.selectedDestination = $scope.listTimeToFollow[index].selectedDestination;
                $scope.selectedStation = $scope.listTimeToFollow[index].selectedStation;
                $scope.alreadyAdd = $scope.listTimeToFollow[index].alreadyAdd;

                $scope.selectSta($scope.selectedStation);
            }
        }
    })
    .controller('TimesCtrl', function($scope){
        if(angular.isUndefined($scope.cookie)){
            $scope.listTimeToFollow=[{}];
        } else {
            $scope.listTimeToFollow = $scope.cookie;
        }
    });
