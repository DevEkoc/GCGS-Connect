from django.db import models
import uuid
from django.conf import settings
from students.models import Student

class Parent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    profession = models.CharField(max_length=100, blank=True)
    adresse = models.TextField()
    telephone = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    # Un parent est également suivi par un utilisateur
    responsable = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='parents_suivis'
    )

    # Un parent peut être lié à plusieurs étudiants
    enfants = models.ManyToManyField(
        Student,
        related_name='parents',
        blank=True
    )

    def __str__(self):
        return f"{self.prenom} {self.nom}"

    class Meta:
        verbose_name = "Parent"
        verbose_name_plural = "Parents"
        ordering = ['nom', 'prenom']
