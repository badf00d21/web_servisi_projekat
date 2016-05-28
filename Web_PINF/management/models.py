# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Cenovnik(models.Model):
    id_cenovnika = models.IntegerField(db_column='ID_CENOVNIKA', primary_key=True)  # Field name made lowercase.
    idpreduzeca = models.ForeignKey('Preduzece', models.DO_NOTHING, db_column='IDPREDUZECA')  # Field name made lowercase.
    datum_vazena = models.DateTimeField(db_column='DATUM_VAZENA', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'cenovnik'


class Faktura(models.Model):
    id_fakture = models.IntegerField(db_column='ID_FAKTURE', primary_key=True)  # Field name made lowercase.
    id_poslovnog_partnera = models.ForeignKey('PoslovniPartner', models.DO_NOTHING, db_column='ID_POSLOVNOG_PARTNERA')  # Field name made lowercase.
    idpreduzeca = models.ForeignKey('Preduzece', models.DO_NOTHING, db_column='IDPREDUZECA')  # Field name made lowercase.
    id_godine = models.ForeignKey('PoslovnaGodina', models.DO_NOTHING, db_column='ID_GODINE')  # Field name made lowercase.
    broj_fakture = models.IntegerField(db_column='BROJ_FAKTURE', blank=True, null=True)  # Field name made lowercase.
    datum_fakture = models.DateTimeField(db_column='DATUM_FAKTURE', blank=True, null=True)  # Field name made lowercase.
    datum_valute = models.DateTimeField(db_column='DATUM_VALUTE', blank=True, null=True)  # Field name made lowercase.
    ukupan_rabat = models.DecimalField(db_column='UKUPAN_RABAT', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    ukupan_iznos_bez_pdv_a = models.DecimalField(db_column='UKUPAN_IZNOS_BEZ_PDV_A', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    ukupan_pdv = models.DecimalField(db_column='UKUPAN_PDV', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    ukupno_za_placanje = models.DecimalField(db_column='UKUPNO_ZA_PLACANJE', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'faktura'


class GrupaProizvoda(models.Model):
    id_grupe = models.IntegerField(db_column='ID_GRUPE', primary_key=True)  # Field name made lowercase.
    id_pdv_a = models.ForeignKey('Pdv', models.DO_NOTHING, db_column='ID_PDV_A')  # Field name made lowercase.
    naziv_grupe = models.CharField(db_column='NAZIV_GRUPE', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'grupa_proizvoda'

    def __str__(self):
        return self.naziv_grupe + "(" + str(self.id_grupe) + ")"


class JedinicaMere(models.Model):
    id_jedinice = models.IntegerField(db_column='ID_JEDINICE', primary_key=True)  # Field name made lowercase.
    naziv_jedinice_mere = models.CharField(db_column='NAZIV_JEDINICE_MERE', max_length=100, blank=True, null=True)  # Field name made lowercase.
    skracenica = models.CharField(db_column='SKRACENICA', max_length=10, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'jedinica_mere'

    def __str__(self):
        return self.naziv_jedinice_mere + "(" + str(self.id_jedinice) + ")"


class Pdv(models.Model):
    naziv_pdv_a = models.CharField(db_column='NAZIV_PDV_A', max_length=50, blank=True, null=True)  # Field name made lowercase.
    id_pdv_a = models.IntegerField(db_column='ID_PDV_A', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'pdv'


class PoslovnaGodina(models.Model):
    id_godine = models.IntegerField(db_column='ID_GODINE', primary_key=True)  # Field name made lowercase.
    idpreduzeca = models.ForeignKey('Preduzece', models.DO_NOTHING, db_column='IDPREDUZECA')  # Field name made lowercase.
    godina = models.IntegerField(db_column='GODINA', blank=True, null=True)  # Field name made lowercase.
    zakljucena_field = models.IntegerField(db_column='ZAKLJUCENA_', blank=True, null=True)  # Field name made lowercase. Field renamed because it ended with '_'.

    class Meta:
        managed = False
        db_table = 'poslovna_godina'


class PoslovniPartner(models.Model):
    vrsta = models.CharField(db_column='VRSTA', max_length=50, blank=True, null=True)  # Field name made lowercase.
    id_poslovnog_partnera = models.IntegerField(db_column='ID_POSLOVNOG_PARTNERA', primary_key=True)  # Field name made lowercase.
    idpreduzeca = models.ForeignKey('Preduzece', models.DO_NOTHING, db_column='IDPREDUZECA')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'poslovni_partner'


class Preduzece(models.Model):
    idpreduzeca = models.IntegerField(db_column='IDPREDUZECA', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'preduzece'

    def __str__(self):
        return str(self.idpreduzeca)


class Proizvod(models.Model):
    vrsta_proizvoda = models.CharField(db_column='VRSTA_PROIZVODA', max_length=50, blank=True, null=True)  # Field name made lowercase.
    id_proizvoda = models.IntegerField(db_column='ID_PROIZVODA', primary_key=True)  # Field name made lowercase.
    idpreduzeca = models.ForeignKey(Preduzece, models.DO_NOTHING, db_column='IDPREDUZECA')  # Field name made lowercase.
    id_jedinice = models.ForeignKey(JedinicaMere, models.DO_NOTHING, db_column='ID_JEDINICE')  # Field name made lowercase.
    id_grupe = models.ForeignKey(GrupaProizvoda, models.DO_NOTHING, db_column='ID_GRUPE', blank=True, null=True)  # Field name made lowercase.
    naziv_proizvoda = models.CharField(db_column='NAZIV_PROIZVODA', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proizvod'

    def __str__(self):
        return "id:" + str(self.id_proizvoda) + " naziv: " + self.naziv_proizvoda




class StavkeCenovnika(models.Model):
    id_cenovnika = models.ForeignKey(Cenovnik, models.DO_NOTHING, db_column='ID_CENOVNIKA')  # Field name made lowercase.
    idstavke = models.IntegerField(db_column='IDSTAVKE')  # Field name made lowercase.
    cena = models.DecimalField(db_column='CENA', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    id_proizvoda = models.ForeignKey(Proizvod, models.DO_NOTHING, db_column='ID_PROIZVODA')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stavke_cenovnika'
        unique_together = (('id_cenovnika', 'idstavke'),)


class StavkeFakture(models.Model):
    id_fakture = models.ForeignKey(Faktura, models.DO_NOTHING, db_column='ID_FAKTURE')  # Field name made lowercase.
    rbrstavke = models.IntegerField(db_column='RBRSTAVKE')  # Field name made lowercase.
    id_proizvoda = models.ForeignKey(Proizvod, models.DO_NOTHING, db_column='ID_PROIZVODA')  # Field name made lowercase.
    kolicina = models.DecimalField(db_column='KOLICINA', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    rabat = models.DecimalField(db_column='RABAT', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    jedinicna_cena = models.DecimalField(db_column='JEDINICNA_CENA', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    stopa_pdv_a = models.DecimalField(db_column='STOPA_PDV_A', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    osnovica = models.DecimalField(db_column='OSNOVICA', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    iznos_pdv_a = models.DecimalField(db_column='IZNOS_PDV_A', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    ukupan_iznos = models.DecimalField(db_column='UKUPAN_IZNOS', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stavke_fakture'
        unique_together = (('id_fakture', 'rbrstavke'),)


class StopaPdvA(models.Model):
    id_stope = models.IntegerField(db_column='ID_STOPE', primary_key=True)  # Field name made lowercase.
    id_pdv_a = models.ForeignKey(Pdv, models.DO_NOTHING, db_column='ID_PDV_A')  # Field name made lowercase.
    stopa = models.DecimalField(db_column='STOPA', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    datum_vazenja = models.DateTimeField(db_column='DATUM_VAZENJA', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stopa_pdv_a'
