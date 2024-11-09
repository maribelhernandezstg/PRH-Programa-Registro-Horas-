import axios, { AxiosResponse } from 'axios';
import { environment } from '../environment/environment';
import { User } from '../shared/models/user.class';
import { dummyUsers } from '../shared/mocks/users';
import { util } from '../utils/util';

const API_URL = environment.API_URL + '/user';

export class UserService {
  constructor() {}

  // Obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response: AxiosResponse<User[]> = await axios.get<User[]>(`${environment.API_URL + '/users'}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Error fetching users');
    }
  }

  // Obtener todos los usuarios (dummy)
  async getAllUsersDummy(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyUsers);
      }, 1500);
    });
  }

  // Iniciar sesión
  logIn(Enrollment: number, Password: string): Promise<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { Enrollment, Password };

    return axios
      .post(`${environment.API_URL}/login/`, body, { headers })
      .then((response) => {
        const token = response.headers['authorization'];
        util.saveLocalStorage('token', token);
        return response.data;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error('Axios error: ', error.response?.data || error.message);
          throw new Error(error.response?.data?.message || 'Error logging in');
        } else {
          console.error('Unexpected error: ', error);
          throw new Error('Error logging in');
        }
      });
  }

  // Registrar usuario
  async register(user: User): Promise<User> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response: AxiosResponse<User> = await axios.post<User>(`${API_URL}/register`, JSON.stringify(user), { headers });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Error registering user');
    }
  }

  // Actualizar usuario
  async updateUser(enrollment: number, user: Partial<User>): Promise<User> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      const response: AxiosResponse<User> = await axios.put<User>(`${API_URL}/${enrollment}`, JSON.stringify(user), { headers });
      return response.data;
    } catch (error) {
      console.error(`Error updating user with enrollment ${enrollment}:`, error);
      throw new Error(`Error updating user with enrollment ${enrollment}`);
    }
  }

  // Activar/desactivar usuario
  async toggleUserActivation(enrollment: number): Promise<void> {
    try {
      const token = await util.getLocalStorage('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      };
      await axios.get(`${API_URL}/active/${enrollment}`, { headers });
    } catch (error) {
      console.error(`Error toggling activation status for user with enrollment ${enrollment}:`, error);
      throw new Error(`Error toggling activation status for user with enrollment ${enrollment}`);
    }
  }
}
