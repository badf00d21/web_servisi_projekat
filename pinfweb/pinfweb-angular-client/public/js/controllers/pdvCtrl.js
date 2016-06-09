app.controller('PregledPdvovaCtrl', ['$scope', '$location', 'pdvService', function($scope, $location, pdvService) {

   $scope.pdvovi = [];

   var refreshData = function() {
       pdvService.ucitajPdvove().then(function(response) {
            $scope.pdvovi = response.data;
       });
   }

   refreshData();

   $scope.izmeniPdv = function (id) {
       $location.path('/izmena_pdva/' + id);
   }

   $scope.izbrisiPdv = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete pdv: ' + id + "?")) {
            return;
       }

       pdvService.izbrisiPdv(id).then(function(response) {
            for (var i = 0; i < $scope.pdvovi.length; i++) {
                if ($scope.pdvovi[i].id_pdv_a == id) {
                    $scope.pdvovi.splice(i, 1);
                    break;
                }
            }
       });
   }
}]);

app.controller('KreiranjePdvaCtrl', ['$scope', '$location','pdvService', function($scope, $location, pdvService) {
    
    $scope.errorMessage = "";
   
    $scope.noviPdv = {
        naziv_pdv_a: ""
    };
   
   $scope.kreirajPdv = function() {
       if ($scope.noviPdv.naziv_pdv_a == "") {
           $scope.errorMessage = "Niste uneli naziv pdv-a!";
           return;
       }
       
       pdvService.dodajPdv($scope.noviPdv).then(function(response) {
            $location.path('/pregled_pdvova');
       });
   }
   
}]); 

app.controller('IzmenaPdvaCtrl', ['$scope', '$location', '$routeParams', 'pdvService', function($scope, $location, $routeParams, pdvService) {
    $scope.pdv = {
        id_pdv_a: "",
        naziv_pdv_a: ""
    }

    $scope.errorMessage = "";

    pdvService.getPdv($routeParams.id).then(function(response) {
        $scope.pdv = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.pdv.naziv_pdv_a == "") {
           $scope.errorMessage = "Niste uneli naziv pdv-a!";
           return;
       }

       pdvService.sacuvajPdv($scope.pdv).then(function(response) {
            $location.path('/pregled_pdvova');
       });
    }
}]);