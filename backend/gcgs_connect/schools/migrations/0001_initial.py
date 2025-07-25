# Generated by Django 5.2.4 on 2025-07-22 19:18

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Niveau / Classe',
                'verbose_name_plural': 'Niveaux / Classes',
                'ordering': ['nom'],
            },
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=255, unique=True)),
                ('adresse', models.TextField(blank=True)),
                ('date_collecte_info', models.DateField(blank=True, null=True)),
                ('date_saisie', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Établissement',
                'verbose_name_plural': 'Établissements',
                'ordering': ['nom'],
            },
        ),
    ]
