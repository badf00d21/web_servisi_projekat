app.service('pdvService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajPdvove = function() {
        return $http.get(restApiBaseUrl + 'pdv');
    }

    this.izbrisiPdv = function(id) {
         return $http.delete(restApiBaseUrl + "pdv/" + id);
    }

    this.dodajPdv = function(pdv) {
        return $http.post(restApiBaseUrl + "pdv", pdv);
    }
    
    this.getPdv = function(id) {
        return $http.get(restApiBaseUrl + "pdv/" + id);
    }

    this.sacuvajPdv = function(pdv) {
        return $http.put(restApiBaseUrl + "pdv/" + pdv.id_pdv_a, pdv);
    }
}]);