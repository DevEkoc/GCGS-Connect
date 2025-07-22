from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Student
from .serializers import StudentSerializer

# Create your views here.

class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows students to be viewed or edited.
    """
    queryset = Student.objects.all().order_by('-date_creation')
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated] # Seuls les utilisateurs connectés peuvent voir/éditer

    def get_queryset(self):
        """
        Optionnellement, filtre les étudiants pour ne montrer que ceux
        liés à l'utilisateur connecté, sauf si c'est un admin.
        """
        user = self.request.user
        if user.is_staff or user.role in ['ADMIN', 'PDG', 'DGA']:
            return Student.objects.all()
        return Student.objects.filter(responsable=user)
    
    def get_serializer_context(self):
        """Passe le contexte de la requête au serializer."""
        return {'request': self.request}
