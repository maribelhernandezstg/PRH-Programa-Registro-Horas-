import axios from 'axios';
import { environment } from '../environment/environment';
import { User } from '../shared/models/user.interface';

const API_URL = environment.API_URL + '/users';

const dummyUsers: User[] = [
  {
    Enrollment: 197215,
    Name: 'Edson Eduardo González Martínez',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 121212,
    Name: 'Kevin Alejandro Sánchez López',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 201234,
    Name: 'María Fernanda López Rodríguez',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 198765,
    Name: 'Juan Carlos Pérez Jiménez',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 202345,
    Name: 'Claudia Patricia Fernández Ruiz',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: false,
  },
  {
    Enrollment: 199876,
    Name: 'Luis Enrique Torres Morales',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 207654,
    Name: 'Ana Isabel Martínez Paredes',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: false,
  },
  {
    Enrollment: 210987,
    Name: 'Daniel Antonio Ramírez Castillo',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: false,
  },
  {
    Enrollment: 215432,
    Name: 'Sofia Gabriela González Méndez',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 205678,
    Name: 'Pedro José Hernández Ortega',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: true,
  },
  {
    Enrollment: 218765,
    Name: 'Laura Alejandra Silva Gutiérrez',
    Password: '',
    Type: 1,
    UserCreation: 0,
    CreatedAt: new Date(),
    UserUpdate: 0,
    UpdatedAt: new Date(),
    Active: false,
  },
];

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getAllUsersDummy = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyUsers);
    }, 1500);
  });
};

export const logIn = async (enrollment: number, password: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/login`, {
      enrollment,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (user: User): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const updateUser = async (enrollment: number, user: Partial<User>): Promise<User> => {
  try {
    const response = await axios.put<User>(`${API_URL}/${enrollment}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with enrollment ${enrollment}:`, error);
    throw error;
  }
};

export const toggleUserActivation = async (enrollment: number): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${enrollment}`);
  } catch (error) {
    console.error(`Error toggling activation status for user with enrollment ${enrollment}:`, error);
    throw error;
  }
};
