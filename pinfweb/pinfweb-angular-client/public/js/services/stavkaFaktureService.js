app.service('stavkaFaktureService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajStavkeFakture = function() {
        return $http.get(restApiBaseUrl + 'stavkafakture/');
    }

    this.izbrisiStavkuFakture = function(id) {
         return $http.delete(restApiBaseUrl + "stavkafakture/" + id + '/');
    }

    this.dodajStavkuFakture = function(stavkafakture) {
        //return $http.post(restApiBaseUrl + "stavkafakture", stavkafakture);

    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "stavkafakture"+ '/',
       data: stavkafakture,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getStavkaFakture = function(id) {
        return $http.get(restApiBaseUrl + "stavkafakture/" + id + '/');
    }

    this.sacuvajStavkuFakture = function(stavkafakture) {
       // return $http.put(restApiBaseUrl + "stavkafakture/" + stavkafakture.id_stavke_fakture, stavkafakture);

       return  $http({
       method: 'PUT',
       url: restApiBaseUrl + "stavkafakture/" + stavkafakture.id_stavke_fakture + '/',
       data: stavkafakture,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
}]);