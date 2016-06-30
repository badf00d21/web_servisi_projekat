app.controller('PregledFakturaCtrl', ['$scope', '$location', 'fakturaService', '$window', function($scope, $location, fakturaService, $window) {

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

   $scope.eksportFaktureXml = function(id) {
       fakturaService.eksportXml(id).then(function(response) {
           $window.open('http://localhost:8084/faktura/xmlexport/' + id);
       });
   }

   
}]);

app.controller('KreiranjeFaktureCtrl', ['$scope', '$location', 'fakturaService', 'preduzeceService', 'poslovniPartnerService', 'poslovnaGodinaService', 'grupaProizvodaService', 'jedinicaMereService','proizvodService', 'ModalService', function($scope, $location, fakturaService, preduzeceService, poslovniPartnerService, poslovnaGodinaService, grupaProizvodaService, jedinicaMereService, proizvodService, ModalService) {
    
    $scope.preduzeca = [];
    $scope.poslovneGodine = [];
    $scope.poslovniPartneri = [];
    $scope.grupeProizvoda = [];
    $scope.jediniceMere = [];
    $scope.errorMessage = "";
   
    $scope.novaFaktura = {
        id_poslovnog_partnera : "",
        id_preduzeca : "",
        id_godine : "",
        broj_fakture : "",
        rabat: "",
        datum_fakture : "",
        datum_valute : ""
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
                 if (response.data[i].id_preduzeca == $scope.novaFaktura.id_preduzeca) {
                      
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
    
    $scope.$watch('novaFaktura.id_preduzeca', function(newVal, oldVal) {
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
                              
                $scope.novaFaktura.id_poslovnog_partnera = result;
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
                              
                $scope.novaFaktura.id_preduzeca = result;
            });
        });
    }
    
    $scope.izaberiPoslovnuGodinu = function(idPreduzeca) {
        ModalService.showModal({
            templateUrl: '../views/poslovna_godina/izbor_poslovne_godine.html',
            controller: "PoslovnaGodinaModalController",
            inputs: {
                id_preduzeca: idPreduzeca
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result == "Cancel")
                    return;
                              
                $scope.novaFaktura.id_godine = result;
            });
        });
    }
   
   $scope.kreirajFakturu = function() {
      
      if ($scope.novaFaktura.id_preduzeca == "") {
           $scope.errorMessage = "Morate izabrati preduzece za koje se kreira faktura!";
           return;
       }

       if ($scope.novaFaktura.id_poslovnog_partnera == "") {
           $scope.errorMessage = "Morate izabrati poslovnog partnera za kog se izdaje faktura!";
           return;
       }

       if ($scope.novaFaktura.id_godine == "") {
           $scope.errorMessage = "Morate izabrati poslovnu godinu za koju se kreira faktura!";
           return;
       }

       if (!(+$scope.novaFaktura.broj_fakture === parseInt($scope.novaFaktura.broj_fakture, 10))) {
           $scope.errorMessage = "Broj fakture mora biti ceo broj";
           return;
       }

       var izabraniProizvodi = [];
       var kolicineValid = true;
       var rabatValid = true;
       
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

       $scope.novaFaktura.proizvodi = izabraniProizvodi;
       console.log($scope.novaFaktura);
       fakturaService.dodajFakturu($scope.novaFaktura).then(function(response) {
            $location.path('/faktura/' + response.data.id_fakutre);
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
       fakturaService.eksportXml(id).then(function(response) {
           console.log(response.status);
       });
   }

   $scope.eksportFakturePdf = function (id) {
        fakturaService.eksportPdf(id).then(function(response) {
           console.log(response.status);
       });    
   }

   
}]);

app.controller('PretragaFaktureCtrl', ['$scope', '$location', 'fakturaService', function($scope, $location, fakturaService) {

   $scope.fakture = [];
   $scope.pocetniDatum = "";
   $scope.krajnjiDatum = "";
   console.log('biloo sta');

   


   $scope.pretrazi = function () {
       var datumi = {
           pocetniDatum : $scope.pocetniDatum,
           krajnjiDatum: $scope.krajnjiDatum
       }

       fakturaService.pretraziFakture(datumi).then(function(response) {
           $scope.fakture = response.data;
       });
       console.log( $scope.fakture);
   }
  
   

   
}]);


