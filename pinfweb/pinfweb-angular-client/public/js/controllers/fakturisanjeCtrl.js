app.controller('FakturisanjeRucnoCtrl', ['$scope', '$location', 'fakturaService', 'preduzeceService', 'poslovniPartnerService', 'poslovnaGodinaService', function($scope, $location, fakturaService, preduzeceService, poslovniPartnerService, poslovnaGodinaService) {
    
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

app.controller('FakturisanjeNarudzbenicaCtrl', ['$scope', '$location', 'fakturaService', 'preduzeceService', 'poslovniPartnerService', 'poslovnaGodinaService', function($scope, $location, fakturaService, preduzeceService, poslovniPartnerService, poslovnaGodinaService) {
    
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