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

var jediniceMere = [
    {
       id_jedinice: "1",
       naziv_jedinice_mere: "Jedinica mere 1",
       skracenica: "jm1"
    },  
    {
        id_jedinice: "2",
       naziv_jedinice_mere: "Jedinica mere 2",
       skracenica: "jm2"
    }
];

var pdvovi = [
    {
       id_pdv_a: "1",
       naziv_pdv_a: "Pdv 1"
    },  
    {
       id_pdv_a: "2",
       naziv_pdv_a: "Pdv 2"
    }
];

var grupeProizvoda = [
    {
       id_grupe: "1",
       id_pdv_a: "1",
       naziv_grupe: "Grupa 1"
    },  
    {
       id_grupe: "2",
       id_pdv_a: "2",
       naziv_grupe: "Grupa 2"
    }
]; 

var stopePdva = [
    {
       id_stope: "1",
       id_pdv_a: "1",
       stopa: "15",
       datum_vazenja: "25-06-2015"
    },  
    {
       id_stope: "2",
       id_pdv_a: "2",
       stopa: "22",
       datum_vazenja: "25-06-2016"
    }
]; 

var poslovniPartneri = [
    {
       id_poslovnog_partnera: "1",
       id_preduzeca: "1",
       vrsta: "Bla",
       pib: "10000",
       adresa: "Bla bla",
       mesto: "Sabac",
       tekuci_racun: "3232323"
    },  
    {
       id_poslovnog_partnera: "2",
       id_preduzeca: "2",
       vrsta: "Bla2",
       pib: "100450",
       adresa: "Bla bla 2",
       mesto: "Novi Sad",
       tekuci_racun: "4252623"
    }
]; 

var poslovneGodine = [
    {
       id_godine: "1",
       id_preduzeca: "1",
       godina: "2015",
       zakljucena: "2016"
    },  
    {
       id_godine: "2",
       id_preduzeca: "1",
       godina: "2012",
       zakljucena: "2015"
    }
];

var proizvodi = [
    {
       vrsta_proizvoda : "Hrana",
       id_proizvoda: "1",
       id_preduzeca: "1",
       id_jedinice: "1",
       id_grupe: "1",
       naziv_proizvoda: "Papaja"  
    },  
    {
       vrsta_proizvoda : "Pice",
       id_proizvoda: "2",
       id_preduzeca: "1",
       id_jedinice: "1",
       id_grupe: "1",
       naziv_proizvoda: "Papaja"  
    }
];

var fakture = [
    {
       id_fakture : "1",
        id_poslovnog_partnera : "1",
        id_preduzeca : "1",
        id_godine : "1",
        broj_fakture : "123",
        datum_fakture : "21-05-1993",
        datum_valute : "21-05-1993",
        ukupan_rabat : "21-05-1993",
        ukupan_iznos_bez_pdv_a : "300",
        ukupan_pdv : "21",
        ukupno_za_placanje : "321",
        status_fakture : "Poslata"
    },  
    {
       id_fakture : "2",
        id_poslovnog_partnera : "2",
        id_preduzeca : "2",
        id_godine : "2",
        broj_fakture : "321",
        datum_fakture : "21-05-1993",
        datum_valute : "21-05-1993",
        ukupan_rabat : "21-05-1993",
        ukupan_iznos_bez_pdv_a : "222",
        ukupan_pdv : "11",
        ukupno_za_placanje : "233",
        status_fakture : "U izradi"
    }
];

var stavkeCenovnika = [
    {
       id_stavke_cenovnika: "1",
       id_cenovnika: "1",
       id_proizvoda: "1",
       cena: "150"
    },  
    {
       id_stavke_cenovnika: "2",
       id_cenovnika: "2",
       id_proizvoda: "2",
       cena: "250"
    },
    {
       id_stavke_cenovnika: "3",
       id_cenovnika: "2",
       id_proizvoda: "1",
       cena: "111"
    },
    {
       id_stavke_cenovnika: "4",
       id_cenovnika: "2",
       id_proizvoda: "2",
       cena: "123"
    }
];

