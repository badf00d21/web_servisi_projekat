app.controller('PregledStavkiNarudzbeniceCtrl', ['$scope', '$location', 'stavkaNarudzbeniceService', function($scope, $location, stavkaNarudzbeniceService) {

   $scope.stavkeNarudzbenice = [];
   var refreshData = function() {
       stavkaNarudzbeniceService.ucitajStavkeNarudzbenice().then(function(response) {
            $scope.stavkeNarudzbenice = response.data;
       });
   }

   refreshData();

   $scope.izmeniStavkuNarudzbenice = function (id) {
       $location.path('/izmena_stavke_narudzbenice/' + id);
   }

   $scope.izbrisiStavkuNarudzbenice = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete stavku narudzbenice: ' + id + "?")) {
            return;
       }

      stavkaNarudzbeniceService.izbrisiStavkuNarudzbenice(id).then(function(response) {
            for (var i = 0; i < $scope.stavkeNarudzbenice.length; i++) {
                if ($scope.stavkeNarudzbenice[i].id_stavke_narudzbenice == id) {
                    $scope.stavkeNarudzbenice.splice(i, 1);
                    break;
                }
            }
       });
   }

   
}]);

app.controller('KreiranjeStavkeNarudzbeniceCtrl', ['$scope', '$location', 'stavkaNarudzbeniceService', 'narudzbenicaService','proizvodService', function($scope, $location, stavkaNarudzbeniceService, narudzbenicaService, proizvodService) {
    
    $scope.narudzbenice = [];
    $scope.proizvodi = [];
    
    $scope.errorMessage = "";
   
    $scope.novaStavkaNarudzbenice = {
       id_narudzbenice: "",
       id_proizvoda: "",
       kolicina: "",
       rabat: "",
       jedinicna_cena: "",
       stopa_pdv_a: "",
       osnovica: "",
       iznos_pdv_a: "",
       ukupan_iznos: ""
    };
   
    narudzbenicaService.ucitajNarudzbenice().then(function(response) {
            $scope.narudzbenice = response.data;
    });

    proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = response.data;
    });

   $scope.kreirajStavkuNarudzbenice = function() {
       if ($scope.novaStavkaNarudzbenice.id_narudzbenice == "" || $scope.novaStavkaNarudzbenice.id_proizvoda == "" || $scope.novaStavkaNarudzbenice.kolicina == ""
            || $scope.novaStavkaNarudzbenice.rabat == "" || $scope.novaStavkaNarudzbenice.jedinicna_cena == "" || $scope.novaStavkaNarudzbenice.stopa_pdv_a == ""
            || $scope.novaStavkaNarudzbenice.osnovica == "" || $scope.novaStavkaNarudzbenice.iznos_pdv_a == "" || $scope.novaStavkaNarudzbenice.ukupan_iznos == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       stavkaNarudzbeniceService.dodajStavkuNarudzbenice($scope.novaStavkaNarudzbenice).then(function(response) {
            $location.path('/pregled_stavki_narudzbenice');
       });
   }
   
}]); 

app.controller('IzmenaStavkeNarudzbeniceCtrl', ['$scope', '$location', '$routeParams', 'stavkaNarudzbeniceService', 'narudzbenicaService', 'proizvodService', function($scope, $location, $routeParams, stavkaNarudzbeniceService, narudzbenicaService, proizvodService) {
    $scope.stavkaNarudzbenice= {
       id_stavke_narudzbenice: "",
       id_fakture: "",
       id_proizvoda: "",
       kolicina: "",
       rabat: "",
       jedinicna_cena: "",
       stopa_pdv_a: "",
       osnovica: "",
       iznos_pdv_a: "",
       ukupan_iznos: ""
    };

    $scope.narudzbenice = [];
    $scope.proizvodi = [];
   
    $scope.errorMessage = "";

    stavkaNarudzbeniceService.getStavkaNarudzbenice($routeParams.id).then(function(response) {
        $scope.stavkaNarudzbenice = response.data;
    });

    narudzbenicaService.ucitajNarudzbenice().then(function(response) {
            $scope.narudzbenice = response.data;
    });

    proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.stavkaNarudzbenice.id_narudzbenice == "" || $scope.stavkaNarudzbenice.id_proizvoda == "" || $scope.stavkaNarudzbenice.kolicina == ""
            || $scope.stavkaNarudzbenice.rabat == "" || $scope.stavkaNarudzbenice.jedinicna_cena == "" || $scope.stavkaNarudzbenice.stopa_pdv_a == ""
            || $scope.stavkaNarudzbenice.osnovica == "" || $scope.stavkaNarudzbenice.iznos_pdv_a == "" || $scope.stavkaNarudzbenice.ukupan_iznos == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       stavkaNarudzbeniceService.sacuvajStavkuNarudzbenice($scope.stavkaNarudzbenice).then(function(response) {
            $location.path('/pregled_stavki_narudzbenice');
       });
    }
}]);