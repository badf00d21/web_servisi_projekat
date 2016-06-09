app.service('grupaProizvodaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajGrupeProizvoda = function() {
        return $http.get(restApiBaseUrl + 'grupaproizvoda');
    }

    this.izbrisiGrupuProizvoda = function(id) {
         return $http.delete(restApiBaseUrl + "grupaproizvoda/" + id);
    }

    this.dodajGrupuProizvoda = function(grupaproizvoda) {
        return $http.post(restApiBaseUrl + "grupaproizvoda", grupaproizvoda);
    }
    
    this.getGrupaProizvoda = function(id) {
        return $http.get(restApiBaseUrl + "grupaproizvoda/" + id);
    }

    this.sacuvajGrupuProizvoda = function(grupaproizvoda) {
        return $http.put(restApiBaseUrl + "grupaproizvoda/" + grupaproizvoda.id_grupe, grupaproizvoda);
    }
}]);