app.controller('StavkeFaktureCtrl', ['$scope', '$location', '$routeParams', 'fakturaService', 'preduzeceService', 'stavkaFaktureService', 'proizvodService', 'grupaProizvodaService', 'ModalService', function($scope, $location, $routeParams, fakturaService, preduzeceService, stavkeFaktureServis, proizvodService, grupaProizvodaService, ModalService) {
    $scope.faktura = {
        id_fakture: "",
        id_preduzeca: "",
        id_poslovnog_partnera: "",
        rok_isporuke: "",
        rok_placanja: "",
        status: ""
    }

    $scope.preduzece = {
        id_preduzeca: "",
        nazivpreduzeca: ""
    }
    
    $scope.stavkeFakture = [];
    $scope.grupeProizvoda = [];
    $scope.proizvodi= [];
    
    $scope.errorMessage = "";

    grupaProizvodaService.ucitajGrupeProizvoda().then(function(grupe) {
        $scope.grupeProizvoda = grupe.data;

        proizvodService.ucitajProizvode().then(function(proizvodi) {
              $scope.proizvodi = proizvodi.data;

               fakturaService.getFaktura($routeParams.id).then(function(faktura) {
       	            $scope.faktura = faktura.data;
        
                    preduzeceService.getPreduzece($scope.faktura.id_preduzeca).then(function (preduzece) {
                         $scope.preduzece = preduzece.data;
                         $scope.faktura.preduzece = preduzece.data.nazivpreduzeca;
            
                         stavkeFaktureServis.ucitajStavkeFakture().then(function(response) {
                
                            for (var i = 0; i < response.data.length; i++) {
                                 if (response.data[i].id_fakture == $routeParams.id) {
                                     var stavkaFakture = {
                                         id_stavke_fakture: "",
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
                        
                                    stavkaFakture.id_stavke_fakture = response.data[i].id_stavke_fakture;
                                    stavkaFakture.id_proizvoda = response.data[i].id_proizvoda;
                                    stavkaFakture.jedinicna_cena = response.data[i].jedinicna_cena;
                                    
                                    stavkaFakture.kolicina = response.data[i].kolicina;
                                    stavkaFakture.rabat = response.data[i].rabat;
                                    stavkaFakture.stopa_pdva = response.data[i].stopa_pdv_a;
                                    stavkaFakture.osnovica = response.data[i].osnovica;
                                    stavkaFakture.iznos_pdva = response.data[i].iznos_pdv_a;
                                    stavkaFakture.ukupan_iznos = response.data[i].ukupan_iznos;

                                    for (var j = 0; j < $scope.proizvodi.length; j++) {
                                        if ($scope.proizvodi[j].id_proizvoda == stavkaFakture.id_proizvoda) {
                                            stavkaFakture.naziv_proizvoda = $scope.proizvodi[j].naziv_proizvoda;
                                            stavkaFakture.vrsta_proizvoda = $scope.proizvodi[j].vrsta_proizvoda;
                                        }
                                    }

                                    var proizvod;
                                    for (var k = 0; k < $scope.proizvodi.length; k++) {
                                                if ($scope.proizvodi[k].id_proizvoda == stavkaFakture.id_proizvoda) {
                                                    proizvod = $scope.proizvodi[k];
                                                    break;
                                                }
                                            }

                                    for (var l = 0; l < $scope.grupeProizvoda.length; l++) {
                                        if ($scope.grupeProizvoda[l].id_grupe == proizvod.id_grupe) {
                                            
                                            stavkaFakture.grupa_proizvoda = $scope.grupeProizvoda[l].naziv_grupe;
                                            break;
                                        }
                                    }
                        
                                    $scope.stavkeFakture.push(stavkaFakture);
                    }
                }
                
            });
        });
        
    });
        });
    });

    $scope.posaljiFakturu = function() {
            fakturaService.posaljiFakturu($scope.faktura.id_fakture).then(function(success) {
                $location.path("/pregled_faktura");
            });
    }

    $scope.stornirajFakturu = function() {
            fakturaService.stornirajFakturu($scope.faktura.id_fakture).then(function(success) {
                $location.path("/pregled_faktura");
            });
    }
}]);

