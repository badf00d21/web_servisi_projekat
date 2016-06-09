var fakeApi = angular.module('fakeApi', ['ngMockE2E', 'PINFWEB_CONFIG']);

var cenovnici = [
    {
       id_cenovnika: "1",
       id_preduzeca: "1",
       datum_vazena: "25-10-2016"
    },  
    {
       id_cenovnika: "2",
       id_preduzeca: "2",
       datum_vazena: "25-10-2014"
    }
];

var preduzeca = [
    {
       id_preduzeca: "1",
       nazivpreduzeca: "Preduzece 1",
    },  
    {
       id_preduzeca: "2",
       nazivpreduzeca: "Preduzece 2"
    }
];

fakeApi.run(function ($httpBackend, restApiBaseUrl, applicationBaseUrl) {
   $httpBackend.whenGET(/views\/.*/).passThrough();

   $httpBackend.whenGET(restApiBaseUrl + 'cenovnik').respond(cenovnici);
   $httpBackend.whenGET(restApiBaseUrl + 'preduzece').respond(preduzeca);

   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'cenovnik\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'preduzece\\/[0-9]+')).respond(200);

   $httpBackend.whenPOST(restApiBaseUrl + 'cenovnik').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var cenovnik = {
           id_cenovnika: Math.floor(Math.random() * (1000 - 3) + 3),
           id_preduzeca: result.id_preduzeca.id_preduzeca,
           datum_vazena: result.datum_vazena
       }

       cenovnici.push(cenovnik);
       return [200, cenovnik, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'preduzece').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var preduzece = {
           id_preduzeca: Math.floor(Math.random() * (1000 - 3) + 3),
           nazivpreduzeca: result.nazivpreduzeca
       }

       preduzeca.push(preduzece);
       return [200, preduzece, {}];
   });

   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'cenovnik\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < cenovnici.length; i++) {
            if (cenovnici[i].id_cenovnika == id) {
                return [200, cenovnici[i], {}];    
            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'preduzece\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < preduzeca.length; i++) {
            if (preduzeca[i].id_preduzeca == id) {
                return [200, preduzeca[i], {}];    
            }
        }

        return [404];
   });

   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'cenovnik\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < cenovnici.length; i++) {
            if (cenovnici[i].id_cenovnika == id) {
                var result = angular.fromJson(data);

                var cenovnik = {
                    id_cenovnika: result.id_cenovnika,
                    id_preduzeca: result.id_preduzeca.id_preduzeca,
                    datum_vazena: result.datum_vazena
                }

                cenovnici[i] = cenovnik;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'preduzece\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < preduzeca.length; i++) {
            if (preduzeca[i].id_preduzeca == id) {
                var result = angular.fromJson(data);

                var preduzece = {
                    id_preduzeca: result.id_preduzeca,
                    nazivpreduzeca: result.nazivpreduzeca
                }

                preduzeca[i] = preduzece;
                break;   
            }
        }

        return [200];
   });
});