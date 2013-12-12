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
        restrict: 'A',
        require:'^?state',
        scope:{
            state:'='
        },
        link: function(scope, element, attrs){
            scope.$watch('state', function(value){
                if(value){
                    switch(value){
                        case 1:
                            attrs.$set('src','../images/Feu_vert.svg');
                            break;
                        case 2:
                            attrs.$set('src','../images/Feu_orange.svg');
                            break;
                        case 3:
                            attrs.$set('src','../images/Feu_rouge.svg');
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
