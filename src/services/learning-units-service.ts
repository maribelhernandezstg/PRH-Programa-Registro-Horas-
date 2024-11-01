import axios from 'axios';
import { environment } from '../environment/environment';
import { LearningUnit } from '../shared/models/learning-unit.interface';

const API_URL = environment.API_URL + '/learningUnits';

export const getAllLearningUnits = async (): Promise<LearningUnit[]> => {
  try {
    const response = await axios.get<LearningUnit[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching learning units:', error);
    throw error;
  }
};

export const getLearningUnitById = async (id: number): Promise<LearningUnit> => {
  try {
    const response = await axios.get<LearningUnit>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching learning unit with ID ${id}:`, error);
    throw error;
  }
};

export const createLearningUnit = async (learningUnit: LearningUnit): Promise<LearningUnit> => {
  try {
    const response = await axios.post<LearningUnit>(`${API_URL}`, learningUnit);
    return response.data;
  } catch (error) {
    console.error('Error creating learning unit:', error);
    throw error;
  }
};

export const updateLearningUnit = async (id: number, learningUnit: Partial<LearningUnit>): Promise<LearningUnit> => {
  try {
    const response = await axios.put<LearningUnit>(`${API_URL}/${id}`, learningUnit);
    return response.data;
  } catch (error) {
    console.error(`Error updating learning unit with ID ${id}:`, error);
    throw error;
  }
};

export const toggleLearningUnitActivation = async (id: number): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${id}`);
  } catch (error) {
    console.error(`Error toggling activation status for learning unit with ID ${id}:`, error);
    throw error;
  }
};
