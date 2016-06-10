app.controller('PregledStavkiCenovnikaCtrl', ['$scope', '$location', 'stavkaCenovnikaService', function($scope, $location, stavkaCenovnikaService) {

   $scope.stavkeCenovnika = [];
   var refreshData = function() {
       stavkaCenovnikaService.ucitajStavkeCenovnika().then(function(response) {
            $scope.stavkeCenovnika = response.data;
       });
   }

   refreshData();

   $scope.izmeniStavkuCenovnika = function (id) {
       $location.path('/izmena_stavke_cenovnika/' + id);
   }

   $scope.izbrisiStavkuCenovnika = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete stavku cenovnika: ' + id + "?")) {
            return;
       }

      stavkaCenovnikaService.izbrisiStavkuCenovnika(id).then(function(response) {
            for (var i = 0; i < $scope.stavkeCenovnika.length; i++) {
                if ($scope.stavkeCenovnika[i].id_stavke_cenovnika == id) {
                    $scope.stavkeCenovnika.splice(i, 1);
                    break;
                }
            }
       });
   }

   
}]);

app.controller('KreiranjeStavkeCenovnikaCtrl', ['$scope', '$location', 'stavkaCenovnikaService', 'cenovnikService','proizvodService', function($scope, $location, stavkaCenovnikaService, cenovnikService, proizvodService) {
    
    $scope.cenovnici = [];
    $scope.proizvodi = [];
    
    $scope.errorMessage = "";
   
    $scope.novaStavkaCenovnika = {
       id_cenovnika: "",
       id_proizvoda: "",
       cena: "",
    };
   
    cenovnikService.ucitajCenovnike().then(function(response) {
            $scope.cenovnici = response.data;
    });

    proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = response.data;
    });

   $scope.kreirajStavkuCenovnika = function() {
       if ($scope.novaStavkaCenovnika.id_cenovnika == "" || $scope.novaStavkaCenovnika.id_proizvoda == "" || $scope.novaStavkaCenovnika.cena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       stavkaCenovnikaService.dodajStavkuCenovnika($scope.novaStavkaCenovnika).then(function(response) {
            $location.path('/pregled_stavki_cenovnika');
       });
   }
   
}]); 

app.controller('IzmenaStavkeCenovnikaCtrl', ['$scope', '$location', '$routeParams', 'stavkaCenovnikaService', 'cenovnikService', 'proizvodService', function($scope, $location, $routeParams, stavkaCenovnikaService, cenovnikService, proizvodService) {
    $scope.stavkaCenovnika = {
       id_stavke_cenovnika: "",
       id_cenovnika: "",
       id_proizvoda: "",
       cena: "",
    }

    $scope.cenovnici = [];
    $scope.proizvodi = [];
   
    $scope.errorMessage = "";

    stavkaCenovnikaService.getStavkaCenovnika($routeParams.id).then(function(response) {
        $scope.stavkaCenovnika = response.data;
    });

    cenovnikService.ucitajCenovnike().then(function(response) {
            $scope.cenovnici = response.data;
    });

    proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.stavkaCenovnika.id_cenovnika == "" || $scope.stavkaCenovnika.id_proizvoda == "" || $scope.stavkaCenovnika.cena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       stavkaCenovnikaService.sacuvajStavkuCenovnika($scope.stavkaCenovnika).then(function(response) {
            $location.path('/pregled_stavki_cenovnika');
       });
    }
}]);