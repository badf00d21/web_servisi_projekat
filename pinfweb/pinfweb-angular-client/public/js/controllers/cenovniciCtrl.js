app.controller('CenovniciCtrl', ['$scope', function($scope) {

   $scope.cenovnici = [];

   var cenovnik1 = {
       idCenovnika: "1",
       idPreduzeca: "1",
       datumVazenja: "25-10-2016"
   };

   var cenovnik2 = {
       idCenovnika: "2",
       idPreduzeca: "2",
       datumVazenja: "25-10-2014"
   };

   $scope.cenovnici.push(cenovnik1, cenovnik2);
   
}]);