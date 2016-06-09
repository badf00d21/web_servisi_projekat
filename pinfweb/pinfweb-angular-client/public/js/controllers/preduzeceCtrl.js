app.controller('PregledPreduzecaCtrl', ['$scope', '$location', 'preduzeceService', function($scope, $location, preduzeceService) {

   $scope.preduzeca = [];

   var refreshData = function() {
       preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
       });
   }

   refreshData();

   $scope.izmeniPreduzece = function (id) {
       $location.path('/izmena_preduzeca/' + id);
   }

   $scope.izbrisiPreduzece = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete preduzece: ' + id + "?")) {
            return;
       }

       preduzeceService.izbrisiPreduzece(id).then(function(response) {
            for (var i = 0; i < $scope.preduzeca.length; i++) {
                if ($scope.preduzeca[i].id_preduzeca == id) {
                    $scope.preduzeca.splice(i, 1);
                    break;
                }
            }
       });
   }
}]);

app.controller('KreiranjePreduzecaCtrl', ['$scope', '$location','preduzeceService', function($scope, $location, preduzeceService) {
    
    $scope.errorMessage = "";
   
    $scope.novoPreduzece = {
        nazivpreduzeca: ""
    };
   
   $scope.kreirajPreduzece = function() {
       if ($scope.novoPreduzece.nazivpreduzeca == "") {
           $scope.errorMessage = "Niste uneli naziv preduzeca!";
           return;
       }
       
       preduzeceService.dodajPreduzece($scope.novoPreduzece).then(function(response) {
            $location.path('/pregled_preduzeca');
       });
   }
   
}]); 

app.controller('IzmenaPreduzecaCtrl', ['$scope', '$location', '$routeParams', 'preduzeceService', function($scope, $location, $routeParams, preduzeceService) {
    $scope.preduzece = {
        id_preduzeca: "",
        nazivpreduzeca: ""
    }

    $scope.errorMessage = "";

    preduzeceService.getPreduzece($routeParams.id).then(function(response) {
        $scope.preduzece = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.preduzece.nazivpreduzeca == "") {
           $scope.errorMessage = "Niste uneli naziv preduzeca!";
           return;
       }

       preduzeceService.sacuvajPreduzece($scope.preduzece).then(function(response) {
            $location.path('/pregled_preduzeca');
       });
    }
}]);