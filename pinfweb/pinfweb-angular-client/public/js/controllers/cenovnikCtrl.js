app.controller('PregledCenovnikaCtrl', ['$scope', '$location', 'cenovnikService', function($scope, $location, cenovnikService) {

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
}]);

app.controller('KreiranjeCenovnikaCtrl', ['$scope', '$location', 'cenovnikService', 'preduzeceService', function($scope, $location, cenovnikService, preduzeceService) {
    
    $scope.preduzeca = [];
    $scope.errorMessage = "";
   
    $scope.noviCenovnik = {
       id_preduzeca : "",
       datum_vazena: ""  
    };
   
    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });
   
   $scope.kreirajCenovnik = function() {
       if ($scope.noviCenovnik.id_preduzeca == "" || $scope.noviCenovnik.datum_vazena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       cenovnikService.dodajCenovnik($scope.noviCenovnik).then(function(response) {
            $location.path('/pregled_cenovnika');
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

