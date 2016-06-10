app.controller('FakturisanjeRucnoCtrl', ['$scope', '$location', 'fakturaService', 'preduzeceService', 'poslovniPartnerService', 'poslovnaGodinaService', function($scope, $location, fakturaService, preduzeceService, poslovniPartnerService, poslovnaGodinaService) {
    
    $scope.preduzeca = [];
    $scope.poslovneGodine = [];
    $scope.poslovniPartneri = [];
    $scope.stavkeFakture = [];

    $scope.errorMessage = "";
    $scope.errorMessageStavka = "";
   
    $scope.novaFaktura = {
        id_fakture : "",
        id_poslovnog_partnera : "",
        id_preduzeca : "",
        id_godine : "",
        broj_fakture : "",
        datum_fakture : "",
        datum_valute : "",
        stavke_fakture: []
    };

    $scope.novaStavkaFakture = {
       id_proizvoda: "",
       kolicina: "",
       rabat: "",
       jedinicna_cena: "",
       stopa_pdv_a: "",
       osnovica: "",
       iznos_pdv_a: "",
       ukupan_iznos: ""
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
       ||  $scope.novaFaktura.datum_valute == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           console.log($scope.novaFaktura);
           return;
       }
       
       $scope.novaFaktura.stavke_fakture = $scope.stavkeFakture;
       fakturaService.dodajFakturuRucno($scope.novaFaktura).then(function(response) {
            $location.path('/pregled_faktura');
       });
   }

   $scope.dodajStavku = function() {
       $scope.stavkeFakture.push($scope.novaStavkaFakture);
   }
   
}]); 

app.controller('FakturisanjeNarudzbenicaCtrl', ['$scope', '$location', 'fakturaService', 'preduzeceService', 'poslovniPartnerService', 'poslovnaGodinaService', function($scope, $location, fakturaService, preduzeceService, poslovniPartnerService, poslovnaGodinaService) {
   
}]); 