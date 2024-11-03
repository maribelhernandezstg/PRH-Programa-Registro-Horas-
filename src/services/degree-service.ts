import axios from 'axios';
import { environment } from '../environment/environment';
import { Degree } from '../shared/models/degree.class';

const API_URL = environment.API_URL + '/degrees';

export const getDegrees = async (): Promise<Degree[]> => {
  try {
    const response = await axios.get<Degree[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching degrees:', error);
    throw error;
  }
};

export const getDegreeById = async (id: number): Promise<Degree> => {
  try {
    const response = await axios.get<Degree>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching degree with ID ${id}:`, error);
    throw error;
  }
};

export const createDegree = async (degree: Degree): Promise<Degree> => {
  try {
    const response = await axios.post<Degree>(`${API_URL}`, degree);
    return response.data;
  } catch (error) {
    console.error('Error creating degree:', error);
    throw error;
  }
};

export const updateDegree = async (id: number, degree: Partial<Degree>): Promise<Degree> => {
  try {
    const response = await axios.put<Degree>(`${API_URL}/${id}`, degree);
    return response.data;
  } catch (error) {
    console.error(`Error updating degree with ID ${id}:`, error);
    throw error;
  }
};

export const toggleDegreeActivation = async (id: number): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${id}`);
  } catch (error) {
    console.error(`Error toggling activation status for degree with ID ${id}:`, error);
    throw error;
  }
};
