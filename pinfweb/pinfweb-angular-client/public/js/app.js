var app = angular.module('PINFWEB', ['ngRoute', 'PINFWEB_CONFIG', 'fakeApi']);

app.config(function ($routeProvider) {
 
    $routeProvider.when("/pregled_cenovnika", {
        controller: "PregledCenovnikaCtrl",
        templateUrl: "views/cenovnik/pregled_cenovnika.html"
    });
    
    $routeProvider.when("/novi_cenovnik", {
        controller: "KreiranjeCenovnikaCtrl",
        templateUrl: "views/cenovnik/novi_cenovnik.html"
    });

    $routeProvider.when("/izmena_cenovnika/:id", {
        controller: "IzmenaCenovnikaCtrl",
        templateUrl: "views/cenovnik/izmena_cenovnika.html"
    });

    $routeProvider.when("/pregled_preduzeca", {
        controller: "PregledPreduzecaCtrl",
        templateUrl: "views/preduzece/pregled_preduzeca.html"
    });

    $routeProvider.when("/novo_preduzece", {
        controller: "KreiranjePreduzecaCtrl",
        templateUrl: "views/preduzece/novo_preduzece.html"
    });

    $routeProvider.when("/izmena_preduzeca/:id", {
        controller: "IzmenaPreduzecaCtrl",
        templateUrl: "views/preduzece/izmena_preduzeca.html"
    });

});
