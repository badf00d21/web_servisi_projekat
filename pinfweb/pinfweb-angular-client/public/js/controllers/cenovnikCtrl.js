app.controller('PregledCenovnikaCtrl', ['$scope', '$location', 'cenovnikService', function($scope, $location, cenovnikService) {

   $scope.cenovnici = [];

   var refreshData = function() {
       cenovnikService.ucitajCenovnike().then(function(response) {
            $scope.cenovnici = response.data;
       });
   }

   refreshData();

   $scope.izmeniCenovnik = function (id) {
       $location.path('/izmena_cenovnika/' + id);
   }

   $scope.izbrisiCenovnik = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete cenovnik: ' + id + "?")) {
            return;
       }

       cenovnikService.izbrisiCenovnik(id).then(function(response) {
            for (var i = 0; i < $scope.cenovnici.length; i++) {
                if ($scope.cenovnici[i].id_cenovnika == id) {
                    $scope.cenovnici.splice(i, 1);
                    break;
                }
            }
       });
   }

   $scope.kopirajCenovnik = function (id) {
       $location.path('/kopiranje_cenovnika/' + id);
   }
   
}]);

app.controller('KreiranjeCenovnikaCtrl', ['$scope', '$location', 'cenovnikService', 'preduzeceService', function($scope, $location, cenovnikService, preduzeceService) {
    
    $scope.preduzeca = [];
    $scope.errorMessage = "";
   
    $scope.noviCenovnik = {
       id_preduzeca : "",
       datum_vazena: ""  
    };
   
    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });
   
   $scope.kreirajCenovnik = function() {
       if ($scope.noviCenovnik.id_preduzeca == "" || $scope.noviCenovnik.datum_vazena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       cenovnikService.dodajCenovnik($scope.noviCenovnik).then(function(response) {
            $location.path('/pregled_cenovnika');
       });
   }
   
}]); 

app.controller('IzmenaCenovnikaCtrl', ['$scope', '$location', '$routeParams', 'cenovnikService', 'preduzeceService', function($scope, $location, $routeParams, cenovnikService, preduzeceService) {
    $scope.cenovnik = {
        id_cenovkika: "",
        id_preduzeca: "",
        datum_vazena: ""
    }

    $scope.preduzeca = [];
    $scope.errorMessage = "";

    cenovnikService.getCenovnik($routeParams.id).then(function(response) {
        $scope.cenovnik = response.data;
    });

    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.cenovnik.id_preduzeca == "" || $scope.cenovnik.datum_vazena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       cenovnikService.sacuvajCenovnik($scope.cenovnik).then(function(response) {
            $location.path('/pregled_cenovnika');
       });
    }
}]);