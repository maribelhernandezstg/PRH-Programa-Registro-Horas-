import axios from 'axios';
import { environment } from '../environment/environment';
import { Advisee } from '../shared/models/advisee.class';
import { dummyAdvisees } from '../shared/mocks/advisees';
import { util } from '../utils/util';

const API_URL = environment.API_URL + '/advisee';

export class AdviseeService {
  constructor() {}

  // Obtener todos los asesorados
  async getAllAdvisees(): Promise<Advisee[]> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<Advisee[]>(`${environment.API_URL + '/advisees'}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching advisees:', error);
      throw error;
    }
  }

  // Obtener todos los asesorados desde datos dummy
  async getAllAdviseesDummy(): Promise<Advisee[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyAdvisees);
      }, 1500);
    });
  }

  // Obtener un asesorado por matrícula
  async getAdviseeById(enrollment: number): Promise<Advisee> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<Advisee>(`${API_URL}/${enrollment}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching advisee with enrollment ${enrollment}:`, error);
      throw error;
    }
  }

  // Crear un nuevo asesorado
  async createAdvisee(advisee: Advisee): Promise<Advisee> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.post<Advisee>(`${API_URL}`, JSON.stringify(advisee), { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating advisee:', error);
      throw error;
    }
  }

  // Actualizar un asesorado existente
  async updateAdvisee(enrollment: number, advisee: Partial<Advisee>): Promise<Advisee> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.put<Advisee>(`${API_URL}/${enrollment}`, JSON.stringify(advisee), { headers });
      return response.data;
    } catch (error) {
      console.error(`Error updating advisee with enrollment ${enrollment}:`, error);
      throw error;
    }
  }

  // Cambiar el estado de activación de un asesorado
  async toggleAdviseeActivation(enrollment: number): Promise<void> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      await axios.get(`${API_URL}/active/${enrollment}`, { headers });
    } catch (error) {
      console.error(`Error toggling activation status for advisee with enrollment ${enrollment}:`, error);
      throw error;
    }
  }
}
