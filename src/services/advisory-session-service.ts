import axios from 'axios';
import { environment } from '../environment/environment';
import { AdvisorySession } from '../shared/models/advisory-session.class';
import { dummyAdvisorySessions } from '../shared/mocks/advisory-sessions';
import { util } from '../utils/util';

const API_URL = environment.API_URL + '/advisorySession';

export class AdvisorySessionService {
  constructor() {}

  // Obtener todas las sesiones de asesoría
  async getAllAdvisorySessions(): Promise<AdvisorySession[]> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<AdvisorySession[]>(`${environment.API_URL + '/advisorySessions'}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching advisory sessions:', error);
      throw error;
    }
  }

  // Obtener todas las sesiones de asesoría desde datos dummy
  async getAllAdvisorySessionsDummy(): Promise<AdvisorySession[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyAdvisorySessions);
      }, 1500);
    });
  }

  // Obtener una sesión de asesoría por ID
  async getAdvisorySessionById(sessionId: number): Promise<AdvisorySession> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<AdvisorySession>(`${API_URL}/${sessionId}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching advisory session with ID ${sessionId}:`, error);
      throw error;
    }
  }

  // Crear una nueva sesión de asesoría
  async createAdvisorySession(advisorySession: AdvisorySession): Promise<AdvisorySession> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.post<AdvisorySession>(`${API_URL}`, JSON.stringify(advisorySession), { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating advisory session:', error);
      throw error;
    }
  }

  // Actualizar una sesión de asesoría existente
  async updateAdvisorySession(sessionId: number, advisorySession: Partial<AdvisorySession>): Promise<AdvisorySession> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.put<AdvisorySession>(`${API_URL}/${sessionId}`, JSON.stringify(advisorySession), { headers });
      return response.data;
    } catch (error) {
      console.error(`Error updating advisory session with ID ${sessionId}:`, error);
      throw error;
    }
  }

  // Cambiar el estado de activación de una sesión de asesoría
  async toggleAdvisorySessionActivation(sessionId: number): Promise<void> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      await axios.get(`${API_URL}/active/${sessionId}`, { headers });
    } catch (error) {
      console.error(`Error toggling activation status for advisory session with ID ${sessionId}:`, error);
      throw error;
    }
  }

  // Obtener las sesiones de asesoría de un asesor específico
  async getAdvisorySessionsByAdvisor(enrollment: number): Promise<AdvisorySession[]> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response = await axios.get<AdvisorySession[]>(`${API_URL}/advisor/${enrollment}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching advisory sessions for advisor with enrollment ${enrollment}:`, error);
      throw error;
    }
  }
}
