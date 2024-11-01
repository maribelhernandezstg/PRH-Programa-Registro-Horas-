import axios from 'axios';
import { environment } from '../environment/environment';
import { Advisor } from '../shared/models/advisor.interface';

const API_URL = environment.API_URL + '/advisors';

const dummyAdvisors: Advisor[] = [
  {
    Enrollment: 197215,
    Gender: 'Masculino',
    Name: 'Edson Eduardo Martínez González',
    DegreeIdentity: 'LMAD',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 121212,
    Gender: 'Masculino',
    Name: 'Kevin Alejandro Sánchez Rodríguez',
    DegreeIdentity: 'LMAD',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 201234,
    Gender: 'Femenino',
    Name: 'María Fernanda López Ramírez',
    DegreeIdentity: 'LMAD',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 198765,
    Gender: 'Masculino',
    Name: 'Juan Carlos Pérez Hernández',
    DegreeIdentity: 'LSTI',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 202345,
    Gender: 'Femenino',
    Name: 'Claudia Alejandra Fernández Martínez',
    DegreeIdentity: 'LM',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 199876,
    Gender: 'Masculino',
    Name: 'Luis Alberto Torres Gutiérrez',
    DegreeIdentity: 'LF',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 207654,
    Gender: 'Femenino',
    Name: 'Ana Sofía Martínez López',
    DegreeIdentity: 'LM',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 210987,
    Gender: 'Masculino',
    Name: 'Daniel Antonio Ramírez Sánchez',
    DegreeIdentity: 'LSTI',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 215432,
    Gender: 'Femenino',
    Name: 'Sofia Guadalupe González Morales',
    DegreeIdentity: 'LA',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 205678,
    Gender: 'Masculino',
    Name: 'Pedro Luis Hernández Navarro',
    DegreeIdentity: 'LF',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 218765,
    Gender: 'Femenino',
    Name: 'Laura Beatriz Silva Fernández',
    DegreeIdentity: 'LM',
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
];

export const getAllAdvisors = async (): Promise<Advisor[]> => {
  try {
    const response = await axios.get<Advisor[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advisors:', error);
    throw error;
  }
};

export const getAllAdvisorsDummy = async (): Promise<Advisor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyAdvisors);
    }, 1500);
  });
};

export const getAdvisorByEnrollment = async (enrollment: number): Promise<Advisor> => {
  try {
    const response = await axios.get<Advisor>(`${API_URL}/${enrollment}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching advisor with enrollment ${enrollment}:`, error);
    throw error;
  }
};

export const createAdvisor = async (advisor: Advisor): Promise<Advisor> => {
  try {
    const response = await axios.post<Advisor>(`${API_URL}`, advisor);
    return response.data;
  } catch (error) {
    console.error('Error creating advisor:', error);
    throw error;
  }
};

export const updateAdvisor = async (enrollment: number, advisor: Partial<Advisor>): Promise<Advisor> => {
  try {
    const response = await axios.put<Advisor>(`${API_URL}/${enrollment}`, advisor);
    return response.data;
  } catch (error) {
    console.error(`Error updating advisor with enrollment ${enrollment}:`, error);
    throw error;
  }
};

export const toggleAdvisorActivation = async (enrollment: number): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${enrollment}`);
  } catch (error) {
    console.error(`Error toggling activation status for advisor with enrollment ${enrollment}:`, error);
    throw error;
  }
};
