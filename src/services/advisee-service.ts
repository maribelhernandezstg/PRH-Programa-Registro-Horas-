import axios from 'axios';
import { Advisee } from '../shared/models/advisee.interface';

const API_URL = process.env.API_URL + '/advisees';

export const getAllAdvisees = async (): Promise<Advisee[]> => {
  try {
    const response = await axios.get<Advisee[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advisees:', error);
    throw error;
  }
};

export const getAdviseeById = async (enrollment: number): Promise<Advisee> => {
  try {
    const response = await axios.get<Advisee>(`${API_URL}/${enrollment}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching advisee with enrollment ${enrollment}:`,
      error
    );
    throw error;
  }
};

export const createAdvisee = async (advisee: Advisee): Promise<Advisee> => {
  try {
    const response = await axios.post<Advisee>(`${API_URL}`, advisee);
    return response.data;
  } catch (error) {
    console.error('Error creating advisee:', error);
    throw error;
  }
};

export const updateAdvisee = async (
  enrollment: number,
  advisee: Partial<Advisee>
): Promise<Advisee> => {
  try {
    const response = await axios.put<Advisee>(
      `${API_URL}/${enrollment}`,
      advisee
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating advisee with enrollment ${enrollment}:`,
      error
    );
    throw error;
  }
};

export const toggleAdviseeActivation = async (
  enrollment: number
): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${enrollment}`);
  } catch (error) {
    console.error(
      `Error toggling activation status for advisee with enrollment ${enrollment}:`,
      error
    );
    throw error;
  }
};
