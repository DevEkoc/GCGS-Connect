import apiClient from './api';
import { Student } from './student.service';
import { Parent } from './parent.service';
import { User } from '../contexts/AuthContext'; // En supposant que le type User est exporté depuis AuthContext

const URL = '/appointments/';

// Type pour un rendez-vous
export interface Appointment {
    id: string;
    titre: string;
    description?: string;
    date_heure_debut: string;
    date_heure_fin: string;
    statut: 'PLANNED' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';
    organisateur_details?: User;
    students_details?: Student[];
    parents_details?: Parent[];
    [key: string]: any;
}

const getAll = (): Promise<Appointment[]> => {
    return apiClient.get(URL).then(res => res.data);
}

const getById = (id: string): Promise<Appointment> => {
    return apiClient.get(`${URL}${id}/`).then(res => res.data);
}

const create = (data: Partial<Appointment>): Promise<Appointment> => {
    return apiClient.post(URL, data).then(res => res.data);
}

const update = (id: string, data: Partial<Appointment>): Promise<Appointment> => {
    return apiClient.put(`${URL}${id}/`, data).then(res => res.data);
}

const remove = (id: string): Promise<void> => {
    return apiClient.delete(`${URL}${id}/`).then(res => res.data);
}

const appointmentService = {
    getAll,
    getById,
    create,
    update,
    remove
};

export default appointmentService; 