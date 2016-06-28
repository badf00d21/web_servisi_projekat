app.service('narudzbenicaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajNarudzbenice = function() {
        return $http.get(restApiBaseUrl + 'narudzbenica/');
    }

    this.izbrisiNarudzbenicu = function(id) {
         return $http.delete(restApiBaseUrl + "narudzbenica/" + id +'/');
    }

    this.dodajNarudzbenicu = function(narudzbenica) {
      console.log(narudzbenica);
    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "nova_narudzbenica"+ '/',
       data: narudzbenica,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getNarudzbenica = function(id) {
        return $http.get(restApiBaseUrl + "narudzbenica/" + id + '/');
    }

    this.sacuvajNarudzbenicu = function(narudzbenica) {

    return  $http({
       method: 'PUT',
       url: restApiBaseUrl + "narudzbenica/" + narudzbenica.id_fakture + '/',
       data: narudzbenica,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
}]);