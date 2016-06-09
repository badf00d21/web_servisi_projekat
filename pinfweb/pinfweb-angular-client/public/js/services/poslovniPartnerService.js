app.service('poslovniPartnerService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajPoslovnePartnere = function() {
        return $http.get(restApiBaseUrl + 'poslovnipartner');
    }

    this.izbrisiPoslovnogPartnera = function(id) {
         return $http.delete(restApiBaseUrl + "poslovnipartner/" + id);
    }

    this.dodajPoslovnogPartnera = function(poslovnipartner) {
        return $http.post(restApiBaseUrl + "poslovnipartner", poslovnipartner);
    }
    
    this.getPoslovniPartner = function(id) {
        return $http.get(restApiBaseUrl + "poslovnipartner/" + id);
    }

    this.sacuvajPoslovnogPartnera = function(poslovnipartner) {
        return $http.put(restApiBaseUrl + "poslovnipartner/" + poslovnipartner.id_poslovnog_partnera, poslovnipartner);
    }
}]);