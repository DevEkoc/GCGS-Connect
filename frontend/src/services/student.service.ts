import apiClient from './api';

const URL = '/students/';

// Interface pour les détails imbriqués
interface SchoolDetails { id: string; nom: string; }
interface LevelDetails { id: string; nom: string; }
interface ResponsableDetails { id: string; prenom: string; nom: string; }

// Type pour un étudiant
export interface Student {
    id: string;
    nom: string;
    prenom: string;
    email?: string;
    school_details?: SchoolDetails;
    level_details?: LevelDetails;
    responsable_details?: ResponsableDetails;
    [key: string]: any;
}

const getAll = (): Promise<Student[]> => {
    return apiClient.get(URL).then(res => res.data);
}

const getById = (id: string): Promise<Student> => {
    return apiClient.get(`${URL}${id}/`).then(res => res.data);
}

const create = (data: Partial<Student>): Promise<Student> => {
    return apiClient.post(URL, data).then(res => res.data);
}

const update = (id: string, data: Partial<Student>): Promise<Student> => {
    return apiClient.put(`${URL}${id}/`, data).then(res => res.data);
}

const remove = (id: string): Promise<void> => {
    return apiClient.delete(`${URL}${id}/`).then(res => res.data);
}

const studentService = {
    getAll,
    getById,
    create,
    update,
    remove
};

export default studentService; 