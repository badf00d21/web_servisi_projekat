app.controller('PregledFakturaCtrl', ['$scope', '$location', 'fakturaService', function($scope, $location, fakturaService) {

   $scope.fakture = [];
   console.log('biloo sta');
   var refreshData = function() {
       fakturaService.ucitajFakture().then(function(response) {
            $scope.fakture = response.data;
       });
   }

   refreshData();

   $scope.izmeniFakturu = function (id) {
       $location.path('/izmena_fakture/' + id);
   }

   $scope.izbrisiFakturu = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete cenovnik: ' + id + "?")) {
            return;
       }

       fakturaService.izbrisiFakturu(id).then(function(response) {
            for (var i = 0; i < $scope.fakture.length; i++) {
                if ($scope.fakture[i].id_fakture == id) {
                    $scope.fakture.splice(i, 1);
                    break;
                }
            }
       });
   }

   
}]);

app.controller('KreiranjeFaktureCtrl', ['$scope', '$location', 'fakturaService', 'preduzeceService', 'poslovniPartnerService', 'poslovnaGodinaService', function($scope, $location, fakturaService, preduzeceService, poslovniPartnerService, poslovnaGodinaService) {
    
    $scope.preduzeca = [];
    $scope.poslovneGodine = [];
    $scope.poslovniPartneri = [];
    $scope.errorMessage = "";
   
    $scope.novaFaktura = {
        id_fakture : "",
        id_poslovnog_partnera : "",
        id_preduzeca : "",
        id_godine : "",
        broj_fakture : "",
        datum_fakture : "",
        datum_valute : "",
        ukupan_rabat : "",
        ukupan_iznos_bez_pdv_a : "",
        ukupan_pdv : "",
        ukupno_za_placanje : "",
        status_fakture : ""

    };
   
    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    poslovnaGodinaService.ucitajPoslovneGodine().then(function(response) {
            $scope.poslovneGodine = response.data;
    });

    poslovniPartnerService.ucitajPoslovnePartnere().then(function(response) {
            $scope.poslovniPartneri = response.data;
    });
   
   $scope.kreirajFakturu = function() {
       if ($scope.novaFaktura.id_preduzeca == "" || $scope.novaFaktura.id_poslovnog_partnera == "" || $scope.novaFaktura.id_godine == "" ||  $scope.novaFaktura.broj_fakture == "" ||  $scope.novaFaktura.datum_fakture == ""
       ||  $scope.novaFaktura.datum_valute == "" ||  $scope.novaFaktura.ukupan_rabat == "" ||  $scope.novaFaktura.ukupan_iznos_bez_pdv_a == "" ||  $scope.novaFaktura.ukupan_pdv == "" ||  $scope.novaFaktura.ukupno_za_placanje == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           console.log($scope.novaFaktura);
           return;
       }
       
       fakturaService.dodajFakturu($scope.novaFaktura).then(function(response) {
            $location.path('/pregled_faktura');
       });
   }
   
}]); 

app.controller('IzmenaFaktureCtrl', ['$scope', '$location', '$routeParams', 'fakturaService', 'preduzeceService',  'poslovniPartnerService','poslovnaGodinaService', function($scope, $location, $routeParams, fakturaService, preduzeceService,poslovniPartnerService, poslovnaGodinaService) {
    $scope.faktura = {
        id_fakture : "",
        id_poslovnog_partnera : "",
        id_preduzeca : "",
        id_godine : "",
        broj_fakture : "",
        datum_fakture : "",
        datum_valute : "",
        ukupan_rabat : "",
        ukupan_iznos_bez_pdv_a : "",
        ukupan_pdv : "",
        ukupno_za_placanje : "",
        status_fakture : "",
    }

    $scope.preduzeca = [];
    $scope.poslovneGodine = [];
    $scope.poslovniPartneri = [];
    $scope.errorMessage = "";

    fakturaService.getFaktura($routeParams.id).then(function(response) {
        $scope.faktura = response.data;
    });

    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    poslovnaGodinaService.ucitajPoslovneGodine().then(function(response) {
            $scope.poslovneGodine = response.data;
    });

    poslovniPartnerService.ucitajPoslovnePartnere().then(function(response) {
            $scope.poslovniPartneri = response.data;
    });

    $scope.sacuvaj = function() {
         if ($scope.faktura.id_preduzeca == "" || $scope.faktura.id_poslovnog_partnera == "" || $scope.faktura.id_godine == "" ||  $scope.faktura.broj_fakture == "" ||  $scope.faktura.datum_fakture == ""
       ||  $scope.faktura.datum_valute == "" ||  $scope.faktura.ukupan_rabat == "" ||  $scope.faktura.ukupan_iznos_bez_pdv_a == "" ||  $scope.faktura.ukupan_pdv == "" ||  $scope.faktura.ukupno_za_placanje == "") {
           
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           console.log($scope.faktura);
           return;
       }

       fakturaService.sacuvajFakturu($scope.faktura).then(function(response) {
            $location.path('/pregled_faktura');
       });
    }
}]);

app.controller('EksportFaktureCtrl', ['$scope', '$location', 'fakturaService', function($scope, $location, fakturaService) {

   $scope.fakture = [];
   console.log('biloo sta');
   var refreshData = function() {
       fakturaService.ucitajFakture().then(function(response) {
            $scope.fakture = response.data;
       });
   }

   refreshData();

   $scope.eksportFaktureXml = function (id) {
       $location.path('/izmena_fakture/' + id);
   }

   $scope.eksportFakturePdf = function (id) {
           
   }

   
}]);