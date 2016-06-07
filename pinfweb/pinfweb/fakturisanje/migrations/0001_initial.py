# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cenovnik',
            fields=[
                ('id_cenovnika', models.AutoField(serialize=False, primary_key=True, db_column='ID_CENOVNIKA')),
                ('datum_vazena', models.DateTimeField(null=True, db_column='DATUM_VAZENA', blank=True)),
            ],
            options={
                'db_table': 'cenovnik',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Faktura',
            fields=[
                ('id_fakture', models.AutoField(serialize=False, primary_key=True, db_column='ID_FAKTURE')),
                ('broj_fakture', models.IntegerField(null=True, db_column='BROJ_FAKTURE', blank=True)),
                ('datum_fakture', models.DateTimeField(null=True, db_column='DATUM_FAKTURE', blank=True)),
                ('datum_valute', models.DateTimeField(null=True, db_column='DATUM_VALUTE', blank=True)),
                ('ukupan_rabat', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='UKUPAN_RABAT', blank=True)),
                ('ukupan_iznos_bez_pdv_a', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='UKUPAN_IZNOS_BEZ_PDV_A', blank=True)),
                ('ukupan_pdv', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='UKUPAN_PDV', blank=True)),
                ('ukupno_za_placanje', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='UKUPNO_ZA_PLACANJE', blank=True)),
                ('status_fakture', models.CharField(max_length=30, db_column='STATUS_FAKTURE')),
            ],
            options={
                'db_table': 'faktura',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='GrupaProizvoda',
            fields=[
                ('id_grupe', models.AutoField(serialize=False, primary_key=True, db_column='ID_GRUPE')),
                ('naziv_grupe', models.CharField(max_length=100, null=True, db_column='NAZIV_GRUPE', blank=True)),
            ],
            options={
                'db_table': 'grupa_proizvoda',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='JedinicaMere',
            fields=[
                ('id_jedinice', models.AutoField(serialize=False, primary_key=True, db_column='ID_JEDINICE')),
                ('naziv_jedinice_mere', models.CharField(max_length=100, null=True, db_column='NAZIV_JEDINICE_MERE', blank=True)),
                ('skracenica', models.CharField(max_length=10, null=True, db_column='SKRACENICA', blank=True)),
            ],
            options={
                'db_table': 'jedinica_mere',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Pdv',
            fields=[
                ('naziv_pdv_a', models.CharField(max_length=50, null=True, db_column='NAZIV_PDV_A', blank=True)),
                ('id_pdv_a', models.AutoField(serialize=False, primary_key=True, db_column='ID_PDV_A')),
            ],
            options={
                'db_table': 'pdv',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PoslovnaGodina',
            fields=[
                ('id_godine', models.AutoField(serialize=False, primary_key=True, db_column='ID_GODINE')),
                ('godina', models.IntegerField(null=True, db_column='GODINA', blank=True)),
                ('zakljucena', models.IntegerField(null=True, db_column='ZAKLJUCENA', blank=True)),
            ],
            options={
                'db_table': 'poslovna_godina',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PoslovniPartner',
            fields=[
                ('vrsta', models.CharField(max_length=50, null=True, db_column='VRSTA', blank=True)),
                ('id_poslovnog_partnera', models.AutoField(serialize=False, primary_key=True, db_column='ID_POSLOVNOG_PARTNERA')),
                ('pib', models.IntegerField(db_column='PIB')),
                ('adresa', models.CharField(max_length=150, null=True, db_column='ADRESA', blank=True)),
                ('mesto', models.CharField(max_length=150, null=True, db_column='MESTO', blank=True)),
                ('tekuci_racun', models.CharField(max_length=13, db_column='TEKUCI_RACUN')),
            ],
            options={
                'db_table': 'poslovni_partner',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Preduzece',
            fields=[
                ('id_preduzeca', models.AutoField(serialize=False, primary_key=True, db_column='ID_PREDUZECA')),
                ('nazivpreduzeca', models.CharField(max_length=100, db_column='NAZIVPREDUZECA')),
            ],
            options={
                'db_table': 'preduzece',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Proizvod',
            fields=[
                ('vrsta_proizvoda', models.CharField(max_length=50, null=True, db_column='VRSTA_PROIZVODA', blank=True)),
                ('id_proizvoda', models.AutoField(serialize=False, primary_key=True, db_column='ID_PROIZVODA')),
                ('naziv_proizvoda', models.CharField(max_length=50, null=True, db_column='NAZIV_PROIZVODA', blank=True)),
            ],
            options={
                'db_table': 'proizvod',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='StavkeCenovnika',
            fields=[
                ('cena', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='CENA', blank=True)),
                ('id_stavke_cenovnika', models.AutoField(serialize=False, primary_key=True, db_column='ID_STAVKE_CENOVNIKA')),
            ],
            options={
                'db_table': 'stavke_cenovnika',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='StavkeFakture',
            fields=[
                ('id_stavke_fakture', models.AutoField(serialize=False, primary_key=True, db_column='ID_STAVKE_FAKTURE')),
                ('kolicina', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='KOLICINA', blank=True)),
                ('rabat', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='RABAT', blank=True)),
                ('jedinicna_cena', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='JEDINICNA_CENA', blank=True)),
                ('stopa_pdv_a', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='STOPA_PDV_A', blank=True)),
                ('osnovica', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='OSNOVICA', blank=True)),
                ('iznos_pdv_a', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='IZNOS_PDV_A', blank=True)),
                ('ukupan_iznos', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='UKUPAN_IZNOS', blank=True)),
            ],
            options={
                'db_table': 'stavke_fakture',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='StopaPdvA',
            fields=[
                ('id_stope', models.AutoField(serialize=False, primary_key=True, db_column='ID_STOPE')),
                ('stopa', models.DecimalField(null=True, decimal_places=0, max_digits=10, db_column='STOPA', blank=True)),
                ('datum_vazenja', models.DateTimeField(null=True, db_column='DATUM_VAZENJA', blank=True)),
            ],
            options={
                'db_table': 'stopa_pdv_a',
                'managed': False,
            },
        ),
    ]
