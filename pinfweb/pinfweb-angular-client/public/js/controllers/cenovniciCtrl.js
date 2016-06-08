app.controller('PregledCenovnikaCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

   $scope.cenovnici = [];

   // Test data -----------------------------------------------
   var cenovnik1 = {
       id_cenovnika: "1",
       id_preduzeca: "1",
       datum_vazena: "25-10-2016"
   }
   
    var cenovnik2 = {
       id_cenovnika: "2",
       id_preduzeca: "2",
       datum_vazena: "25-10-2014"
    }
  
   $scope.cenovnici.push(cenovnik1, cenovnik2);
   // -----------------------------------------------------------

   $http.get('http://localhost:8000/cenovnik').success(function(response) {
       for (cenovnik in response) {
           $scope.cenovnici.push(response[cenovnik]);
       }
   });
   
}]);

app.controller('KreiranjeCenovnikaCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    
    $scope.preduzeca = [];
    $scope.errorMessage = "";
    $scope.selektovanoPreduzece = "Preduzece: Nije odabrano";
    
    $scope.noviCenovnik = {
     id_preduzeca : "",
     datum_vazena: ""  
   };
   
    // Test data -----------------------------------------------
   var preduzece1 = {
       id_preduzeca: "1",
       nazivpreduzeca: "Preduzece 1",
   }
   
    var preduzece2 = {
       id_preduzeca: "2",
       nazivpreduzeca: "Preduzece 2"
    }
  
   $scope.preduzeca.push(preduzece1, preduzece2);
   // -----------------------------------------------------------
   
   $http.get('http://localhost:8000/preduzece').success(function(response) {
       for (preduzece in response) {
           $scope.cenovnici.push(response[preduzece]);
       }
   });
   
   $scope.kreirajCenovnik = function() {
       if ($scope.noviCenovnik.id_preduzeca == "" || $scope.noviCenovnik.datum_vazena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       $http.post('http://localhost:8000/cenovnik', $scope.noviCenovnik).success(function(response) {
             $location.path('/cenovnici');    
       });
   }
   
}]); 