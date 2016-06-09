app.controller('PregledStopaPdvaCtrl', ['$scope', '$location', 'stopaPdvaService', function($scope, $location, stopaPdvaService) {

   $scope.stopePdva = [];

   var refreshData = function() {
       stopaPdvaService.ucitajStopePdva().then(function(response) {
            $scope.stopePdva = response.data;
       });
   }

   refreshData();

   $scope.izmeniStopuPdva = function (id) {
       $location.path('/izmena_stope_pdva/' + id);
   }

   $scope.izbrisiStopuPdva = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete stopu pdv-a: ' + id + "?")) {
            return;
       }

       stopaPdvaService.izbrisiStopuPdva(id).then(function(response) {
            for (var i = 0; i < $scope.stopePdva.length; i++) {
                if ($scope.stopePdva[i].id_stope == id) {
                    $scope.stopePdva.splice(i, 1);
                    break;
                }
            }
       });
   }
}]);

app.controller('KreiranjeStopePdvaCtrl', ['$scope', '$location', 'stopaPdvaService', 'pdvService', function($scope, $location, stopaPdvaService, pdvService) {
    
    $scope.pdvovi = [];
    $scope.errorMessage = "";
   
    $scope.novaStopaPdva = {
       id_pdv_a : "",
       stopa: "",
       datum_vazenja: ""  
    };
   
    pdvService.ucitajPdvove().then(function(response) {
            $scope.pdvovi = response.data;
    });
   
   $scope.kreirajStopuPdva = function() {
       if ($scope.novaStopaPdva.id_pdv_a == "" || $scope.novaStopaPdva.stopa == ""|| $scope.novaStopaPdva.datum_vazenja == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       stopaPdvaService.dodajStopuPdva($scope.novaStopaPdva).then(function(response) {
            $location.path('/pregled_stopa_pdva');
       });
   }
   
}]); 

app.controller('IzmenaStopePdvaCtrl', ['$scope', '$location', '$routeParams', 'stopaPdvaService', 'pdvService', function($scope, $location, $routeParams, stopaPdvaService, pdvService) {
    $scope.stopaPdva = {
        id_stope: "",
        id_pdv_a: "",
        stopa: "",
        datum_vazenja: ""
    }

    $scope.pdvovi = [];
    $scope.errorMessage = "";

    stopaPdvaService.getStopaPdva($routeParams.id).then(function(response) {
        $scope.stopaPdva = response.data;
    });

    pdvService.ucitajPdvove().then(function(response) {
            $scope.pdvovi = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.stopaPdva.id_pdv_a == "" || $scope.stopaPdva.stopa == ""|| $scope.stopaPdva.datum_vazenja == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       stopaPdvaService.sacuvajStopuPdva($scope.stopaPdva).then(function(response) {
            $location.path('/pregled_stopa_pdva');
       });
    }
}]);