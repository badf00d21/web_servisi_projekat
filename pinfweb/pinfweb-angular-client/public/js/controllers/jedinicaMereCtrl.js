app.controller('PregledJedinicaMereCtrl', ['$scope', '$location', 'jedinicaMereService', function($scope, $location, jedinicaMereService) {

   $scope.jediniceMere = [];

   var refreshData = function() {
       jedinicaMereService.ucitajJediniceMere().then(function(response) {
            $scope.jediniceMere = response.data;
       });
   }

   refreshData();

   $scope.izmeniJedinicuMere = function (id) {
       $location.path('/izmena_jedinice_mere/' + id);
   }

   $scope.izbrisiJedinicuMere = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete jedinicu mere: ' + id + "?")) {
            return;
       }

       jedinicaMereService.izbrisiJedinicuMere(id).then(function(response) {
            for (var i = 0; i < $scope.jediniceMere.length; i++) {
                if ($scope.jediniceMere[i].id_jedinice == id) {
                    $scope.jediniceMere.splice(i, 1);
                    break;
                }
            }
       });
   }
}]);

app.controller('KreiranjeJediniceMereCtrl', ['$scope', '$location','jedinicaMereService', function($scope, $location, jedinicaMereService) {
    
    $scope.errorMessage = "";
   
    $scope.novaJedinicaMere = {
        naziv_jedinice_mere: "",
        skracenica: ""
    };
   
   $scope.kreirajJedinicuMere = function() {
       if ($scope.novaJedinicaMere.naziv_jedinice_mere == "" || $scope.novaJedinicaMere.skracenica == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       jedinicaMereService.dodajJedinicuMere($scope.novaJedinicaMere).then(function(response) {
            $location.path('/pregled_jedinica_mere');
       });
   }
   
}]); 

app.controller('IzmenaJediniceMereCtrl', ['$scope', '$location', '$routeParams', 'jedinicaMereService', function($scope, $location, $routeParams, jedinicaMereService) {
    $scope.jedinicaMere = {
        id_jedinice: "",
        naziv_jedinice_mere: "",
        skracenica: ""
    }

    $scope.errorMessage = "";

    jedinicaMereService.getJedinicaMere($routeParams.id).then(function(response) {
        $scope.jedinicaMere = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.jedinicaMere.naziv_jedinice_mere == "" || $scope.jedinicaMere.skracenica == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }

       jedinicaMereService.sacuvajJedinicuMere($scope.jedinicaMere).then(function(response) {
            $location.path('/pregled_jedinica_mere');
       });
    }
}]);