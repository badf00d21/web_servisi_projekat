app.controller('PregledStavkiFaktureCtrl', ['$scope', '$location', 'stavkaFaktureService', function($scope, $location, stavkaFaktureService) {

   $scope.stavkeFakture = [];
   var refreshData = function() {
       stavkaFaktureService.ucitajStavkeFakture().then(function(response) {
            $scope.stavkeFakture = response.data;
       });
   }

   refreshData();

   $scope.izmeniStavkuFakture = function (id) {
       $location.path('/izmena_stavke_fakture/' + id);
   }

   $scope.izbrisiStavkuFakture = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete stavku fakture: ' + id + "?")) {
            return;
       }

      stavkaFaktureService.izbrisiStavkuFakture(id).then(function(response) {
            for (var i = 0; i < $scope.stavkeFakture.length; i++) {
                if ($scope.stavkeFakture[i].id_stavke_fakture == id) {
                    $scope.stavkeFakture.splice(i, 1);
                    break;
                }
            }
       });
   }

   
}]);

app.controller('KreiranjeStavkeFaktureCtrl', ['$scope', '$location', 'stavkaFaktureService', 'fakturaService','proizvodService', function($scope, $location, stavkaFaktureService, fakturaService, proizvodService) {
    
    $scope.fakture = [];
    $scope.proizvodi = [];
    
    $scope.errorMessage = "";
   
    $scope.novaStavkaFakture = {
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
   
    fakturaService.ucitajFakture().then(function(response) {
            $scope.fakture = response.data;
    });

    proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = response.data;
    });

   $scope.kreirajStavkuFakture = function() {
       if ($scope.novaStavkaFakture.id_fakture == "" || $scope.novaStavkaFakture.id_proizvoda == "" || $scope.novaStavkaFakture.kolicina == ""
            || $scope.novaStavkaFakture.rabat == "" || $scope.novaStavkaFakture.jedinicna_cena == "" || $scope.novaStavkaFakture.stopa_pdv_a == ""
            || $scope.novaStavkaFakture.osnovica == "" || $scope.novaStavkaFakture.iznos_pdv_a == "" || $scope.novaStavkaFakture.ukupan_iznos == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       stavkaFaktureService.dodajStavkuFakture($scope.novaStavkaFakture).then(function(response) {
            $location.path('/pregled_stavki_fakture');
       });
   }
   
}]); 

app.controller('IzmenaStavkeFaktureCtrl', ['$scope', '$location', '$routeParams', 'stavkaFaktureService', 'fakturaService', 'proizvodService', function($scope, $location, $routeParams, stavkaFaktureService, fakturaService, proizvodService) {
    $scope.stavkaFakture = {
       id_stavke_fakture: "",
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

    $scope.fakture = [];
    $scope.proizvodi = [];
   
    $scope.errorMessage = "";

    stavkaFaktureService.getStavkaFakture($routeParams.id).then(function(response) {
        $scope.stavkaFakture = response.data;
    });

    fakturaService.ucitajFakture().then(function(response) {
            $scope.fakture = response.data;
    });

    proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.stavkaFakture.id_fakture == "" || $scope.stavkaFakture.id_proizvoda == "" || $scope.stavkaFakture.kolicina == ""
            || $scope.stavkaFakture.rabat == "" || $scope.stavkaFakture.jedinicna_cena == "" || $scope.stavkaFakture.stopa_pdv_a == ""
            || $scope.stavkaFakture.osnovica == "" || $scope.stavkaFakture.iznos_pdv_a == "" || $scope.stavkaFakture.ukupan_iznos == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       stavkaFaktureService.sacuvajStavkuFakture($scope.stavkaFakture).then(function(response) {
            $location.path('/pregled_stavki_fakture');
       });
    }
}]);