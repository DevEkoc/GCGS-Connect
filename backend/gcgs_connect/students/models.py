from django.db import models
import uuid
from django.conf import settings

class Student(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    adresse = models.TextField()
    telephone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    niveau_etudes = models.CharField(max_length=100)
    date_creation = models.DateTimeField(auto_now_add=True)
    
    # Un étudiant est suivi par un utilisateur (télémarketeur, admin, etc.)
    responsable = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='students_suivis'
    )

    def __str__(self):
        return f"{self.prenom} {self.nom}"

    class Meta:
        verbose_name = "Étudiant"
        verbose_name_plural = "Étudiants"
        ordering = ['nom', 'prenom']
