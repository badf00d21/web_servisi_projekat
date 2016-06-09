app.service('proizvodService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajProizvode = function() {
        return $http.get(restApiBaseUrl + 'proizvod');
    }

    this.izbrisiProizvod = function(id) {
         return $http.delete(restApiBaseUrl + "proizvod/" + id);
    }

    this.dodajProizvod = function(proizvod) {
        return $http.post(restApiBaseUrl + "proizvod", proizvod);
    }
    
    this.getProizvod = function(id) {
        return $http.get(restApiBaseUrl + "proizvod/" + id);
    }

    this.sacuvajProizvod = function(proizvod) {
        return $http.put(restApiBaseUrl + "proizvod/" + proizvod.id_proizvoda, proizvod);
    }
}]);
