import apiClient from './api';
import { Student } from './student.service';

const URL = '/parents/';

// Type pour un parent
export interface Parent {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    enfants_details?: Student[];
    [key: string]: any;
}

const getAll = (): Promise<Parent[]> => {
    return apiClient.get(URL).then(res => res.data);
}

const getById = (id: string): Promise<Parent> => {
    return apiClient.get(`${URL}${id}/`).then(res => res.data);
}

const create = (data: Partial<Parent>): Promise<Parent> => {
    return apiClient.post(URL, data).then(res => res.data);
}

const update = (id: string, data: Partial<Parent>): Promise<Parent> => {
    return apiClient.put(`${URL}${id}/`, data).then(res => res.data);
}

const remove = (id: string): Promise<void> => {
    return apiClient.delete(`${URL}${id}/`).then(res => res.data);
}

const parentService = {
    getAll,
    getById,
    create,
    update,
    remove
};

export default parentService; 