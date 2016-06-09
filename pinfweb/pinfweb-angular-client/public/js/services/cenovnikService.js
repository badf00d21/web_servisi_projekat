app.service('cenovnikService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajCenovnike = function() {
        return $http.get(restApiBaseUrl + 'cenovnik');
    }

    this.izbrisiCenovnik = function(id) {
         return $http.delete(restApiBaseUrl + "cenovnik/" + id);
    }

    this.dodajCenovnik = function(cenovnik) {
        return $http.post(restApiBaseUrl + "cenovnik", cenovnik);
    }
    
    this.getCenovnik = function(id) {
        return $http.get(restApiBaseUrl + "cenovnik/" + id);
    }

    this.sacuvajCenovnik = function(cenovnik) {
        return $http.put(restApiBaseUrl + "cenovnik/" + cenovnik.id_cenovnika, cenovnik);
    }
}]);
