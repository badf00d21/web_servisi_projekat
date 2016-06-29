app.service('fakturaService', ['$http', 'restApiBaseUrl', function($http, restApiBaseUrl) {
    
    this.ucitajFakture = function() {
        return $http.get(restApiBaseUrl + 'faktura/');
    }

    this.izbrisiFakturu = function(id) {
         return $http.delete(restApiBaseUrl + "faktura/" + id +'/');
    }

    this.dodajFakturu = function(faktura) {
       // return $http.post(restApiBaseUrl + "faktura", faktura);

    return  $http({
       method: 'POST',
       url: restApiBaseUrl + "fakturisanje/rucno"+ '/',
       data: faktura,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
    
    this.getFaktura = function(id) {
        return $http.get(restApiBaseUrl + "faktura/" + id + '/');
    }

    this.sacuvajFakturu = function(faktura) {
        //return $http.put(restApiBaseUrl + "faktura/" + faktura.id_fakture, faktura);

    return  $http({
       method: 'PUT',
       url: restApiBaseUrl + "faktura/" + faktura.id_fakture + '/',
       data: faktura,
        headers: {
            'Content-Type': 'application/json'
   }});
    }
//TODO2
    this.eksportXml = function(id) {
        return $http.get(restApiBaseUrl + "fakturaxml/" + id);
    }

    this.eksportPdf = function(id) {
        return $http.get(restApiBaseUrl + "fakturapdf/" + id);
    }

    this.dodajFakturuRucno = function(faktura) {
        return $http.post(restApiBaseUrl + "fakturisanje/rucno", faktura);
    }
    
    this.kreirajFakturuNaOsnovuNarudzbenice = function(faktura) {
        return $http.post(restApiBaseUrl + "fakturisanje/narudzbenica/", faktura);
    }

    this.pretraziFakture = function(datumi) {
        return $http.post(restApiBaseUrl + "pretraga_faktura", datumi);
    }

    this.posaljiFakturu = function(id) {
        return $http.post(restApiBaseUrl + "faktura/posalji/", id);
    }
    
}]);