var stavkeFakture = [
    {
       id_stavke_fakture: "1",
       id_proizvoda: "1",
       id_fakture: "1",
       kolicina: "212",
       rabat: "21",
       jedinicna_cena: "21",
       stopa_pdv_a: "21",
       osnovica: "21",
       iznos_pdv_a: "21",
       ukupan_iznos: "21"
    },  
    {
       id_stavke_fakture: "2",
       id_proizvoda: "2",
       id_fakture: "2",
       kolicina: "212",
       rabat: "21",
       jedinicna_cena: "21",
       stopa_pdv_a: "21",
       osnovica: "21",
       iznos_pdv_a: "21",
       ukupan_iznos: "21"
    }
];


fakeApi.run(function ($httpBackend, restApiBaseUrl, applicationBaseUrl) {
   $httpBackend.whenGET(/views\/.*/).passThrough();

   $httpBackend.whenGET(restApiBaseUrl + 'cenovnik').respond(cenovnici);
   $httpBackend.whenGET(restApiBaseUrl + 'preduzece').respond(preduzeca);
   $httpBackend.whenGET(restApiBaseUrl + 'jedinicamere').respond(jediniceMere);
   $httpBackend.whenGET(restApiBaseUrl + 'pdv').respond(pdvovi);
   $httpBackend.whenGET(restApiBaseUrl + 'grupaproizvoda').respond(grupeProizvoda);
   $httpBackend.whenGET(restApiBaseUrl + 'stopapdva').respond(stopePdva);
   $httpBackend.whenGET(restApiBaseUrl + 'poslovnipartner').respond(poslovniPartneri);
   $httpBackend.whenGET(restApiBaseUrl + 'poslovnagodina').respond(poslovneGodine);
   $httpBackend.whenGET(restApiBaseUrl + 'proizvod').respond(proizvodi);
   $httpBackend.whenGET(restApiBaseUrl + 'faktura').respond(fakture);
   $httpBackend.whenGET(restApiBaseUrl + 'stavkacenovnika').respond(stavkeCenovnika);
   $httpBackend.whenGET(restApiBaseUrl + 'stavkafakture').respond(stavkeFakture);

   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'cenovnik\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'preduzece\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'jedinicamere\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'pdv\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'grupaproizvoda\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'stopapdva\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'poslovnipartner\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'poslovnagodina\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'proizvod\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'faktura\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'stavkacenovnika\\/[0-9]+')).respond(200);
   $httpBackend.whenDELETE(new RegExp(restApiBaseUrl + 'stavkafakture\\/[0-9]+')).respond(200);

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
   $httpBackend.whenPOST(restApiBaseUrl + 'jedinicamere').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var jedinicamere = {
           id_jedinice: Math.floor(Math.random() * (1000 - 3) + 3),
           naziv_jedinice_mere: result.naziv_jedinice_mere,
           skracenica: result.skracenica
       }

       jediniceMere.push(jedinicamere);
       return [200, jedinicamere, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'pdv').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var pdv = {
           id_pdv_a: Math.floor(Math.random() * (1000 - 3) + 3),
           naziv_pdv_a: result.naziv_pdv_a
       }

       pdvovi.push(pdv);
       return [200, pdv, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'grupaproizvoda').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var grupaproizvoda = {
           id_grupe: Math.floor(Math.random() * (1000 - 3) + 3),
           id_pdv_a: result.id_pdv_a.id_pdv_a,
           naziv_grupe: result.naziv_grupe
       }

       grupeProizvoda.push(grupaproizvoda);
       return [200, grupaproizvoda, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'stopapdva').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var stopapdva = {
           id_stope: Math.floor(Math.random() * (1000 - 3) + 3),
           id_pdv_a: result.id_pdv_a.id_pdv_a,
           stopa: result.stopa,
           datum_vazenja: result.datum_vazenja
       }

       stopePdva.push(stopapdva);
       return [200, stopapdva, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'poslovnipartner').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var poslovnipartner = {
           id_poslovnog_partnera: Math.floor(Math.random() * (1000 - 3) + 3),
           id_preduzeca: result.id_preduzeca.id_preduzeca,
           vrsta: result.vrsta,
           pib: result.pib,
           adresa: result.adresa,
           mesto: result.mesto,
           tekuci_racun: result.tekuci_racun
       }

       poslovniPartneri.push(poslovnipartner);
       return [200, poslovnipartner, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'poslovnagodina').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var poslovnagodina = {
           id_godine: Math.floor(Math.random() * (1000 - 3) + 3),
           id_preduzeca: result.id_preduzeca.id_preduzeca,
           godina: result.godina,
           zakljucena: result.zakljucena

       }
       poslovneGodine.push(poslovnagodina);
       return [200, poslovnagodina, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'proizvod').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var proizvod = {
           vrsta_proizvoda : result.vrsta_proizvoda,
           id_proizvoda: Math.floor(Math.random() * (1000 - 3) + 3),
           id_preduzeca: result.id_preduzeca.id_preduzeca,
           id_jedinice: result.id_jedinice.id_jedinice,
           id_grupe: result.id_grupe.id_grupe,
           naziv_proizvoda: result.naziv_proizvoda  

       }
       proizvodi.push(proizvod);
       return [200, proizvod, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'faktura').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var faktura = {
            id_fakture :  Math.floor(Math.random() * (1000 - 3) + 3),
            id_poslovnog_partnera : result.id_poslovnog_partnera.id_poslovnog_partnera,
            id_preduzeca : result.id_preduzeca.id_preduzeca,
            id_godine : result.id_godine.id_godine,
            broj_fakture : result.broj_fakture,
            datum_fakture : result.datum_fakture,
            datum_valute : result.datum_valute,
            ukupan_rabat : result.ukupan_rabat,
            ukupan_iznos_bez_pdv_a : result.ukupan_iznos_bez_pdv_a,
            ukupan_pdv : result.ukupan_pdv,
            ukupno_za_placanje : result.ukupno_za_placanje,
            status_fakture : result.status_fakture

       }
       fakture.push(faktura);
       return [200, faktura, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'stavkacenovnika').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var stavkacenovnika = {
           id_stavke_cenovnika: Math.floor(Math.random() * (1000 - 3) + 3),
           id_proizvoda: result.id_proizvoda.id_proizvoda,
           id_cenovnika: result.id_cenovnika.id_cenovnika,
           cena: result.cena
        }
           
       stavkeCenovnika.push(stavkacenovnika);
       return [200, stavkacenovnika, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'stavkafakture').respond(function(method, url, data) {
       var result = angular.fromJson(data);

       var stavkafakture = {
           id_stavke_fakture: Math.floor(Math.random() * (1000 - 3) + 3),
           id_fakture: result.id_fakture.id_fakture,
           id_proizvoda: result.id_proizvoda.id_proizvoda,
           kolicina: result.kolicina,
           rabat: result.rabat,
           jedinicna_cena: result.jedinicna_cena,
           stopa_pdv_a: result.stopa_pdv_a,
           osnovica: result.osnovica,
           iznos_pdv_a: result.pdv_a,
           ukupan_iznos: result.ukupan_iznos
        }
           
       stavkeFakture.push(stavkafakture);
       return [200, stavkafakture, {}];
   });
   $httpBackend.whenPOST(restApiBaseUrl + 'kopirajcenovnik').respond(function(method, url, data) {
       var result = angular.fromJson(data);
       var cen_id = result.id_cen;
       var procenatt = result.procenat;
       console.log(procenatt);

       orcenn = null;

       for (var i = 0; i < cenovnici.length; i++){
           if ( cenovnici[i].id_cenovnika == cen_id ){
                orcenn = cenovnici[i];
                break;
           }
       }

       if (orcenn == null)
          console.log('nulll he ');

       var cenovnik1 = {
           id_cenovnika: Math.floor(Math.random() * (1000 - 3) + 3),
           id_preduzeca: orcenn.id_preduzeca,
           datum_vazena: orcenn.datum_vazena
        }

        cenovnici.push(cenovnik1);
        noveStavke = [];
        for (var i = 0; i < stavkeCenovnika.length; i++){
            if (stavkeCenovnika[i].id_cenovnika == cen_id){
            var stavkica = {
                    id_stavke_cenovnika: Math.floor(Math.random() * (1000 - 3) + 3),
                    id_proizvoda: stavkeCenovnika[i].id_proizvoda,
                    id_cenovnika: cenovnik1.id_cenovnika,
                    cena: parseInt(stavkeCenovnika[i].cena) + parseInt(stavkeCenovnika[i].cena) * procenatt / 100
                        }
                noveStavke.push(stavkica);
            }
            }
        console.log(noveStavke);
        
        for (var i = 0; i < noveStavke.length; i++){
                stavkeCenovnika.push(noveStavke[i]);
        }

       return [200, stavkeCenovnika, {}];
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
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'jedinicamere\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < jediniceMere.length; i++) {
            if (jediniceMere[i].id_jedinice == id) {
                return [200, jediniceMere[i], {}];    
            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'pdv\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < pdvovi.length; i++) {
            if (pdvovi[i].id_pdv_a == id) {
                return [200, pdvovi[i], {}];    
            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'grupaproizvoda\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < grupeProizvoda.length; i++) {
            if (grupeProizvoda[i].id_grupe == id) {
                return [200, grupeProizvoda[i], {}];    
            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'stopapdva\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < stopePdva.length; i++) {
            if (stopePdva[i].id_stope == id) {
                return [200, stopePdva[i], {}];    
            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'poslovnipartner\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < poslovniPartneri.length; i++) {
            if (poslovniPartneri[i].id_poslovnog_partnera == id) {
                return [200, poslovniPartneri[i], {}];    
            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'poslovnagodina\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < poslovneGodine.length; i++) {
            if (poslovneGodine[i].id_godine == id) {
                return [200, poslovneGodine[i], {}];  
            }
       }
          return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'proizvod\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];
       for (var i = 0; i < proizvodi.length; i++) {
            if (proizvodi[i].id_proizvoda == id) {
                return [200, proizvodi[i], {}];    

            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'faktura\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];
       for (var i = 0; i < fakture.length; i++) {
            if (fakture[i].id_fakture == id) {
                return [200, fakture[i], {}];    

            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'stavkacenovnika\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];
       for (var i = 0; i < stavkeCenovnika.length; i++) {
            if (stavkeCenovnika[i].id_stavke_cenovnika == id) {
                return [200, stavkeCenovnika[i], {}];    

            }
        }

        return [404];
   });
   $httpBackend.whenGET(new RegExp(restApiBaseUrl + 'stavkafakture\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];
       for (var i = 0; i < stavkeFakture.length; i++) {
            if (stavkeFakture[i].id_stavke_fakture == id) {
                return [200, stavkeFakture[i], {}];    

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
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'jedinicamere\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < jediniceMere.length; i++) {
            if (jediniceMere[i].id_jedinice == id) {
                var result = angular.fromJson(data);

                var jedinicamere = {
                    id_jedinice: result.id_jedinice,
                    naziv_jedinice_mere: result.naziv_jedinice_mere,
                    skracenica: result.skracenica
                }

                jediniceMere[i] = jedinicamere;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'pdv\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < pdvovi.length; i++) {
            if (pdvovi[i].id_pdv_a == id) {
                var result = angular.fromJson(data);

                var pdv = {
                    id_pdv_a: result.id_pdv_a,
                    naziv_pdv_a: result.naziv_pdv_a
                }

                pdvovi[i] = pdv;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'grupaproizvoda\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < grupeProizvoda.length; i++) {
            if (grupeProizvoda[i].id_grupe == id) {
                var result = angular.fromJson(data);

                var grupaproizvoda = {
                    id_grupe: result.id_grupe,
                    id_pdv_a: result.id_pdv_a.id_pdv_a,
                    naziv_grupe: result.naziv_grupe
                }

                grupeProizvoda[i] = grupaproizvoda;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'stopapdva\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < stopePdva.length; i++) {
            if (stopePdva[i].id_stope == id) {
                var result = angular.fromJson(data);

                var stopapdva = {
                    id_stope: result.id_stope,
                    id_pdv_a: result.id_pdv_a.id_pdv_a,
                    stopa: result.stopa,
                    datum_vazenja: result.datum_vazenja
                }

                stopePdva[i] = stopapdva;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'poslovnipartner\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < poslovniPartneri.length; i++) {
            if (poslovniPartneri[i].id_poslovnog_partnera == id) {
                var result = angular.fromJson(data);

                var poslovnipartner = {
                    id_poslovnog_partnera: result.id_poslovnog_partnera,
                    id_preduzeca: result.id_preduzeca.id_preduzeca,
                    vrsta: result.vrsta,
                    pib: result.pib,
                    adresa: result.adresa,
                    mesto: result.mesto,
                    tekuci_racun: result.tekuci_racun
                }

                poslovniPartneri[i] = poslovnipartner;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'poslovnagodina\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < poslovneGodine.length; i++) {
            if (poslovneGodine[i].id_godine == id) {
                var result = angular.fromJson(data);

                var poslovnagodina = {
                    id_godine: result.id_godine,
                    id_preduzeca: result.id_preduzeca.id_preduzeca,
                    godina: result.godina,
                    zakljucena: result.zakljucena
                }

                poslovneGodine[i] = poslovnagodina;
            break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'proizvod\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < proizvodi.length; i++) {
            if (proizvodi[i].id_proizvoda == id) {
                var result = angular.fromJson(data);

                var proizvod = {
                    vrsta_proizvoda : result.vrsta_proizvoda,
                    id_proizvoda: result.id_proizvoda,
                    id_preduzeca: result.id_preduzeca.id_preduzeca,
                    id_jedinice: result.id_jedinice.id_jedinice,
                    id_grupe: result.id_grupe.id_grupe,
                    naziv_proizvoda: result.naziv_proizvoda  
                }

                proizvodi[i] = proizvod;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'faktura\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < fakture.length; i++) {
            if (fakture[i].id_fakture == id) {
                var result = angular.fromJson(data);

                var faktura = {
                        id_fakture :  result.id_fakture,
                        id_poslovnog_partnera : result.id_poslovnog_partnera.id_poslovnog_partnera,
                        id_preduzeca : result.id_preduzeca.id_preduzeca,
                        id_godine : result.id_godine.id_godine,
                        broj_fakture : result.broj_fakture,
                        datum_fakture : result.datum_fakture,
                        datum_valute : result.datum_valute,
                        ukupan_rabat : result.ukupan_rabat,
                        ukupan_iznos_bez_pdv_a : result.ukupan_iznos_bez_pdv_a,
                        ukupan_pdv : result.ukupan_pdv,
                        ukupno_za_placanje : result.ukupno_za_placanje,
                        status_fakture : result.status_fakture 
                }

                fakture[i] = faktura;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'stavkacenovnika\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < stavkeCenovnika.length; i++) {
            if (stavkeCenovnika[i].id_stavke_cenovnika == id) {
                var result = angular.fromJson(data);

                var stavkacenovnika = {
                    id_stavke_cenovnika :  result.id_stavke_cenovnika,
                    id_cenovnika: result.id_cenovnika.id_cenovnika,
                    id_proizvoda: result.id_proizvoda.id_proizvoda,
                    cena: result.cena
                }

                stavkeCenovnika[i] = stavkacenovnika;
                break;   
            }
        }

        return [200];
   });
   $httpBackend.whenPUT(new RegExp(restApiBaseUrl + 'stavkafakture\\/[0-9]+')).respond(function(method, url, data) {
       var urlTokens = url.split("/");
       var id = urlTokens[urlTokens.length - 1];

       for (var i = 0; i < stavkeFakture.length; i++) {
            if (stavkeFakture[i].id_stavke_fakture == id) {
                var result = angular.fromJson(data);

                var stavkafakture = {
                     id_stavke_fakture: result.id_stavke_fakture,
                     id_fakture: result.id_fakture.id_fakture,
                     id_proizvoda: result.id_proizvoda.id_proizvoda,
                     kolicina: result.kolicina,
                     rabat: result.rabat,
                     jedinicna_cena: result.jedinicna_cena,
                     stopa_pdv_a: result.stopa_pdv_a,
                     osnovica: result.osnovica,
                     iznos_pdv_a: result.iznos_pdv_a,
                     ukupan_iznos: result.ukupan_iznos
                 }

                stavkeFakture[i] = stavkafakture;
                break;   
            }
        }

        return [200];
   });
   
});