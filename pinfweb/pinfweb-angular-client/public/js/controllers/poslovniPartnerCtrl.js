app.controller('PregledPoslovnihPartneraCtrl', ['$scope', '$location', 'poslovniPartnerService', function($scope, $location, poslovniPartnerService) {

   $scope.poslovniPartneri = [];

   var refreshData = function() {
       poslovniPartnerService.ucitajPoslovnePartnere().then(function(response) {
            $scope.poslovniPartneri = response.data;
       });
   }

   refreshData();

   $scope.izmeniPoslovnogPartnera = function (id) {
       $location.path('/izmena_poslovnog_partnera/' + id);
   }

   $scope.izbrisiPoslovnogPartnera = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete poslovnog partnera: ' + id + "?")) {
            return;
       }

       poslovniPartnerService.izbrisiPoslovnogPartnera(id).then(function(response) {
            for (var i = 0; i < $scope.poslovniPartneri.length; i++) {
                if ($scope.poslovniPartneri[i].id_poslovnog_partnera == id) {
                    $scope.poslovniPartneri.splice(i, 1);
                    break;
                }
            }
       });
   }
}]);

app.controller('KreiranjePoslovnogPartneraCtrl', ['$scope', '$location', 'poslovniPartnerService', 'preduzeceService', function($scope, $location, poslovniPartnerService, preduzeceService) {
    
    $scope.preduzeca = [];
    $scope.errorMessage = "";
   
    $scope.noviPoslovniPartner = {
       id_preduzeca: "",
       vrsta: "",
       pib: "",
       adresa: "",
       mesto: "",
       tekuci_racun: ""
    };
   
    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });
   
   $scope.kreirajPoslovnogPartnera = function() {
       if ($scope.noviPoslovniPartner.id_preduzeca == "" || $scope.noviPoslovniPartner.vrsta == ""
            || $scope.noviPoslovniPartner.pib == "" || $scope.noviPoslovniPartner.adresa == "" || $scope.noviPoslovniPartner.mesto == ""
                || $scope.noviPoslovniPartner.tekuci_racun == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       poslovniPartnerService.dodajPoslovnogPartnera($scope.noviPoslovniPartner).then(function(response) {
            $location.path('/pregled_poslovnih_partnera');
       });
   }
   
}]); 

app.controller('IzmenaPoslovnogPartneraCtrl', ['$scope', '$location', '$routeParams', 'poslovniPartnerService', 'preduzeceService', function($scope, $location, $routeParams, poslovniPartnerService, preduzeceService) {
    $scope.poslovniPartner = {
       id_poslovnog_partnera: "",
       id_preduzeca: "",
       vrsta: "",
       pib: "",
       adresa: "",
       mesto: "",
       tekuci_racun: ""
    }

    $scope.preduzeca = [];
    $scope.errorMessage = "";

    poslovniPartnerService.getPoslovniPartner($routeParams.id).then(function(response) {
        $scope.poslovniPartner = response.data;
    });

    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.poslovniPartner.id_preduzeca == "" || $scope.poslovniPartner.vrsta == ""
            || $scope.poslovniPartner.pib == "" || $scope.poslovniPartner.adresa == "" || $scope.poslovniPartner.mesto == ""
                || $scope.poslovniPartner.tekuci_racun == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       poslovniPartnerService.sacuvajPoslovnogPartnera($scope.poslovniPartner).then(function(response) {
            $location.path('/pregled_poslovnih_partnera');
       });
    }
}]);

app.controller('PoslovniPartnerModalController', ['$scope', 'close', 'poslovniPartnerService', 'id_preduzeca', function($scope, close, poslovniPartnerService, id_preduzeca) {
   
  $scope.poslovniPartneri = [];

   var refreshData = function() {
       poslovniPartnerService.ucitajPoslovnePartnere().then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id_preduzeca == id_preduzeca) {
                    $scope.poslovniPartneri.push(response.data[i]);
                }
            }
       });
   }

   refreshData();
   
   $scope.close = function(result) {
       close(result, 500);
   } 
}]);