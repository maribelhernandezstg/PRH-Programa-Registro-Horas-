import axios from 'axios';
import { environment } from '../environment/environment';
import { Advisor } from '../shared/models/advisor.class';
import { dummyAdvisors } from '../shared/mocks/advisors';
const API_URL = environment.API_URL + '/advisors';

export const getAllAdvisors = async (): Promise<Advisor[]> => {
  try {
    const response = await axios.get<Advisor[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advisors:', error);
    throw error;
  }
};

export const getAllAdvisorsDummy = async (): Promise<Advisor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyAdvisors);
    }, 1500);
  });
};

export const getAdvisorByEnrollment = async (enrollment: number): Promise<Advisor> => {
  try {
    const response = await axios.get<Advisor>(`${API_URL}/${enrollment}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching advisor with enrollment ${enrollment}:`, error);
    throw error;
  }
};

export const createAdvisor = async (advisor: Advisor): Promise<Advisor> => {
  try {
    const response = await axios.post<Advisor>(`${API_URL}`, advisor);
    return response.data;
  } catch (error) {
    console.error('Error creating advisor:', error);
    throw error;
  }
};

export const updateAdvisor = async (enrollment: number, advisor: Partial<Advisor>): Promise<Advisor> => {
  try {
    const response = await axios.put<Advisor>(`${API_URL}/${enrollment}`, advisor);
    return response.data;
  } catch (error) {
    console.error(`Error updating advisor with enrollment ${enrollment}:`, error);
    throw error;
  }
};

export const toggleAdvisorActivation = async (enrollment: number): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${enrollment}`);
  } catch (error) {
    console.error(`Error toggling activation status for advisor with enrollment ${enrollment}:`, error);
    throw error;
  }
};
