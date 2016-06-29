app.controller('PregledPoslovnihGodinaCtrl', ['$scope', '$location', 'poslovnaGodinaService', function($scope, $location, poslovnaGodinaService) {

   $scope.poslovneGodine = [];

   var refreshData = function() {
       poslovnaGodinaService.ucitajPoslovneGodine().then(function(response) {
            $scope.poslovneGodine = response.data;
       });
   }

   refreshData();

   $scope.izmeniPoslovnuGodinu = function (id) {
       $location.path('/izmena_poslovne_godine/' + id);
   }

   $scope.izbrisiPoslovnuGodinu = function (id) {
       if (!confirm('Da li ste sigurni da zelite da izbrisete poslovnu godinu: ' + id + "?")) {
            return;
       }

       poslovnaGodinaService.izbrisiPoslovnuGodinu(id).then(function(response) {
            for (var i = 0; i < $scope.poslovneGodine.length; i++) {
                if ($scope.poslovneGodine[i].id_godine == id) {
                    $scope.poslovneGodine.splice(i, 1);
                    break;
                }
            }
       });
   }

   
   
}]);

app.controller('KreiranjePoslovneGodineCtrl', ['$scope', '$location', 'poslovnaGodinaService', 'preduzeceService', function($scope, $location, poslovnaGodinaService, preduzeceService) {
    
    $scope.preduzeca = [];
    $scope.errorMessage = "";
   
    $scope.novaPoslovnaGodina = {
       id_preduzeca : "",
       godina: "",
       zakljucena: ""  
    };
   
    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });
   $scope.kreirajPoslovnuGodinu = function() {
       if ($scope.novaPoslovnaGodina.id_preduzeca == "" || $scope.novaPoslovnaGodina.godina == "" || $scope.novaPoslovnaGodina.zakljucena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
       
       poslovnaGodinaService.dodajPoslovnuGodinu($scope.novaPoslovnaGodina).then(function(response) {
            $location.path('/pregled_poslovnih_godina');
       });
   }
   
}]); 

app.controller('IzmenaPoslovneGodineCtrl', ['$scope', '$location', '$routeParams', 'poslovnaGodinaService', 'preduzeceService', function($scope, $location, $routeParams, poslovnaGodinaService, preduzeceService) {
    $scope.poslovnaGodina = {
        id_godine: "",
        id_preduzeca: "",
        godina: "",
        zakljucena: ""
    }

    $scope.preduzeca = [];
    $scope.errorMessage = "";

    poslovnaGodinaService.getPoslovnuGodinu($routeParams.id).then(function(response) {
        $scope.poslovnaGodina = response.data;
    });

    

    preduzeceService.ucitajPreduzeca().then(function(response) {
            $scope.preduzeca = response.data;
    });

    $scope.sacuvaj = function() {
        if ($scope.poslovnaGodina.id_preduzeca == "" || $scope.poslovnaGodina.godina == "" || $scope.poslovnaGodina.zakljucena == "") {
           $scope.errorMessage = "Sva polja moraju biti popunjena!";
           return;
       }
    
       poslovnaGodinaService.sacuvajPoslovnuGodinu($scope.poslovnaGodina).then(function(response) {
            $location.path('/pregled_poslovnih_godina');
       });
    }
}]);

app.controller('PoslovnaGodinaModalController', ['$scope', 'close', 'poslovnaGodinaService', 'id_preduzeca', function($scope, close, poslovnaGodinaService, id_preduzeca) {
   
  $scope.poslovneGodine = [];

   var refreshData = function() {
       poslovnaGodinaService.ucitajPoslovneGodine().then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id_preduzeca == id_preduzeca) {
                    $scope.poslovneGodine.push(response.data[i]);
                }
            }
       });
   }

   refreshData();
   
   $scope.close = function(result) {
       close(result, 500);
   } 
}]);