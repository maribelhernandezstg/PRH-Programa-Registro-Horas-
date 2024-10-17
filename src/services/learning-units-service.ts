import axios from 'axios';
import { LearningUnit } from '../shared/models/learning-unit.interface';

const API_URL = process.env.API_URL + '/learning-units';

export const getLearningUnits = async (): Promise<LearningUnit[]> => {
  try {
    const response = await axios.get<LearningUnit[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching learning units:', error);
    throw error;
  }
};

export const getLearningUnitById = async (
  id: number
): Promise<LearningUnit> => {
  try {
    const response = await axios.get<LearningUnit>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching learning unit with id ${id}:`, error);
    throw error;
  }
};

export const createLearningUnit = async (
  learningUnit: LearningUnit
): Promise<LearningUnit> => {
  try {
    const response = await axios.post<LearningUnit>(API_URL, learningUnit);
    return response.data;
  } catch (error) {
    console.error('Error creating learning unit:', error);
    throw error;
  }
};

export const updateLearningUnit = async (
  id: number,
  learningUnit: Partial<LearningUnit>
): Promise<LearningUnit> => {
  try {
    const response = await axios.put<LearningUnit>(
      `${API_URL}/${id}`,
      learningUnit
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating learning unit with id ${id}:`, error);
    throw error;
  }
};

export const deleteLearningUnit = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting learning unit with id ${id}:`, error);
    throw error;
  }
};
