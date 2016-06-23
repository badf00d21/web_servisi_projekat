app.service('proizvodService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajProizvode = function() {
        return $http.get(restApiBaseUrl + 'proizvod/');
    }

    this.izbrisiProizvod = function(id) {
         return $http.delete(restApiBaseUrl + "proizvod/" + id + '/');
    }

    this.dodajProizvod = function(proizvod) {
        //return $http.post(restApiBaseUrl + "proizvod", proizvod);

    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "proizvod"+ '/',
       data: proizvod,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getProizvod = function(id) {
        return $http.get(restApiBaseUrl + "proizvod/" + id + '/');
    }

    this.sacuvajProizvod = function(proizvod) {
        //return $http.put(restApiBaseUrl + "proizvod/" + proizvod.id_proizvoda, proizvod);

    return  $http({
       method: 'PUT',
       url: restApiBaseUrl + "proizvod/" + proizvod.id_proizvoda + '/',
       data: proizvod,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
}]);
