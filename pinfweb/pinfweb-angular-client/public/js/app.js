var app = angular.module('PINFWEB', ['ngRoute']);

app.config(function ($routeProvider) {
 
    $routeProvider.when("/cenovnici", {
        controller: "CenovniciCtrl",
        templateUrl: "../views/cenovnici.html"
    });

    $routeProvider.otherwise({ redirectTo: "/" });
});