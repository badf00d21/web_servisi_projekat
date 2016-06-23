app.service('cenovnikService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajCenovnike = function() {
        return $http.get(restApiBaseUrl + 'cenovnik/');
    }

    this.izbrisiCenovnik = function(id) {
         return $http.delete(restApiBaseUrl + "cenovnik/" + id + '/');
    }

    this.dodajCenovnik = function(cenovnik) {
        //return $http.post(restApiBaseUrl + "cenovnik/", cenovnik);

    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "cenovnik" + '/',
       data: cenovnik,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getCenovnik = function(id) {
        return $http.get(restApiBaseUrl + "cenovnik/" + id + '/');
    }

    this.sacuvajCenovnik = function(cenovnik) {
       // return $http.put(restApiBaseUrl + "cenovnik/" + cenovnik.id_cenovnika + '/', cenovnik);

    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "cenovnik/"+ cenovnik.id_cenovnika + '/',
       data: cenovnik,
        headers: {
            'Content-Type': 'application/json'
   }});
    }

    this.kopirajCenovnik = function(infoCen) {
        return $http.post(restApiBaseUrl + "kopirajcenovnik/" , infoCen); ///TODO
    }

    //this.getCenovnikoo = function(id) {
      //  return $http.get("http://localhost:8000/" + "cenovnik/" + id + '/');
    //}
}]);
