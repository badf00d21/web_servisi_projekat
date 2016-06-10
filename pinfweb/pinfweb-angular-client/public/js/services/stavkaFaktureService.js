app.service('stavkaFaktureService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajStavkeFakture = function() {
        return $http.get(restApiBaseUrl + 'stavkafakture');
    }

    this.izbrisiStavkuFakture = function(id) {
         return $http.delete(restApiBaseUrl + "stavkafakture/" + id);
    }

    this.dodajStavkuFakture = function(stavkafakture) {
        return $http.post(restApiBaseUrl + "stavkafakture", stavkafakture);
    }
    
    this.getStavkaFakture = function(id) {
        return $http.get(restApiBaseUrl + "stavkafakture/" + id);
    }

    this.sacuvajStavkuFakture = function(stavkafakture) {
        return $http.put(restApiBaseUrl + "stavkafakture/" + stavkafakture.id_stavke_fakture, stavkafakture);
    }
}]);