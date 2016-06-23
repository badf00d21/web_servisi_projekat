app.service('grupaProizvodaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajGrupeProizvoda = function() {
        return $http.get(restApiBaseUrl + 'grupaproizvoda/');
    }

    this.izbrisiGrupuProizvoda = function(id) {
         return $http.delete(restApiBaseUrl + "grupaproizvoda/" + id + '/');
    }

    this.dodajGrupuProizvoda = function(grupaproizvoda) {
        //return $http.post(restApiBaseUrl + "grupaproizvoda", grupaproizvoda);

    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "grupaproizvoda"+ '/',
       data: grupaproizvoda,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getGrupaProizvoda = function(id) {
        return $http.get(restApiBaseUrl + "grupaproizvoda/" + id + '/');
    }

    this.sacuvajGrupuProizvoda = function(grupaproizvoda) {
        //return $http.put(restApiBaseUrl + "grupaproizvoda/" + grupaproizvoda.id_grupe, grupaproizvoda);

    return  $http({
       method: 'PUT',
       url: restApiBaseUrl + "grupaproizvoda/" + grupaproizvoda.id_grupe + '/',
       data: grupaproizvoda,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
}]);