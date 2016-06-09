app.service('stopaPdvaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajStopePdva = function() {
        return $http.get(restApiBaseUrl + 'stopapdva');
    }

    this.izbrisiStopuPdva = function(id) {
         return $http.delete(restApiBaseUrl + "stopapdva/" + id);
    }

    this.dodajStopuPdva = function(stopapdva) {
        return $http.post(restApiBaseUrl + "stopapdva", stopapdva);
    }
    
    this.getStopaPdva = function(id) {
        return $http.get(restApiBaseUrl + "stopapdva/" + id);
    }

    this.sacuvajStopuPdva = function(stopapdva) {
        return $http.put(restApiBaseUrl + "stopapdva/" + stopapdva.id_stope, stopapdva);
    }
}]);