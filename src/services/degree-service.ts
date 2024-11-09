import axios from 'axios';
import { environment } from '../environment/environment';
import { Degree } from '../shared/models/degree.class';
import { util } from '../utils/util';

const API_URL = environment.API_URL + '/degree';

export class DegreeService {
  constructor() {}

  async getDegrees(): Promise<Degree[]> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<Degree[]>(`${environment.API_URL + '/degrees'}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching degrees:', error);
      throw error;
    }
  }

  async getDegreeById(id: number): Promise<Degree> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<Degree>(`${API_URL}/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching degree with ID ${id}:`, error);
      throw error;
    }
  }

  async createDegree(degree: Degree): Promise<Degree> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.post<Degree>(`${API_URL}`, JSON.stringify(degree), { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating degree:', error);
      throw error;
    }
  }

  async updateDegree(id: number, degree: Partial<Degree>): Promise<Degree> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.put<Degree>(`${API_URL}/${id}`, JSON.stringify(degree), { headers });
      return response.data;
    } catch (error) {
      console.error(`Error updating degree with ID ${id}:`, error);
      throw error;
    }
  }

  async toggleDegreeActivation(id: number): Promise<void> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      await axios.get(`${API_URL}/active/${id}`, { headers });
    } catch (error) {
      console.error(`Error toggling activation status for degree with ID ${id}:`, error);
      throw error;
    }
  }
}
