app.service('preduzeceService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajPreduzeca = function() {
        return $http.get(restApiBaseUrl + 'preduzece');
    }

    this.izbrisiPreduzece = function(id) {
         return $http.delete(restApiBaseUrl + "preduzece/" + id);
    }

    this.dodajPreduzece = function(preduzece) {
        return $http.post(restApiBaseUrl + "preduzece", cenovnik);
    }
    
}]);