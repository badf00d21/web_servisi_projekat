app.controller('PregledProizvodaCtrl', ['$scope', '$location', 'proizvodService', function($scope, $location, proizvodService) {

   $scope.proizvodi = [];
   var refreshData = function() {
       proizvodService.ucitajProizvode().then(function(response) {
            $scope.proizvodi = response.data;
       });
   }

   refreshData();

   $scope.izmeniProizvod = function (id) {
       $location.path('/izmena_proizvoda/' + id);
   }

   $scope.izbrisiProizvod = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete proizvod: ' + id + "?")) {
            return;
       }

      proizvodService.izbrisiProizvod(id).then(function(response) {
            for (var i = 0; i < $scope.proizvodi.length; i++) {
                if ($scope.proizvodi[i].id_proizvoda == id) {
                    $scope.proizvodi.splice(i, 1);
                    break;
                }
            }
       });
   }

   
}]);

app.controller('KreiranjeProizvodaCtrl', ['$scope', '$location', 'proizvodService', 'preduzeceService','jedinicaMereService','grupaProizvodaService', function($scope, $location, proizvodService, preduzeceService, jedinicaMereService, grupaProizvodaService) {
    
    $scope.preduzeca = [];
    $scope.grupeProizvoda = [];
    $scope.jediniceMere = [];
    $scope.errorMessage = "";
   
    $scope.noviProizvod = {
       vrsta_proizvoda : "",
       id_proizvoda: "",
       id_preduzeca: "",
       id_jedinice: "",
       id_grupe: "",
       naziv_proizvoda: "",  
    };
   
    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    jedinicaMereService.ucitajJediniceMere().then(function(response) {
            $scope.jediniceMere = response.data;
    });

    grupaProizvodaService.ucitajGrupeProizvoda().then(function(response) {
            $scope.grupeProizvoda = response.data;
    });
   
   $scope.kreirajProizvod = function() {
       if ($scope.noviProizvod.id_preduzeca == "" || $scope.noviProizvod.id_jedinice == "" || $scope.noviProizvod.id_grupe == "" || $scope.noviProizvod.naziv_proizvoda == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       proizvodService.dodajProizvod($scope.noviProizvod).then(function(response) {
            $location.path('/pregled_proizvoda');
       });
   }
   
}]); 

app.controller('IzmenaProizvodaCtrl', ['$scope', '$location', '$routeParams', 'proizvodService', 'preduzeceService','jedinicaMereService','grupaProizvodaService', function($scope, $location, $routeParams, proizvodService, preduzeceService, jedinicaMereService, grupaProizvodaService) {
    $scope.proizvod = {
        vrsta_proizvoda : "",
       id_proizvoda: "",
       id_preduzeca: "",
       id_jedinice: "",
       id_grupe: "",
       naziv_proizvoda: "",  
    }

    $scope.preduzeca = [];
    $scope.grupeProizvoda = [];
    $scope.jediniceMere = [];
    $scope.errorMessage = "";

    proizvodService.getProizvod($routeParams.id).then(function(response) {
        $scope.proizvod = response.data;
    });

    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    jedinicaMereService.ucitajJediniceMere().then(function(response) {
            $scope.jediniceMere = response.data;
    });

    grupaProizvodaService.ucitajGrupeProizvoda().then(function(response) {
            $scope.grupeProizvoda = response.data;
    });
   
    $scope.sacuvaj = function() {
        if ($scope.proizvod.id_preduzeca == "" || $scope.proizvod.id_jedinice == "" || $scope.proizvod.id_grupe == "" || $scope.proizvod.naziv_proizvoda == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       console.log($scope.proizvod);
       proizvodService.sacuvajProizvod($scope.proizvod).then(function(response) {
            $location.path('/pregled_proizvoda');
       });
    }
}]);