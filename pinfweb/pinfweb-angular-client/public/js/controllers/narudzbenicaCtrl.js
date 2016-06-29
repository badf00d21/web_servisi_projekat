app.controller('PregledNarudzbenicaCtrl', ['$scope', '$location', 'narudzbenicaService', 'fakturaService', 'ModalService', function($scope, $location, narudzbenicaService, fakturaService, ModalService) {

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
   
   $scope.kreirajFakturu = function(id) {
       var faktura = {
           id_narudzbenice: "",
           id_poslovne_godine: "",
           rabat: ""
       }
       
        ModalService.showModal({
            templateUrl: '../views/faktura/izbor_poslovne_godine_i_rabata.html',
            controller: "PoslovnaGodinaRabatModalController",
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result == "Cancel")
                    return;
                              
                faktura.id_narudzbenice = id;
                faktura.id_poslovne_godine = result.id_poslovne_godine;
                faktura.rabat = result.rabat;
                
                fakturaService.kreirajFakturuNaOsnovuNarudzbenice(faktura).then(function(response) {
                     $location.path('/pregled_faktura');
                });
            });
        });
   }

   
}]);

app.controller('KreiranjeNarudzbeniceCtrl', ['$scope', '$location', 'narudzbenicaService', 'preduzeceService', 'poslovniPartnerService', 'proizvodService','jedinicaMereService', 'grupaProizvodaService','ModalService', function($scope, $location, narudzbenicaService, preduzeceService, poslovniPartnerService, proizvodService, jedinicaMereService, grupaProizvodaService, ModalService) {
    
    $scope.preduzeca = [];
    $scope.poslovniPartneri = [];
    $scope.errorMessage = "";
    $scope.proizvodi = [];
    $scope.grupeProizvoda = [];
    $scope.jediniceMere = [];
   
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

    grupaProizvodaService.ucitajGrupeProizvoda().then(function(response) {
            $scope.grupeProizvoda = response.data;
    });

    jedinicaMereService.ucitajJediniceMere().then(function(response) {
            $scope.jediniceMere = response.data;
    });
    
    var ucitajProizvode = function() {
        proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = [];
             for (var i = 0; i < response.data.length; i++) {
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

                      for (var j = 0; j < $scope.grupeProizvoda.length; j++) {
                          if ($scope.grupeProizvoda[j].id_grupe == proizvod.id_grupe_proizvoda) {
                              proizvod.grupa_proizvoda = $scope.grupeProizvoda[j].naziv_grupe;
                              break;
                          }
                      }

                      for (var j = 0; j < $scope.jediniceMere.length; j++) {
                          if ($scope.jediniceMere[j].id_jedinice == proizvod.id_jedinice) {
                              proizvod.jedinica_mere = $scope.jediniceMere[j].skracenica;
                              break;
                          }
                      }
                      
                      $scope.proizvodi.push(proizvod);
                 }
             }       
         });
    }
    
    $scope.$watch('novaNarudzbenica.id_preduzeca', function(newVal, oldVal) {
        ucitajProizvode();
    }, true);
    
    $scope.izaberiPoslovnogPartnera = function() {
        ModalService.showModal({
            templateUrl: '../views/poslovni_partner/izbor_poslovnog_partnera.html',
            controller: "PoslovniPartnerModalController",
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
            templateUrl: '../views/preduzece/izbor_preduzeca.html',
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
       
       if ($scope.novaNarudzbenica.id_preduzeca == "") {
           $scope.errorMessage = "Morate izabrati preduzece za koje se kreira narudzbenica!";
           return;
       }
       
       if ($scope.novaNarudzbenica.id_poslovnog_partnera == "") {
           $scope.errorMessage = "Morate izabrati poslovnog partnera koji kreira narudzbenicu!";
           return;
       }
       
       var izabraniProizvodi = [];
       var kolicineValid = true;
       
       for (var i = 0; i < $scope.proizvodi.length; i++) {
           if ($scope.proizvodi[i].kolicina < 0) {
               kolicineValid = false;
               break;
           }
       }
       
       if (!kolicineValid) {
           $scope.errorMessage = "Kolicina moze biti nula ukoliko proizvod ne ulazi u narudzbenicu ili veca od nule ukoliko ulazi!";
           return;
       }
       
       for (var i = 0; i < $scope.proizvodi.length; i++) {
           if ($scope.proizvodi[i].kolicina > 0) {
               izabraniProizvodi.push($scope.proizvodi[i]);
           }
       }
       
       if (izabraniProizvodi.length == 0) {
           $scope.errorMessage = "Narudzbenica mora sadrzati bar jedan proizvod!";
           return;
       }
       
       $scope.novaNarudzbenica.proizvodi = izabraniProizvodi;
       narudzbenicaService.dodajNarudzbenicu($scope.novaNarudzbenica).then(function(response) {
            $location.path('/narudzbenica/' + response.data.id_narudzbenice);
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

app.controller('StavkeNarudzbeniceCtrl', ['$scope', '$location', '$routeParams', 'narudzbenicaService', 'preduzeceService', 'stavkaNarudzbeniceService', 'proizvodService', 'grupaProizvodaService', 'ModalService', function($scope, $location, $routeParams, narudzbenicaService, preduzeceService, stavkeNarudzbeniceServis, proizvodService, grupaProizvodaService, ModalService) {
    $scope.narudzbenica = {
        id_narudzbenice: "",
        id_preduzeca: "",
        id_poslovnog_partnera: "",
        rok_isporuke: "",
        rok_placanja: ""
    }

    $scope.preduzece = {
        id_preduzeca: "",
        nazivpreduzeca: ""
    }
    
    $scope.stavkeNarudzbenice = [];
    $scope.grupeProizvoda = [];
    $scope.proizvodi= [];
    
    $scope.errorMessage = "";

    grupaProizvodaService.ucitajGrupeProizvoda().then(function(grupe) {
        $scope.grupeProizvoda = grupe.data;

        proizvodService.ucitajProizvode().then(function(proizvodi) {
              $scope.proizvodi = proizvodi.data;

               narudzbenicaService.getNarudzbenica($routeParams.id).then(function(narudzbenica) {
       	            $scope.narudzbenica = narudzbenica.data;
        
                    preduzeceService.getPreduzece($scope.narudzbenica.id_preduzeca).then(function (preduzece) {
                         $scope.preduzece = preduzece.data;
            
                         stavkeNarudzbeniceServis.ucitajStavkeNarudzbenice().then(function(response) {
                
                            for (var i = 0; i < response.data.length; i++) {
                                 if (response.data[i].id_stavke_narudzbenice == $routeParams.id) {
                                     var stavkaNarudzbenice = {
                                         id_stavke_narudzbenice: "",
                                         id_proizvoda: "",
                                         naziv_proizvoda: "",
                                         grupa_proizvoda: "",
                                         vrsta_proizvoda: "",
                                         jedinicna_cena: "",
                                         kolicina: "",
                                         rabat: "",
                                         stopa_pdva: "",
                                         osnovica: "",
                                         iznos_pdva: "",
                                         ukupan_iznos: ""
                                      }
                        
                                    stavkaNarudzbenice.id_stavke_narudzbenice = response.data[i].id_stavke_narudzbenice;
                                    stavkaNarudzbenice.id_proizvoda = response.data[i].id_proizvoda;
                                    stavkaNarudzbenice.jedinicna_cena = response.data[i].jedinicna_cena;
                                    
                                    stavkaNarudzbenice.kolicina = response.data[i].kolicina;
                                    stavkaNarudzbenice.rabat = response.data[i].rabat;
                                    stavkaNarudzbenice.stopa_pdva = response.data[i].stopa_pdva;
                                    stavkaNarudzbenice.osnovica = response.data[i].osnovica;
                                    stavkaNarudzbenice.iznos_pdva = response.data[i].iznos_pdva;
                                    stavkaNarudzbenice.ukupan_iznos = response.data[i].ukupan_iznos;

                                    for (var j = 0; j < $scope.proizvodi.length; j++) {
                                        if ($scope.proizvodi[j].id_proizvoda == stavkaNarudzbenice.id_proizvoda) {
                                            stavkaNarudzbenice.naziv_proizvoda = $scope.proizvodi[j].naziv_proizvoda;
                                            stavkaNarudzbenice.vrsta_proizvoda = $scope.proizvodi[j].vrsta_proizvoda;
                                        }
                                    }

                                    var proizvod;
                                    for (var k = 0; k < $scope.proizvodi.length; k++) {
                                                if ($scope.proizvodi[k].id_proizvoda == stavkaNarudzbenice.id_proizvoda) {
                                                    proizvod = $scope.proizvodi[k];
                                                    break;
                                                }
                                            }

                                    for (var l = 0; l < $scope.grupeProizvoda.length; l++) {
                                        if ($scope.grupeProizvoda[l].id_grupe == proizvod.id_grupe) {
                                            
                                            stavkaNarudzbenice.grupa_proizvoda = $scope.grupeProizvoda[l].naziv_grupe;
                                            break;
                                        }
                                    }
                        
                                    $scope.stavkeNarudzbenice.push(stavkaNarudzbenice);
                    }
                }
                
            });
        });
        
    });
        });
    });

    
     $scope.kreirajFakturu = function() {
       var faktura = {
           id_narudzbenice: "",
           id_poslovne_godine: ""
       }
       
        ModalService.showModal({
            templateUrl: '../views/faktura/izbor_poslovne_godine_i_rabat.html',
            controller: "PoslovnaGodinaRabatModalController",
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result == "Cancel")
                    return;
                              
                faktura.id_narudzbenice = $scope.narudzbenica.id_narudzbenice;
                faktura.id_poslovne_godine = result.id_poslovne_godine;
                faktura.rabat = result.rabat;
                
                fakturaService.kreirajFakturuNaOsnovuNarudzbenice(faktura).then(function(response) {
                     $location.path('/pregled_faktura');
                });
            });
        });
   }
  
}]);


