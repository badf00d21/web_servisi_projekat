var app = angular.module('PINFWEB', ['ngRoute', 'PINFWEB_CONFIG', 'fakeApi']);

app.config(function ($routeProvider) {
 
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

});
