from rest_framework import serializers
from .models import Appointment
from users.serializers import UserSerializer
from students.serializers import StudentSerializer
from parents.serializers import ParentSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    # Sérialiseurs imbriqués pour la lecture des détails
    organisateur_details = UserSerializer(source='organisateur', read_only=True)
    students_details = StudentSerializer(source='participants_students', many=True, read_only=True)
    parents_details = ParentSerializer(source='participants_parents', many=True, read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'titre', 'description', 'date_heure_debut', 'date_heure_fin', 
            'statut', 'lieu', 'date_creation',
            'organisateur', 'organisateur_details',
            'participants_students', 'students_details',
            'participants_parents', 'parents_details'
        ]
        read_only_fields = ('id', 'date_creation')

        # Les champs relationnels sont en écriture seule par ID
        extra_kwargs = {
            'organisateur': {'write_only': True},
            'participants_students': {'write_only': True, 'required': False},
            'participants_parents': {'write_only': True, 'required': False},
        }

    def create(self, validated_data):
        # Assigner l'organisateur automatiquement à l'utilisateur connecté lors de la création
        validated_data['organisateur'] = self.context['request'].user
        return super().create(validated_data) 