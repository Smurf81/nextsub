'use strict';

angular.module('nextsubApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/transports').success(function(transports) {
      $scope.transports = transports;
    });
  });
