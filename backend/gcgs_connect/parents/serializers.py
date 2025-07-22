from rest_framework import serializers
from .models import Parent
from students.serializers import StudentSerializer

class ParentSerializer(serializers.ModelSerializer):
    # Afficher les détails des enfants, en lecture seule pour éviter les écritures imbriquées complexes
    enfants_details = StudentSerializer(source='enfants', many=True, read_only=True)

    class Meta:
        model = Parent
        fields = [
            'id', 'nom', 'prenom', 'profession', 'adresse', 'telephone', 'email',
            'date_creation', 'responsable', 'enfants', 'enfants_details'
        ]
        read_only_fields = ('id', 'date_creation')
        
        # 'enfants' est utilisé pour l'écriture (liaison par ID), 'enfants_details' pour la lecture
        extra_kwargs = {
            'enfants': {'write_only': True, 'required': False}
        } 