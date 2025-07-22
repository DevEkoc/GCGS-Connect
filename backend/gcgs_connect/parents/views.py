from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Parent
from .serializers import ParentSerializer

# Create your views here.

class ParentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows parents to be viewed or edited.
    """
    queryset = Parent.objects.all().order_by('-date_creation')
    serializer_class = ParentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filtre les parents pour ne montrer que ceux
        liés à l'utilisateur connecté, sauf si admin.
        """
        user = self.request.user
        if user.is_staff or user.role in ['ADMIN', 'PDG', 'DGA']:
            return Parent.objects.all()
        return Parent.objects.filter(responsable=user)
