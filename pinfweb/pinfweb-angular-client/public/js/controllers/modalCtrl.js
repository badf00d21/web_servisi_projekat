app.controller('ModalController', function($scope, close) {
   
   $scope.close = function(result) {
       close(result, 500);
   } 
});