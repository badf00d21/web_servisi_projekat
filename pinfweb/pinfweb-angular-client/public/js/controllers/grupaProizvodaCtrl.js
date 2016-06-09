app.controller('PregledGrupaProizvodaCtrl', ['$scope', '$location', 'grupaProizvodaService', function($scope, $location, grupaProizvodaService) {

   $scope.grupeProizvoda = [];

   var refreshData = function() {
       grupaProizvodaService.ucitajGrupeProizvoda().then(function(response) {
            $scope.grupeProizvoda = response.data;
       });
   }

   refreshData();

   $scope.izmeniGrupuProizvoda = function (id) {
       $location.path('/izmena_grupe_proizvoda/' + id);
   }

   $scope.izbrisiGrupuProizvoda = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete grupu proizvoda: ' + id + "?")) {
            return;
       }

       grupaProizvodaService.izbrisiGrupuProizvoda(id).then(function(response) {
            for (var i = 0; i < $scope.grupeProizvoda.length; i++) {
                if ($scope.grupeProizvoda[i].id_grupe == id) {
                    $scope.grupeProizvoda.splice(i, 1);
                    break;
                }
            }
       });
   }
}]);

app.controller('KreiranjeGrupeProizvodaCtrl', ['$scope', '$location', 'grupaProizvodaService', 'pdvService', function($scope, $location, grupaProizvodaService, pdvService) {
    
    $scope.pdvovi = [];
    $scope.errorMessage = "";
   
    $scope.novaGrupaProizvoda = {
       id_pdv_a : "",
       naziv_grupe: ""  
    };
   
    pdvService.ucitajPdvove().then(function(response) {
            $scope.pdvovi = response.data;
    });
   
   $scope.kreirajGrupuProizvoda = function() {
       if ($scope.novaGrupaProizvoda.id_pdv_a == "" || $scope.novaGrupaProizvoda.naziv_grupe == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       grupaProizvodaService.dodajGrupuProizvoda($scope.novaGrupaProizvoda).then(function(response) {
            $location.path('/pregled_grupa_proizvoda');
       });
   }
   
}]); 

app.controller('IzmenaGrupeProizvodaCtrl', ['$scope', '$location', '$routeParams', 'grupaProizvodaService', 'pdvService', function($scope, $location, $routeParams, grupaProizvodaService, pdvService) {
    $scope.grupaProizvoda = {
        id_grupe: "",
        id_pdv_a: "",
        naziv_grupe: ""
    }

    $scope.pdvovi = [];
    $scope.errorMessage = "";

    grupaProizvodaService.getGrupaProizvoda($routeParams.id).then(function(response) {
        $scope.grupaProizvoda = response.data;
    });

    pdvService.ucitajPdvove().then(function(response) {
            $scope.pdvovi = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.grupaProizvoda.id_pdv_a == "" || $scope.grupaProizvoda.naziv_grupe == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       grupaProizvodaService.sacuvajGrupuProizvoda($scope.grupaProizvoda).then(function(response) {
            $location.path('/pregled_grupa_proizvoda');
       });
    }
}]);