app.controller('PregledNarudzbenicaCtrl', ['$scope', '$location', 'narudzbenicaService', function($scope, $location, narudzbenicaService) {

   $scope.narudzbenice = [];

   var refreshData = function() {
       narudzbenicaService.ucitajNarudzbenice().then(function(response) {
            $scope.narudzbenice = response.data;
       });
   }

   refreshData();

   $scope.izmeniNarudzbenicu = function (id) {
       $location.path('/izmena_narudzbenice/' + id);
   }

   $scope.izbrisiNarudzbenicu = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete narudzbenicu: ' + id + "?")) {
            return;
       }

       narudzbenicaService.izbrisiNarudzbenicu(id).then(function(response) {
            for (var i = 0; i < $scope.narudzbenice.length; i++) {
                if ($scope.narudzbenice[i].id_narudzbenice == id) {
                    $scope.narudzbenice.splice(i, 1);
                    break;
                }
            }
       });
   }

   
}]);

app.controller('KreiranjeNarudzbeniceCtrl', ['$scope', '$location', 'narudzbenicaService', 'preduzeceService', 'poslovniPartnerService', 'proizvodService', function($scope, $location, narudzbenicaService, preduzeceService, poslovniPartnerService, proizvodService) {
    
    $scope.preduzeca = [];
    $scope.poslovniPartneri = [];
    $scope.errorMessage = "";
    $scope.proizvodi = [];
   
    $scope.novaNarudzbenica = {
        id_poslovnog_partnera : "",
        id_preduzeca : "",
        rok_isporuke: "",
        rok_placanja: ""
    };
   
    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    poslovniPartnerService.ucitajPoslovnePartnere().then(function(response) {
            $scope.poslovniPartneri = response.data;
    });
   
   $scope.kreirajNarudzbenicu = function() {
       if ($scope.novaNarudzbenica.id_preduzeca == "" || $scope.novaNarudzbenica.id_poslovnog_partnera == "" || $scope.novaNarudzbenica.rok_isporuke == "" ||  $scope.novaNarudzbenica.rok_placanja == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       narudzbenicaService.dodajNarudzbenicu($scope.novaNarudzbenica).then(function(response) {
            $location.path('/pregled_narudzbenica');
       });
   }
   
}]); 

app.controller('IzmenaNarudzbeniceCtrl', ['$scope', '$location', '$routeParams', 'narudzbenicaService', 'preduzeceService',  'poslovniPartnerService', function($scope, $location, $routeParams, fakturaService, preduzeceService, poslovniPartnerService) {
    $scope.narudzbenica = {
        id_narudzbenice : "",
        id_poslovnog_partnera : "",
        id_preduzeca : "",
        rok_isporuke: "",
        rok_placanja: ""
    }

    $scope.preduzeca = [];
    $scope.poslovniPartneri = [];
    $scope.errorMessage = "";

    narudzbenicaService.getNarudzbenica($routeParams.id).then(function(response) {
        $scope.narudzbenica = response.data;
    });

    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    poslovniPartnerService.ucitajPoslovnePartnere().then(function(response) {
            $scope.poslovniPartneri = response.data;
    });

    $scope.sacuvaj = function() {
         if ($scope.novaNarudzbenica.id_preduzeca == "" || $scope.novaNarudzbenica.id_poslovnog_partnera == "" || $scope.novaNarudzbenica.rok_isporuke == "" ||  $scope.novaNarudzbenica.rok_placanja == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       narudzbenicaService.sacuvajNarudzbenicu($scope.narudzbenica).then(function(response) {
            $location.path('/pregled_narudzbenica');
       });
    }
}]);

