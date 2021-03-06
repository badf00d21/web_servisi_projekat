var app = angular.module('PINFWEB', ['ngRoute', 'PINFWEB_CONFIG', 'angularModalService']);

app.config(function ($routeProvider) {
 
    $routeProvider.when("/home", {
        templateUrl: "views/home.html"
    });

    $routeProvider.when("/pregled_cenovnika", {
        controller: "PregledCenovnikaCtrl",
        templateUrl: "views/cenovnik/pregled_cenovnika.html"
    });
    
    $routeProvider.when("/novi_cenovnik", {
        controller: "KreiranjeCenovnikaCtrl",
        templateUrl: "views/cenovnik/novi_cenovnik.html"
    });

    $routeProvider.when("/izmena_cenovnika/:id", {
        controller: "IzmenaCenovnikaCtrl",
        templateUrl: "views/cenovnik/izmena_cenovnika.html"
    });
    
     $routeProvider.when("/cenovnik/:id", {
        controller: "StavkeCenovnikaCtrl",
        templateUrl: "views/cenovnik/pregled_stavki_cenovnika.html"
    });

    $routeProvider.when("/pregled_preduzeca", {
        controller: "PregledPreduzecaCtrl",
        templateUrl: "views/preduzece/pregled_preduzeca.html"
    });

    $routeProvider.when("/novo_preduzece", {
        controller: "KreiranjePreduzecaCtrl",
        templateUrl: "views/preduzece/novo_preduzece.html"
    });

    $routeProvider.when("/izmena_preduzeca/:id", {
        controller: "IzmenaPreduzecaCtrl",
        templateUrl: "views/preduzece/izmena_preduzeca.html"
    });

    $routeProvider.when("/pregled_jedinica_mere", {
        controller: "PregledJedinicaMereCtrl",
        templateUrl: "views/jedinica_mere/pregled_jedinica_mere.html"
    });

    $routeProvider.when("/nova_jedinica_mere", {
        controller: "KreiranjeJediniceMereCtrl",
        templateUrl: "views/jedinica_mere/nova_jedinica_mere.html"
    });

    $routeProvider.when("/izmena_jedinice_mere/:id", {
        controller: "IzmenaJediniceMereCtrl",
        templateUrl: "views/jedinica_mere/izmena_jedinice_mere.html"
    });

    $routeProvider.when("/pregled_pdvova", {
        controller: "PregledPdvovaCtrl",
        templateUrl: "views/pdv/pregled_pdvova.html"
    });

    $routeProvider.when("/novi_pdv", {
        controller: "KreiranjePdvaCtrl",
        templateUrl: "views/pdv/novi_pdv.html"
    });

    $routeProvider.when("/izmena_pdva/:id", {
        controller: "IzmenaPdvaCtrl",
        templateUrl: "views/pdv/izmena_pdva.html"
    });

    $routeProvider.when("/pregled_grupa_proizvoda", {
        controller: "PregledGrupaProizvodaCtrl",
        templateUrl: "views/grupa_proizvoda/pregled_grupa_proizvoda.html"
    });

    $routeProvider.when("/nova_grupa_proizvoda", {
        controller: "KreiranjeGrupeProizvodaCtrl",
        templateUrl: "views/grupa_proizvoda/nova_grupa_proizvoda.html"
    });

    $routeProvider.when("/izmena_grupe_proizvoda/:id", {
        controller: "IzmenaGrupeProizvodaCtrl",
        templateUrl: "views/grupa_proizvoda/izmena_grupe_proizvoda.html"
    });

    $routeProvider.when("/pregled_stopa_pdva", {
        controller: "PregledStopaPdvaCtrl",
        templateUrl: "views/stopa_pdva/pregled_stopa_pdva.html"
    });

    $routeProvider.when("/nova_stopa_pdva", {
        controller: "KreiranjeStopePdvaCtrl",
        templateUrl: "views/stopa_pdva/nova_stopa_pdva.html"
    });

    $routeProvider.when("/izmena_stope_pdva/:id", {
        controller: "IzmenaStopePdvaCtrl",
        templateUrl: "views/stopa_pdva/izmena_stope_pdva.html"
    });

    $routeProvider.when("/pregled_poslovnih_partnera", {
        controller: "PregledPoslovnihPartneraCtrl",
        templateUrl: "views/poslovni_partner/pregled_poslovnih_partnera.html"
    });

    $routeProvider.when("/novi_poslovni_partner", {
        controller: "KreiranjePoslovnogPartneraCtrl",
        templateUrl: "views/poslovni_partner/novi_poslovni_partner.html"
    });

    $routeProvider.when("/izmena_poslovnog_partnera/:id", {
        controller: "IzmenaPoslovnogPartneraCtrl",
        templateUrl: "views/poslovni_partner/izmena_poslovnog_partnera.html"
    });

    $routeProvider.when("/pregled_poslovnih_godina", {
        controller: "PregledPoslovnihGodinaCtrl",
        templateUrl: "views/poslovna_godina/pregled_poslovnih_godina.html"
    });

    $routeProvider.when("/nova_poslovna_godina", {
        controller: "KreiranjePoslovneGodineCtrl",
        templateUrl: "views/poslovna_godina/nova_poslovna_godina.html"
    });

    $routeProvider.when("/izmena_poslovne_godine/:id", {
        controller: "IzmenaPoslovneGodineCtrl",
        templateUrl: "views/poslovna_godina/izmena_poslovne_godine.html"
    });

    $routeProvider.when("/pregled_proizvoda", {
        controller: "PregledProizvodaCtrl",
        templateUrl: "views/proizvod/pregled_proizvoda.html"
    });

    $routeProvider.when("/novi_proizvod", {
        controller: "KreiranjeProizvodaCtrl",
        templateUrl: "views/proizvod/novi_proizvod.html"
    });

    $routeProvider.when("/izmena_proizvoda/:id", {
        controller: "IzmenaProizvodaCtrl",
        templateUrl: "views/proizvod/izmena_proizvoda.html"
    });

    $routeProvider.when("/pregled_faktura", {
        controller: "PregledFakturaCtrl",
        templateUrl: "views/faktura/pregled_faktura.html"
    });

    $routeProvider.when("/nova_faktura", {
        controller: "KreiranjeFaktureCtrl",
        templateUrl: "views/faktura/nova_faktura.html"
    });

    $routeProvider.when("/izmena_fakture/:id", {
        controller: "IzmenaFaktureCtrl",
        templateUrl: "views/faktura/izmena_fakture.html"
    });

    $routeProvider.when("/faktura/:id", {
        controller: "StavkeFaktureCtrl",
        templateUrl: "views/faktura/pregled_stavki_fakture.html"
    });
    
     $routeProvider.when("/pregled_narudzbenica", {
        controller: "PregledNarudzbenicaCtrl",
        templateUrl: "views/narudzbenica/pregled_narudzbenica.html"
    });

    $routeProvider.when("/nova_narudzbenica", {
        controller: "KreiranjeNarudzbeniceCtrl",
        templateUrl: "views/narudzbenica/nova_narudzbenica.html"
    });

    $routeProvider.when("/izmena_narudzbenice/:id", {
        controller: "IzmenaNarudzbeniceCtrl",
        templateUrl: "views/narudzbenica/izmena_narudzbenice.html"
    });
    
    $routeProvider.when("/narudzbenica/:id", {
        controller: "StavkeNarudzbeniceCtrl",
        templateUrl: "views/narudzbenica/pregled_stavki_narudzbenice.html"
    });
    
    $routeProvider.when("/eksport_fakture", {
        controller: "EksportFaktureCtrl",
        templateUrl: "views/faktura/eksport_fakture.html"
    });

    $routeProvider.when("/dnevnik_faktura", {
        controller: "PretragaFaktureCtrl",
        templateUrl: "views/faktura/izvestaji.html"
    });

    $routeProvider.when("/pregled_stavki_cenovnika", {
        controller: "PregledStavkiCenovnikaCtrl",
        templateUrl: "views/stavka_cenovnika/pregled_stavki_cenovnika.html"
    });

    $routeProvider.when("/nova_stavka_cenovnika", {
        controller: "KreiranjeStavkeCenovnikaCtrl",
        templateUrl: "views/stavka_cenovnika/nova_stavka_cenovnika.html"
    });

    $routeProvider.when("/izmena_stavke_cenovnika/:id", {
        controller: "IzmenaStavkeCenovnikaCtrl",
        templateUrl: "views/stavka_cenovnika/izmena_stavke_cenovnika.html"
    });

    $routeProvider.when("/pregled_stavki_fakture", {
        controller: "PregledStavkiFaktureCtrl",
        templateUrl: "views/stavka_fakture/pregled_stavki_fakture.html"
    });

    $routeProvider.when("/nova_stavka_fakture", {
        controller: "KreiranjeStavkeFaktureCtrl",
        templateUrl: "views/stavka_fakture/nova_stavka_fakture.html"
    });

    $routeProvider.when("/izmena_stavke_fakture/:id", {
        controller: "IzmenaStavkeFaktureCtrl",
        templateUrl: "views/stavka_fakture/izmena_stavke_fakture.html"
    });
    
    $routeProvider.when("/pregled_stavki_narudzbenice", {
        controller: "PregledStavkiNarudzbeniceCtrl",
        templateUrl: "views/stavka_narudzbenice/pregled_stavki_narudzbenice.html"
    });

    $routeProvider.when("/nova_stavka_narudzbenice", {
        controller: "KreiranjeStavkeNarudzbeniceCtrl",
        templateUrl: "views/stavka_narudzbenice/nova_stavka_narudzbenice.html"
    });

    $routeProvider.when("/izmena_stavke_narudzbenice/:id", {
        controller: "IzmenaStavkeNarudzbeniceCtrl",
        templateUrl: "views/stavka_narudzbenice/izmena_stavke_narudzbenice.html"
    });

    $routeProvider.when("/fakturisanje/rucno", {
        controller: "FakturisanjeRucnoCtrl",
        templateUrl: "views/faktura/fakturisanje_rucno.html"
    });

    $routeProvider.when("/fakturisanje/narudzbenica", {
        controller: "FakturisanjeNarudzbenicaCtrl",
        templateUrl: "views/faktura/fakturisanje_narudzbenica.html"
    });

});

app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});