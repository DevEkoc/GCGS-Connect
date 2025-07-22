from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Appointment
from .serializers import AppointmentSerializer
from django.db.models import Q

# Create your views here.

class AppointmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows appointments to be viewed or edited.
    """
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Retourne les rendez-vous pertinents pour l'utilisateur connecté.
        - Un admin/super-utilisateur voit tout.
        - Un utilisateur normal voit :
          - les RDV qu'il a organisés.
          - les RDV où l'un de ses étudiants suivis participe.
          - les RDV où l'un de ses parents suivis participe.
        """
        user = self.request.user
        if user.is_staff or user.role in ['ADMIN', 'PDG', 'DGA']:
            return Appointment.objects.all()
        
        # Filtres pour les utilisateurs standards
        organises_par_user = Q(organisateur=user)
        impliquant_students_user = Q(participants_students__responsable=user)
        impliquant_parents_user = Q(participants_parents__responsable=user)

        return Appointment.objects.filter(
            organises_par_user | impliquant_students_user | impliquant_parents_user
        ).distinct()
    
    def get_serializer_context(self):
        """
        Passe le contexte de la requête au serializer.
        Nécessaire pour que le serializer ait accès à `request.user` lors de la création.
        """
        return {'request': self.request}
