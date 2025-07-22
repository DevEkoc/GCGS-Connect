from rest_framework import serializers
from .models import Student
from schools.models import School, Level
from django.contrib.auth import get_user_model

# Serializer simple pour l'affichage de l'utilisateur responsable
class UserDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'prenom', 'nom', 'email']

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    school_details = SchoolSerializer(source='school', read_only=True)
    level_details = LevelSerializer(source='level', read_only=True)
    responsable_details = UserDisplaySerializer(source='responsable', read_only=True)

    class Meta:
        model = Student
        fields = [
            'id', 'nom', 'prenom', 'date_naissance', 'adresse', 'telephone',
            'email', 'date_creation', 
            'responsable', 'responsable_details',
            'school', 'school_details',
            'level', 'level_details'
        ]
        read_only_fields = ('id', 'date_creation')
        
        extra_kwargs = {
            'responsable': {'write_only': True},
            'school': {'write_only': True, 'required': False, 'allow_null': True},
            'level': {'write_only': True, 'required': False, 'allow_null': True},
        }

    def create(self, validated_data):
        # Assigner le responsable automatiquement à l'utilisateur connecté si non fourni
        if 'responsable' not in validated_data:
            validated_data['responsable'] = self.context['request'].user
        return super().create(validated_data) 