var app = angular.module('PINFWEB', ['ngRoute']);

app.config(function ($routeProvider) {
 
    $routeProvider.when("/cenovnici", {
        controller: "PregledCenovnikaCtrl",
        templateUrl: "../views/cenovnici.html"
    });
    
    $routeProvider.when("/novi_cenovnik", {
        controller: "KreiranjeCenovnikaCtrl",
        templateUrl: "../views/novi_cenovnik.html"
    });

    $routeProvider.otherwise({ redirectTo: "/" });
});