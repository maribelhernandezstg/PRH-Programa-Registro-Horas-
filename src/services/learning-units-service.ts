import axios from 'axios';
import { environment } from '../environment/environment';
import { LearningUnit } from '../shared/models/learning-unit.class';
import { util } from '../utils/util';

const API_URL = environment.API_URL + '/learningUnit';

export class LearningUnitService {
  constructor() {}

  async getAllLearningUnits(): Promise<LearningUnit[]> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<LearningUnit[]>(`${environment.API_URL + '/learningUnits'}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching learning units:', error);
      throw error;
    }
  }

  async getLearningUnitById(id: number): Promise<LearningUnit> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<LearningUnit>(`${API_URL}/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching learning unit with ID ${id}:`, error);
      throw error;
    }
  }

  async createLearningUnit(learningUnit: LearningUnit): Promise<LearningUnit> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.post<LearningUnit>(`${API_URL}`, learningUnit, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating learning unit:', error);
      throw error;
    }
  }

  async updateLearningUnit(id: number, learningUnit: Partial<LearningUnit>): Promise<LearningUnit> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.put<LearningUnit>(`${API_URL}/${id}`, learningUnit, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error updating learning unit with ID ${id}:`, error);
      throw error;
    }
  }

  async toggleLearningUnitActivation(id: number): Promise<void> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      await axios.get(`${API_URL}/active/${id}`, { headers });
    } catch (error) {
      console.error(`Error toggling activation status for learning unit with ID ${id}:`, error);
      throw error;
    }
  }
}
