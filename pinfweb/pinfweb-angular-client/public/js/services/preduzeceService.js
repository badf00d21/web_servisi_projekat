app.service('preduzeceService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajPreduzeca = function() {
        return $http.get(restApiBaseUrl + 'preduzece');
    }

    this.izbrisiPreduzece = function(id) {
         return $http.delete(restApiBaseUrl + "preduzece/" + id + '/');
    }

    this.dodajPreduzece = function(preduzece) {
      return  $http({
       method: 'POST',
       url: restApiBaseUrl + "preduzece"+ '/',
       data: preduzece,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getPreduzece = function(id) {
        return $http.get(restApiBaseUrl + "preduzece/" + id + '/');
    }

    this.sacuvajPreduzece = function(preduzece) {

      return    $http({
       method: 'PUT',
       url: restApiBaseUrl + "preduzece/" + preduzece.id_preduzeca + '/',
       data: preduzece,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
}]);