angular.module('appRoutes', []).config(['$routeProvider', function($routeProvider) {

    $routeProvider

        .when('/cenovnici', {
            templateUrl: 'cenovnici.html',
            controller: 'CenovniciCtrl'
        })

        .when('/url2', {
            templateUrl: '',
            controller: ''
        });

}]);