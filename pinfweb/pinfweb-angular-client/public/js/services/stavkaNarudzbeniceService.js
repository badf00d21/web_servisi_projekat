app.service('stavkaNarudzbeniceService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajStavkeNarudzbenice = function() {
        return $http.get(restApiBaseUrl + 'stavkanarudzbenice/');
    }

    this.izbrisiStavkuNarudzbenice = function(id) {
         return $http.delete(restApiBaseUrl + "stavkanarudzbenice/" + id + '/');
    }

    this.dodajStavkuNarudzbenice = function(stavkenarudzbenice) {
        //return $http.post(restApiBaseUrl + "stavkafakture", stavkafakture);

    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "stavkenarudzbenice"+ '/',
       data: stavkenarudzbenice,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getStavkaNarudzbenice = function(id) {
        return $http.get(restApiBaseUrl + "stavkanarudzbenice/" + id + '/');
    }

    this.sacuvajStavkuNarudzbenice = function(stavkanarudzbenice) {
       // return $http.put(restApiBaseUrl + "stavkafakture/" + stavkafakture.id_stavke_fakture, stavkafakture);

       return  $http({
       method: 'PUT',
       url: restApiBaseUrl + "stavkanarudzbenice/" + stavkenarudzbenice.id_stavke_fakture + '/',
       data: stavkenarudzbenice,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
}]);