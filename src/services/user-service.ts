import axios from 'axios';
import { User } from '../shared/models/user.interface';

const API_URL = process.env.API_URL + '/users';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const logIn = async (
  enrollment: number,
  password: string
): Promise<User> => {
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

export const updateUser = async (
  enrollment: number,
  user: Partial<User>
): Promise<User> => {
  try {
    const response = await axios.put<User>(`${API_URL}/${enrollment}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with enrollment ${enrollment}:`, error);
    throw error;
  }
};

export const toggleUserActivation = async (
  enrollment: number
): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${enrollment}`);
  } catch (error) {
    console.error(
      `Error toggling activation status for user with enrollment ${enrollment}:`,
      error
    );
    throw error;
  }
};
