app.service('stavkaCenovnikaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajStavkeCenovnika = function() {
        return $http.get(restApiBaseUrl + 'stavkacenovnika');
    }

    this.izbrisiStavkuCenovnika = function(id) {
         return $http.delete(restApiBaseUrl + "stavkacenovnika/" + id);
    }

    this.dodajStavkuCenovnika = function(stavkacenovnika) {
        return $http.post(restApiBaseUrl + "stavkacenovnika", stavkacenovnika);
    }
    
    this.getStavkaCenovnika = function(id) {
        return $http.get(restApiBaseUrl + "stavkacenovnika/" + id);
    }

    this.sacuvajStavkuCenovnika = function(stavkacenovnika) {
        return $http.put(restApiBaseUrl + "stavkacenovnika/" + stavkacenovnika.id_stavke_cenovnika, stavkacenovnika);
    }
}]);