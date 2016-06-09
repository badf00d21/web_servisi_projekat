app.service('fakturaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajFakture = function() {
        return $http.get(restApiBaseUrl + 'faktura');
    }

    this.izbrisiFakturu = function(id) {
         return $http.delete(restApiBaseUrl + "faktura/" + id);
    }

    this.dodajFakturu = function(faktura) {
        return $http.post(restApiBaseUrl + "faktura", faktura);
    }
    
    this.getFaktura = function(id) {
        return $http.get(restApiBaseUrl + "faktura/" + id);
    }

    this.sacuvajFakturu = function(faktura) {
        return $http.put(restApiBaseUrl + "faktura/" + faktura.id_fakture, faktura);
    }
}]);
