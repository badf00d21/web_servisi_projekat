app.service('stopaPdvaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajStopePdva = function() {
        return $http.get(restApiBaseUrl + 'stopapdva/');
    }

    this.izbrisiStopuPdva = function(id) {
         return $http.delete(restApiBaseUrl + "stopapdva/" + id + '/');
    }

    this.dodajStopuPdva = function(stopapdva) {
        //return $http.post(restApiBaseUrl + "stopapdva", stopapdva);

    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "stopapdva"+ '/',
       data: stopapdva,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getStopaPdva = function(id) {
        return $http.get(restApiBaseUrl + "stopapdva/" + id);
    }

    this.sacuvajStopuPdva = function(stopapdva) {
      //  return $http.put(restApiBaseUrl + "stopapdva/" + stopapdva.id_stope, stopapdva);

    return  $http({
       method: 'PUT',
       url: restApiBaseUrl + "stopapdva/" + stopapdva.id_stope + '/',
       data: stopapdva,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
}]);