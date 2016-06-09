app.service('poslovnaGodinaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajPoslovneGodine = function() {
        return $http.get(restApiBaseUrl + 'poslovnagodina');
    }

    this.izbrisiPoslovnuGodinu = function(id) {
         return $http.delete(restApiBaseUrl + "poslovnagodina/" + id);
    }

    this.dodajPoslovnuGodinu = function(poslovnagodina) {
        return $http.post(restApiBaseUrl + "poslovnagodina", poslovnagodina);
    }
    
    this.getPoslovnuGodinu = function(id) {
        return $http.get(restApiBaseUrl + "poslovnagodina/" + id);
    }

    this.sacuvajPoslovnuGodinu = function(poslovnagodina) {
        return $http.put(restApiBaseUrl + "poslovnagodina/" + poslovnagodina.id_godine, poslovnagodina);
    }
}]);
