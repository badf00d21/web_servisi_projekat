app.service('jedinicaMereService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajJediniceMere = function() {
        return $http.get(restApiBaseUrl + 'jedinicamere');
    }

    this.izbrisiJedinicuMere = function(id) {
         return $http.delete(restApiBaseUrl + "jedinicamere/" + id);
    }

    this.dodajJedinicuMere = function(jedinicamere) {
        return $http.post(restApiBaseUrl + "jedinicamere", jedinicamere);
    }
    
    this.getJedinicaMere = function(id) {
        return $http.get(restApiBaseUrl + "jedinicamere/" + id);
    }

    this.sacuvajJedinicuMere = function(jedinicamere) {
        return $http.put(restApiBaseUrl + "jedinicamere/" + jedinicamere.id_jedinice, jedinicamere);
    }
}]);