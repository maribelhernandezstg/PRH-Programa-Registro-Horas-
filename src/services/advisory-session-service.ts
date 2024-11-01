import axios from 'axios';
import { environment } from '../environment/environment';
import { AdvisorySession } from '../shared/models/advisory-session.interface';
const API_URL = environment.API_URL + '/advisorySessions';

const dummyAdvisorySessions: AdvisorySession[] = [
  {
    Identity: 1,
    AdvisorIdentity: 'Ricardo Alberto Grimaldo Estévez',
    AdviseeIdentity: 'Ana Isabel Gómez García',
    AdviseeStudentId: '87654321',
    LearningUnitIdentity: 'Matemáticas Avanzadas',
    Topic: 'Álgebra Lineal',
    Professor: 'Dr. Juan Pérez',
    ClassType: 'Ordinaria',
    SessionDate: new Date('2024-10-28'),
    StartTime: new Date('2024-10-28T10:00:00'),
    EndTime: new Date('2024-10-28T11:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 2,
    AdvisorIdentity: 'Laura Patricia Torres Morales',
    AdviseeIdentity: 'Carlos Eduardo Ramírez Sánchez',
    AdviseeStudentId: '12345678',
    LearningUnitIdentity: 'Cálculo Diferencial',
    Topic: 'Cálculo en varias variables',
    Professor: 'Dra. María López',
    ClassType: 'Ordinaria',
    SessionDate: new Date('2024-10-28'),
    StartTime: new Date('2024-10-28T12:00:00'),
    EndTime: new Date('2024-10-28T13:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 3,
    AdvisorIdentity: 'Mario Antonio Fernández Ríos',
    AdviseeIdentity: 'Lucía Fernanda Morales Pérez',
    AdviseeStudentId: '23456789',
    LearningUnitIdentity: 'Física General',
    Topic: 'Leyes de Newton',
    Professor: 'Dr. Carlos Martínez',
    ClassType: 'Sabatino',
    SessionDate: new Date('2024-10-28'),
    StartTime: new Date('2024-10-28T14:00:00'),
    EndTime: new Date('2024-10-28T15:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 4,
    AdvisorIdentity: 'Sofía Alejandra García Ruiz',
    AdviseeIdentity: 'Raúl Enrique Herrera Gutiérrez',
    AdviseeStudentId: '34567890',
    LearningUnitIdentity: 'Química Orgánica',
    Topic: 'Reacciones orgánicas',
    Professor: 'Dra. Ana Gutiérrez',
    ClassType: 'Sabatino',
    SessionDate: new Date('2024-10-29'),
    StartTime: new Date('2024-10-29T09:00:00'),
    EndTime: new Date('2024-10-29T10:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 5,
    AdvisorIdentity: 'Pedro José Sánchez Castillo',
    AdviseeIdentity: 'Mariana Isabel Ortiz Paredes',
    AdviseeStudentId: '45678901',
    LearningUnitIdentity: 'Introducción a la Programación',
    Topic: 'Estructuras de control',
    Professor: 'Dr. Luis Ramírez',
    ClassType: 'Ordinaria',
    SessionDate: new Date('2024-10-29'),
    StartTime: new Date('2024-10-29T11:00:00'),
    EndTime: new Date('2024-10-29T12:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 6,
    AdvisorIdentity: 'Alberto Antonio Díaz Rodríguez',
    AdviseeIdentity: 'Gabriel Eduardo Torres Mendoza',
    AdviseeStudentId: '56789012',
    LearningUnitIdentity: 'Bases de Datos',
    Topic: 'Modelo relacional',
    Professor: 'Dra. Carmen Silva',
    ClassType: 'Sabatino',
    SessionDate: new Date('2024-10-29'),
    StartTime: new Date('2024-10-29T13:00:00'),
    EndTime: new Date('2024-10-29T14:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 7,
    AdvisorIdentity: 'Verónica Alejandra Ruiz Méndez',
    AdviseeIdentity: 'Daniela Sofía Sánchez Morales',
    AdviseeStudentId: '67890123',
    LearningUnitIdentity: 'Lógica Computacional',
    Topic: 'Tablas de verdad',
    Professor: 'Dr. Enrique Hernández',
    ClassType: 'Ordinaria',
    SessionDate: new Date('2024-10-29'),
    StartTime: new Date('2024-10-29T15:00:00'),
    EndTime: new Date('2024-10-29T16:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 8,
    AdvisorIdentity: 'Hugo Felipe López Ortega',
    AdviseeIdentity: 'Ricardo Esteban Vega Fernández',
    AdviseeStudentId: '78901234',
    LearningUnitIdentity: 'Cálculo Integral',
    Topic: 'Integración por partes',
    Professor: 'Dra. María García',
    ClassType: 'Ordinaria',
    SessionDate: new Date('2024-10-30'),
    StartTime: new Date('2024-10-30T08:00:00'),
    EndTime: new Date('2024-10-30T09:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 9,
    AdvisorIdentity: 'Elena María Ríos García',
    AdviseeIdentity: 'Carla Patricia Núñez Castillo',
    AdviseeStudentId: '89012345',
    LearningUnitIdentity: 'Inteligencia Artificial',
    Topic: 'Redes neuronales',
    Professor: 'Dr. José Rivera',
    ClassType: 'Sabatino',
    SessionDate: new Date('2024-10-30'),
    StartTime: new Date('2024-10-30T10:00:00'),
    EndTime: new Date('2024-10-30T11:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Identity: 10,
    AdvisorIdentity: 'Miguel Ángel Luna Hernández',
    AdviseeIdentity: 'José Manuel Pérez Medina',
    AdviseeStudentId: '90123456',
    LearningUnitIdentity: 'Ingeniería de Software',
    Topic: 'Metodologías ágiles',
    Professor: 'Dra. Laura Martínez',
    ClassType: 'Autosugestiva',
    SessionDate: new Date('2024-10-30'),
    StartTime: new Date('2024-10-30T12:00:00'),
    EndTime: new Date('2024-10-30T13:00:00'),
    UserCreation: 1,
    CreatedAt: new Date(),
    UserUpdate: 1,
    UpdatedAt: new Date(),
    Active: true,
  },
];

export const getAllAdvisorySessions = async (): Promise<AdvisorySession[]> => {
  try {
    const response = await axios.get<AdvisorySession[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advisory sessions:', error);
    throw error;
  }
};

export const getAllAdvisorySessionsDummy = async (): Promise<AdvisorySession[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyAdvisorySessions);
    }, 1500);
  });
};

export const getAdvisorySessionById = async (sessionId: number): Promise<AdvisorySession> => {
  try {
    const response = await axios.get<AdvisorySession>(`${API_URL}/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching advisory session with ID ${sessionId}:`, error);
    throw error;
  }
};

export const createAdvisorySession = async (advisorySession: AdvisorySession): Promise<AdvisorySession> => {
  try {
    const response = await axios.post<AdvisorySession>(`${API_URL}`, advisorySession);
    return response.data;
  } catch (error) {
    console.error('Error creating advisory session:', error);
    throw error;
  }
};

export const updateAdvisorySession = async (sessionId: number, advisorySession: Partial<AdvisorySession>): Promise<AdvisorySession> => {
  try {
    const response = await axios.put<AdvisorySession>(`${API_URL}/${sessionId}`, advisorySession);
    return response.data;
  } catch (error) {
    console.error(`Error updating advisory session with ID ${sessionId}:`, error);
    throw error;
  }
};

export const toggleAdvisorySessionActivation = async (sessionId: number): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${sessionId}`);
  } catch (error) {
    console.error(`Error toggling activation status for advisory session with ID ${sessionId}:`, error);
    throw error;
  }
};

export const getAdvisorySessionsByAdvisor = async (enrollment: number): Promise<AdvisorySession[]> => {
  try {
    const response = await axios.get<AdvisorySession[]>(`${API_URL}/advisor/${enrollment}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching advisory sessions for advisor with enrollment ${enrollment}:`, error);
    throw error;
  }
};
