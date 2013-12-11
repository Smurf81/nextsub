'use strict';

angular.module('nextsubApp')
  .directive('traffic', function () {
    return {
      restrict: 'E',
      template:'<img src="../images/{{network}}.svg" width="30px" height="30px">',
      scope:{
          network:'@'
      },
      replace:true
    };
  }).directive('trafficState',function(){
    return{
        restrict: 'E',
        template:'<img src="../images/Feu_{{color}}.svg" width="30px" height="30px">',
        require:'^?state',
        scope:{
            state:'='
        },
        replace:true,
        link: function(scope, element, attrs){
            scope.$watch(attrs.state, function(value){
                if(value){
                    switch(value){
                        case 1:
                            scope.color='vert';
                            break;
                        case 2:
                            scope.color='orange';
                            break;
                        case 3:
                            scope.color='rouge';
                            break;
                    }
                    element.show();
                } else {
                    element.hide();
                }

            });
        }
    }
});
