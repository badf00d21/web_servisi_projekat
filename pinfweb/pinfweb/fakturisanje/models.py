# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin sqlcustom [app_label]'
# into your database.
from __future__ import unicode_literals

from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup)
    permission = models.ForeignKey('AuthPermission')

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group_id', 'permission_id'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType')
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type_id', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser)
    group = models.ForeignKey(AuthGroup)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user_id', 'group_id'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser)
    permission = models.ForeignKey(AuthPermission)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user_id', 'permission_id'),)


class Cenovnik(models.Model):
    id_cenovnika = models.AutoField(db_column='ID_CENOVNIKA', primary_key=True)  # Field name made lowercase.
    id_preduzeca = models.ForeignKey('Preduzece', db_column='ID_PREDUZECA')  # Field name made lowercase.
    datum_vazena = models.DateTimeField(db_column='DATUM_VAZENA', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'cenovnik'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', blank=True, null=True)
    user = models.ForeignKey(AuthUser)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Faktura(models.Model):
    id_fakture = models.AutoField(db_column='ID_FAKTURE', primary_key=True)  # Field name made lowercase.
    id_poslovnog_partnera = models.ForeignKey('PoslovniPartner', db_column='ID_POSLOVNOG_PARTNERA')  # Field name made lowercase.
    id_preduzeca = models.ForeignKey('Preduzece', db_column='ID_PREDUZECA')  # Field name made lowercase.
    id_godine = models.ForeignKey('PoslovnaGodina', db_column='ID_GODINE')  # Field name made lowercase.
    broj_fakture = models.IntegerField(db_column='BROJ_FAKTURE', blank=True, null=True)  # Field name made lowercase.
    datum_fakture = models.DateTimeField(db_column='DATUM_FAKTURE', blank=True, null=True)  # Field name made lowercase.
    datum_valute = models.DateTimeField(db_column='DATUM_VALUTE', blank=True, null=True)  # Field name made lowercase.
    ukupan_rabat = models.DecimalField(db_column='UKUPAN_RABAT', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    ukupan_iznos_bez_pdv_a = models.DecimalField(db_column='UKUPAN_IZNOS_BEZ_PDV_A', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    ukupan_pdv = models.DecimalField(db_column='UKUPAN_PDV', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    ukupno_za_placanje = models.DecimalField(db_column='UKUPNO_ZA_PLACANJE', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    status_fakture = models.CharField(db_column='STATUS_FAKTURE', max_length=30)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'faktura'


class GrupaProizvoda(models.Model):
    id_grupe = models.AutoField(db_column='ID_GRUPE', primary_key=True)  # Field name made lowercase.
    id_pdv_a = models.ForeignKey('Pdv', db_column='ID_PDV_A')  # Field name made lowercase.
    naziv_grupe = models.CharField(db_column='NAZIV_GRUPE', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'grupa_proizvoda'


class JedinicaMere(models.Model):
    id_jedinice = models.AutoField(db_column='ID_JEDINICE', primary_key=True)  # Field name made lowercase.
    naziv_jedinice_mere = models.CharField(db_column='NAZIV_JEDINICE_MERE', max_length=100, blank=True, null=True)  # Field name made lowercase.
    skracenica = models.CharField(db_column='SKRACENICA', max_length=10, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'jedinica_mere'


class Pdv(models.Model):
    naziv_pdv_a = models.CharField(db_column='NAZIV_PDV_A', max_length=50, blank=True, null=True)  # Field name made lowercase.
    id_pdv_a = models.AutoField(db_column='ID_PDV_A', primary_key=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'pdv'


class PoslovnaGodina(models.Model):
    id_godine = models.AutoField(db_column='ID_GODINE', primary_key=True)  # Field name made lowercase.
    id_preduzeca = models.ForeignKey('Preduzece', db_column='ID_PREDUZECA')  # Field name made lowercase.
    godina = models.IntegerField(db_column='GODINA', blank=True, null=True)  # Field name made lowercase.
    zakljucena = models.IntegerField(db_column='ZAKLJUCENA', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'poslovna_godina'


class PoslovniPartner(models.Model):
    vrsta = models.CharField(db_column='VRSTA', max_length=50, blank=True, null=True)  # Field name made lowercase.
    id_poslovnog_partnera = models.AutoField(db_column='ID_POSLOVNOG_PARTNERA', primary_key=True)  # Field name made lowercase.
    id_preduzeca = models.ForeignKey('Preduzece', db_column='ID_PREDUZECA')  # Field name made lowercase.
    pib = models.IntegerField(db_column='PIB')  # Field name made lowercase.
    adresa = models.CharField(db_column='ADRESA', max_length=150, blank=True, null=True)  # Field name made lowercase.
    mesto = models.CharField(db_column='MESTO', max_length=150, blank=True, null=True)  # Field name made lowercase.
    tekuci_racun = models.CharField(db_column='TEKUCI_RACUN', max_length=13)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'poslovni_partner'


class Preduzece(models.Model):
    id_preduzeca = models.AutoField(db_column='ID_PREDUZECA', primary_key=True)  # Field name made lowercase.
    nazivpreduzeca = models.CharField(db_column='NAZIVPREDUZECA', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'preduzece'


class Proizvod(models.Model):
    vrsta_proizvoda = models.CharField(db_column='VRSTA_PROIZVODA', max_length=50, blank=True, null=True)  # Field name made lowercase.
    id_proizvoda = models.AutoField(db_column='ID_PROIZVODA', primary_key=True)  # Field name made lowercase.
    id_preduzeca = models.ForeignKey(Preduzece, db_column='ID_PREDUZECA')  # Field name made lowercase.
    id_jedinice = models.ForeignKey(JedinicaMere, db_column='ID_JEDINICE')  # Field name made lowercase.
    id_grupe = models.ForeignKey(GrupaProizvoda, db_column='ID_GRUPE')  # Field name made lowercase.
    naziv_proizvoda = models.CharField(db_column='NAZIV_PROIZVODA', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proizvod'


class StavkeCenovnika(models.Model):
    cena = models.DecimalField(db_column='CENA', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    id_stavke_cenovnika = models.AutoField(db_column='ID_STAVKE_CENOVNIKA', primary_key=True)  # Field name made lowercase.
    id_cenovnika = models.ForeignKey(Cenovnik, db_column='ID_CENOVNIKA')  # Field name made lowercase.
    id_proizvoda = models.ForeignKey(Proizvod, db_column='ID_PROIZVODA')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stavke_cenovnika'


class StavkeFakture(models.Model):
    id_stavke_fakture = models.AutoField(db_column='ID_STAVKE_FAKTURE', primary_key=True)  # Field name made lowercase.
    id_proizvoda = models.ForeignKey(Proizvod, db_column='ID_PROIZVODA')  # Field name made lowercase.
    id_fakture = models.ForeignKey(Faktura, db_column='ID_FAKTURE')  # Field name made lowercase.
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


class StopaPdvA(models.Model):
    id_stope = models.AutoField(db_column='ID_STOPE', primary_key=True)  # Field name made lowercase.
    id_pdv_a = models.ForeignKey(Pdv, db_column='ID_PDV_A')  # Field name made lowercase.
    stopa = models.DecimalField(db_column='STOPA', max_digits=10, decimal_places=0, blank=True, null=True)  # Field name made lowercase.
    datum_vazenja = models.DateTimeField(db_column='DATUM_VAZENJA', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stopa_pdv_a'