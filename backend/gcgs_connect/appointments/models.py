from django.db import models
import uuid
from django.conf import settings
from students.models import Student
from parents.models import Parent

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('PLANNED', 'Planifié'),
        ('COMPLETED', 'Terminé'),
        ('CANCELLED', 'Annulé'),
        ('POSTPONED', 'Reporté'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titre = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date_heure_debut = models.DateTimeField()
    date_heure_fin = models.DateTimeField()
    statut = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PLANNED')
    lieu = models.CharField(max_length=255, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    # Le rendez-vous est créé et géré par un utilisateur
    organisateur = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='appointments_organises'
    )

    # Les participants peuvent être des étudiants et/ou des parents
    participants_students = models.ManyToManyField(
        Student,
        related_name='appointments',
        blank=True
    )
    participants_parents = models.ManyToManyField(
        Parent,
        related_name='appointments',
        blank=True
    )

    def __str__(self):
        return f"RDV: {self.titre} - {self.date_heure_debut.strftime('%d/%m/%Y %H:%M')}"

    class Meta:
        verbose_name = "Rendez-vous"
        verbose_name_plural = "Rendez-vous"
        ordering = ['-date_heure_debut']
