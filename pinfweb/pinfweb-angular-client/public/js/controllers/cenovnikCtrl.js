app.controller('PregledCenovnikaCtrl', ['$scope', '$location', 'cenovnikService','ModalService', function($scope, $location, cenovnikService, ModalService) {
   $scope.cenovnici = [];

   var refreshData = function() {
       cenovnikService.ucitajCenovnike().then(function(response) {
            $scope.cenovnici = response.data;
       });
   }

   refreshData();

   $scope.izmeniCenovnik = function (id) {
       $location.path('/izmena_cenovnika/' + id);
   }

   $scope.izbrisiCenovnik = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete cenovnik: ' + id + "?")) {
            return;
       }

       cenovnikService.izbrisiCenovnik(id).then(function(response) {
            for (var i = 0; i < $scope.cenovnici.length; i++) {
                if ($scope.cenovnici[i].id_cenovnika == id) {
                    $scope.cenovnici.splice(i, 1);
                    break;
                }
            }
       });
   }
   
   $scope.kopirajCenovnik = function(id) {
        ModalService.showModal({
            templateUrl: '../views/cenovnik/kopiranje_cenovnika.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result == "Cancel")
                    return;
                
                if (result == 0 || isNaN(result)) {
                     alert("Procenat mora biti razlicit broj od nule!");
                     return;
                }

             var infoObj = {
                id_cen : id,
                procenat : result
             }
             
            cenovnikService.kopirajCenovnik(infoObj).then(function(response) {
                    $location.path('/cenovnik/' + response.data.id_cenovnika);
             });
            });
        });
    }
}]);

app.controller('KreiranjeCenovnikaCtrl', ['$scope', '$location', 'cenovnikService', 'preduzeceService','grupaProizvodaService','jedinicaMereService', 'proizvodService','ModalService','dateValidationService', function($scope, $location, cenovnikService, preduzeceService, grupaProizvodaService, jedinicaMereService, proizvodService, ModalService, dateValidationService) {
    
    $scope.preduzeca = [];
    $scope.proizvodi = [];
    $scope.grupeProizvoda = [];
    $scope.jediniceMere = [];
    $scope.errorMessage = "";
   
    $scope.noviCenovnik = {
       id_preduzeca : "",
       datum_vazena: ""  
    };
   
    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
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
                 if (response.data[i].id_preduzeca == $scope.noviCenovnik.id_preduzeca) {
                      
                      var proizvod = {
                          id_proizvoda: "",
                          naziv_proizvoda: "",
                          id_grupe_proizvoda: "",
                          grupa_proizvoda: "",
                          vrsta_proizvoda: "",
                          id_jedinice_mere: "",
                          jedinica_mere: "",
                          rabat: "0",
                          cena: "0"
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
    
    $scope.$watch('noviCenovnik.id_preduzeca', function(newVal, oldVal) {
        ucitajProizvode();
    }, true);
    
    $scope.izaberiPreduzece = function() {
        ModalService.showModal({
            templateUrl: '../views/preduzece/izbor_preduzeca.html',
            controller: "PreduzeceModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result == "Cancel")
                    return;
                              
                $scope.noviCenovnik.id_preduzeca = result;
            });
        });
    }
   
   $scope.kreirajCenovnik = function() {
       
       $scope.errorMessage = "";
       
       if ($scope.noviCenovnik.id_preduzeca == "") {
           $scope.errorMessage = "Morate izabrati preduzece za koje se kreira cenovnik!";
           return;
       }
       
       var izabraniProizvodi = [];
       var ceneValid = true;
       
       for (var i = 0; i < $scope.proizvodi.length; i++) {
           if ($scope.proizvodi[i].cena < 0) {
               ceneValid = false;
               break;
           }
       }
       
       if (!ceneValid) {
           $scope.errorMessage = "Cena proizvoda moze biti nula ukoliko proizvod ne ulazi u cenovnik ili veca od nule ukoliko ulazi!";
           return;
       }
       
       for (var i = 0; i < $scope.proizvodi.length; i++) {
           if ($scope.proizvodi[i].cena > 0) {
               izabraniProizvodi.push($scope.proizvodi[i]);
           }
       }
       
       if (izabraniProizvodi.length == 0) {
           $scope.errorMessage = "Cenovnik mora sadrzati bar jedan proizvod!";
           return;
       }
       
       $scope.noviCenovnik.proizvodi = izabraniProizvodi;
       cenovnikService.dodajCenovnik($scope.noviCenovnik).then(function(response) {
            $location.path('/cenovnik/' + response.data.id_cenovnika);
       });
   }
   
}]); 

