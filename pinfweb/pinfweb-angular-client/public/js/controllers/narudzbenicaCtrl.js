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

app.controller('KreiranjeNarudzbeniceCtrl', ['$scope', '$location', 'narudzbenicaService', 'preduzeceService', 'poslovniPartnerService', 'proizvodService','jedinicaMereService', 'grupaProizvodaService','ModalService', function($scope, $location, narudzbenicaService, preduzeceService, poslovniPartnerService, proizvodService, jedinicaMereService, grupaProizvodaService, ModalService) {
    
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
    
    var ucitajProizvode = function() {
        proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = [];
             for (var i = 0; i < response.data; i++) {
                 if (response.data[i].id_preduzeca == $scope.novaNarudzbenica.id_preduzeca) {
                      var proizvod = {
                          id_proizvoda: "",
                          naziv_proizvoda: "",
                          id_grupe_proizvoda: "",
                          grupa_proizvoda: "",
                          vrsta_proizvoda: "",
                          id_jedinice_mere: "",
                          jedinica_mere: "",
                          kolicina: "0"
                      }
                     
                      proizvod.id_proizvoda = response.data[i].id_proizvoda;
                      proizvod.naziv_proizvoda = response.data[i].naziv_proizvoda;
                      proizvod.id_grupe_proizvoda = response.data[i].id_grupe;
                      proizvod.id_jedinice = response.data[i].id_jedinice;
                      proizvod.vrsta_proizvoda = response.data[i].vrsta_proizvoda;
                      
                      grupaProizvodaService.getGrupaProizvoda(proizvod.id_grupe_proizvoda).then(function(grupa) {
                         proizvod.grupa_proizvoda = grupa.data.naziv_grupe; 
                      });
                      
                      jedinicaMereService.getJedinicaMere(proizvod.id_jedinice_mere).then(function(jedinica) {
                         proizvod.jedinica_mere = grupa.data.skracenica; 
                      });
                 }
             }       
         });
    }
    
    $scope.$watch('novaNarudzbenica.id_preduzeca', function(newVal, oldVal) {
        ucitajProizvode();
    }, true);
    
    $scope.izaberiPoslovnogPartnera = function(idPreduzeca) {
        ModalService.showModal({
            templateUrl: '../views/narudzbenica/izbor_poslovnog_partnera.html',
            controller: "PoslovniPartnerModalController",
            inputs: {
                id_preduzeca: idPreduzeca
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result == "Cancel")
                    return;
                              
                $scope.novaNarudzbenica.id_poslovnog_partnera = result;
            });
        });
    }
    
    $scope.izaberiPreduzece = function() {
        ModalService.showModal({
            templateUrl: '../views/narudzbenica/izbor_preduzeca.html',
            controller: "PreduzeceModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result == "Cancel")
                    return;
                              
                $scope.novaNarudzbenica.id_preduzeca = result;
            });
        });
    }
   
   $scope.kreirajNarudzbenicu = function() {
       if ($scope.novaNarudzbenica.id_preduzeca == "" || $scope.novaNarudzbenica.id_poslovnog_partnera == "" || $scope.novaNarudzbenica.rok_isporuke == "" ||  $scope.novaNarudzbenica.rok_placanja == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       $scope.novaNarudzbenica.proizvodi = $scope.proizvodi;
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

