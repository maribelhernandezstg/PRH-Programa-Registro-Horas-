import axios from 'axios';
import { environment } from '../environment/environment';
import { Advisee } from '../shared/models/advisee.interface';
const API_URL = environment.API_URL + '/advisees';

const dummyAdvisees: Advisee[] = [
  {
    Enrollment: 197215,
    Gender: 'Masculino',
    Name: 'Edson Eduardo Salazar Muñoz',
    DegreeIdentity: 'LMAD',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 121212,
    Gender: 'Masculino',
    Name: 'Kevin Leonardo Sánchez Ortega',
    DegreeIdentity: 'LMAD',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 193456,
    Gender: 'Femenino',
    Name: 'María Teresa López Castillo',
    DegreeIdentity: 'LSTI',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 189874,
    Gender: 'Masculino',
    Name: 'Juan Manuel Pérez Torres',
    DegreeIdentity: 'LMAD',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 204567,
    Gender: 'Femenino',
    Name: 'Carla Alejandra Mendoza Ruiz',
    DegreeIdentity: 'LCC',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 176543,
    Gender: 'Masculino',
    Name: 'Luis Fernando Torres Medina',
    DegreeIdentity: 'LCC',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 215678,
    Gender: 'Femenino',
    Name: 'Ana María González Díaz',
    DegreeIdentity: 'LF',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 198765,
    Gender: 'Masculino',
    Name: 'Daniel Alejandro Ramírez Jiménez',
    DegreeIdentity: 'LM',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 193535,
    Gender: 'Masculino',
    Name: 'Isaac Espinoza Morales',
    DegreeIdentity: 'LM',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 213456,
    Gender: 'Femenino',
    Name: 'Sofía Isabel Martínez Paredes',
    DegreeIdentity: 'LA',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 175432,
    Gender: 'Masculino',
    Name: 'Pedro Antonio Hernández López',
    DegreeIdentity: 'LM',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 209876,
    Gender: 'Femenino',
    Name: 'Laura Patricia Silva Romero',
    DegreeIdentity: 'LF',
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
];

export const getAllAdvisees = async (): Promise<Advisee[]> => {
  try {
    const response = await axios.get<Advisee[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advisees:', error);
    throw error;
  }
};

export const getAllAdviseesDummy = async (): Promise<Advisee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyAdvisees);
    }, 1500);
  });
};

export const getAdviseeById = async (enrollment: number): Promise<Advisee> => {
  try {
    const response = await axios.get<Advisee>(`${API_URL}/${enrollment}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching advisee with enrollment ${enrollment}:`, error);
    throw error;
  }
};

export const createAdvisee = async (advisee: Advisee): Promise<Advisee> => {
  try {
    const response = await axios.post<Advisee>(`${API_URL}`, advisee);
    return response.data;
  } catch (error) {
    console.error('Error creating advisee:', error);
    throw error;
  }
};

export const updateAdvisee = async (enrollment: number, advisee: Partial<Advisee>): Promise<Advisee> => {
  try {
    const response = await axios.put<Advisee>(`${API_URL}/${enrollment}`, advisee);
    return response.data;
  } catch (error) {
    console.error(`Error updating advisee with enrollment ${enrollment}:`, error);
    throw error;
  }
};

export const toggleAdviseeActivation = async (enrollment: number): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${enrollment}`);
  } catch (error) {
    console.error(`Error toggling activation status for advisee with enrollment ${enrollment}:`, error);
    throw error;
  }
};
