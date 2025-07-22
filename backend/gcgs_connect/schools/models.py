from django.db import models
import uuid

class School(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=255, unique=True)
    adresse = models.TextField(blank=True)
    date_collecte_info = models.DateField(null=True, blank=True)
    date_saisie = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

    class Meta:
        verbose_name = "Établissement"
        verbose_name_plural = "Établissements"
        ordering = ['nom']

class Level(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nom
    
    class Meta:
        verbose_name = "Niveau / Classe"
        verbose_name_plural = "Niveaux / Classes"
        ordering = ['nom']
