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

   $scope.kopirajCenovnik = function (id) {
       $location.path('/kopiranje_cenovnika/' + id);
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

app.controller('KopiranjeCenovnikaCtrl', ['$scope', '$location', '$routeParams', 'cenovnikService', 'preduzeceService', 'stavkaCenovnikaService', function($scope, $location, $routeParams, cenovnikService, preduzeceService, stavkaCenovnikaService) {
   
    
    $scope.cenovniks = {
        id_cenovkika: "",
        id_preduzeca: "",
        datum_vazena: ""
    }

    $scope.id_cen = $routeParams.id
    $scope.preduzeca = [];
    $scope.procenat = 0;
    $scope.stavkeCenovnika = []
    $scope.errorMessage = "";

    cenovnikService.getCenovnik($routeParams.id).then(function(response) {
        $scope.cenovniks = response.data;
    });


    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });


    console.log( $scope.cenovniks);
    stavkaCenovnikaService.ucitajStavkeCenovnika().then(function(response) {
            for (var i = 0; i < response.data.length; i++){
                if ( response.data[i].id_cenovnika == $routeParams.id){
                    $scope.stavkeCenovnika.push(response.data[i]);
                }
            }
    });

    $scope.potvrdi = function() {
        if ($scope.procenat == 0 || isNaN($scope.procenat)) {
           $scope.errorMessage = "Procenat mora biti razlicit broj od nule!";
           return;
       }

       var infoObj = {
           id_cen : $scope.id_cen,
           procenat : $scope.procenat
       }
       cenovnikService.kopirajCenovnik(infoObj).then(function(response) {
            $location.path('/pregled_stavki_cenovnika');
       });
    }
}]);