app.controller('IzmenaCenovnikaCtrl', ['$scope', '$location', '$routeParams', 'cenovnikService', 'preduzeceService', function($scope, $location, $routeParams, cenovnikService, preduzeceService) {
    $scope.cenovnik = {
        id_cenovkika: "",
        id_preduzeca: "",
        datum_vazena: ""
    }

    $scope.preduzeca = [];
    $scope.errorMessage = "";

    cenovnikService.getCenovnik($routeParams.id).then(function(response) {
        $scope.cenovnik = response.data;
    });

    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.cenovnik.id_preduzeca == "" || $scope.cenovnik.datum_vazena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       cenovnikService.sacuvajCenovnik($scope.cenovnik).then(function(response) {
            $location.path('/pregled_cenovnika');
       });
    }
}]);

app.controller('StavkeCenovnikaCtrl', ['$scope', '$location', '$routeParams', 'cenovnikService', 'preduzeceService', 'stavkaCenovnikaService', 'proizvodService', 'grupaProizvodaService', 'ModalService', function($scope, $location, $routeParams, cenovnikService, preduzeceService, stavkeCenovnikaServis, proizvodService, grupaProizvodaService, ModalService) {
    $scope.cenovnik = {
        id_cenovkika: "",
        id_preduzeca: "",
        datum_vazena: ""
    }

    $scope.preduzece = {
        id_preduzeca: "",
        nazivpreduzeca: ""
    }
    
    $scope.stavkeCenovnika = [];
    $scope.grupeProizvoda = [];
    $scope.proizvodi= [];
    
    $scope.errorMessage = "";

    grupaProizvodaService.ucitajGrupeProizvoda().then(function(grupe) {
        $scope.grupeProizvoda = grupe.data;

        proizvodService.ucitajProizvode().then(function(proizvodi) {
              $scope.proizvodi = proizvodi.data;

               cenovnikService.getCenovnik($routeParams.id).then(function(cenovnik) {
       	            $scope.cenovnik = cenovnik.data;
        
                    preduzeceService.getPreduzece($scope.cenovnik.id_preduzeca).then(function (preduzece) {
                         $scope.preduzece = preduzece.data;
            
                         stavkeCenovnikaServis.ucitajStavkeCenovnika().then(function(response) {
                
                            for (var i = 0; i < response.data.length; i++) {
                                 if (response.data[i].id_cenovnika == $routeParams.id) {
                                     var stavkaCenovnika = {
                                         id_stavke_proizvoda: "",
                                         id_proizvoda: "",
                                         naziv_proizvoda: "",
                                         grupa_proizvoda: "",
                                         vrsta_proizvoda: "",
                                         cena: ""
                                      }
                        
                                    stavkaCenovnika.id_stavke_cenovnika = response.data[i].id_stavke_cenovnika;
                                    stavkaCenovnika.id_proizvoda = response.data[i].id_proizvoda;
                                    stavkaCenovnika.cena = response.data[i].cena;

                                    for (var j = 0; j < $scope.proizvodi.length; j++) {
                                        if ($scope.proizvodi[j].id_proizvoda == stavkaCenovnika.id_proizvoda) {
                                            stavkaCenovnika.naziv_proizvoda = $scope.proizvodi[j].naziv_proizvoda;
                                            stavkaCenovnika.vrsta_proizvoda = $scope.proizvodi[j].vrsta_proizvoda;
                                        }
                                    }

                                    var proizvod;
                                    for (var k = 0; k < $scope.proizvodi.length; k++) {
                                                if ($scope.proizvodi[k].id_proizvoda == stavkaCenovnika.id_proizvoda) {
                                                    proizvod = $scope.proizvodi[k];
                                                    break;
                                                }
                                            }

                                    for (var l = 0; l < $scope.grupeProizvoda.length; l++) {
                                        if ($scope.grupeProizvoda[l].id_grupe == proizvod.id_grupe) {
                                            
                                            stavkaCenovnika.grupa_proizvoda = $scope.grupeProizvoda[l].naziv_grupe;
                                            break;
                                        }
                                    }
                        
                                    $scope.stavkeCenovnika.push(stavkaCenovnika);
                    }
                }
                
            });
        });
        
    });
        });
    });

    


    
    
    $scope.kopirajCenovnik = function() {
        ModalService.showModal({
            templateUrl: '../views/cenovnik/kopiranje_cenovnika.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if (result == "Cancel")
                    return;
                
                if (result == 0 || isNaN(result)) {
                     alert("Procenat mora biti razlicit broj od nule!");
                     return;
                }

             var infoObj = {
                id_cen : $scope.cenovnik.id_cenovnika,
                procenat : result
             }
             
            cenovnikService.kopirajCenovnik(infoObj).then(function(response) {
                    console.log(response.data);
                    //redirect cenovnik/id
             });
            });
        });
    }
  
}]);

