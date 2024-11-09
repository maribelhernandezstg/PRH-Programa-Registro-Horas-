import axios from 'axios';
import { environment } from '../environment/environment';
import { Advisor } from '../shared/models/advisor.class';
import { dummyAdvisors } from '../shared/mocks/advisors';
import { util } from '../utils/util';

const API_URL = environment.API_URL + '/advisor';

export class AdvisorService {
  constructor() {}

  // Obtener todos los asesores
  async getAllAdvisors(): Promise<Advisor[]> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<Advisor[]>(`${environment.API_URL + '/advisors'}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching advisors:', error);
      throw error;
    }
  }

  // Obtener todos los asesores desde datos dummy
  async getAllAdvisorsDummy(): Promise<Advisor[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyAdvisors);
      }, 1500);
    });
  }

  // Obtener un asesor por matrícula
  async getAdvisorByEnrollment(enrollment: number): Promise<Advisor> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<Advisor>(`${API_URL}/${enrollment}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching advisor with enrollment ${enrollment}:`, error);
      throw error;
    }
  }

  // Crear un nuevo asesor
  async createAdvisor(advisor: Advisor): Promise<Advisor> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.post<Advisor>(`${API_URL}`, JSON.stringify(advisor), { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating advisor:', error);
      throw error;
    }
  }

  // Actualizar un asesor existente
  async updateAdvisor(enrollment: number, advisor: Partial<Advisor>): Promise<Advisor> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.put<Advisor>(`${API_URL}/${enrollment}`, JSON.stringify(advisor), { headers });
      return response.data;
    } catch (error) {
      console.error(`Error updating advisor with enrollment ${enrollment}:`, error);
      throw error;
    }
  }

  // Cambiar el estado de activación de un asesor
  async toggleAdvisorActivation(enrollment: number): Promise<void> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      await axios.get(`${API_URL}/active/${enrollment}`, { headers });
    } catch (error) {
      console.error(`Error toggling activation status for advisor with enrollment ${enrollment}:`, error);
      throw error;
    }
  }
}
