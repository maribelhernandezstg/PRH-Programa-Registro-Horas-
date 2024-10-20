import axios from 'axios';
import { AdvisorySession } from '../shared/models/advisory-session.interface';
const API_URL = process.env.API_URL + '/advisorySessions';

export const getAllAdvisorySessions = async (): Promise<AdvisorySession[]> => {
  try {
    const response = await axios.get<AdvisorySession[]>(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advisory sessions:', error);
    throw error;
  }
};

export const getAdvisorySessionById = async (
  sessionId: number
): Promise<AdvisorySession> => {
  try {
    const response = await axios.get<AdvisorySession>(
      `${API_URL}/${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching advisory session with ID ${sessionId}:`,
      error
    );
    throw error;
  }
};

export const createAdvisorySession = async (
  advisorySession: AdvisorySession
): Promise<AdvisorySession> => {
  try {
    const response = await axios.post<AdvisorySession>(
      `${API_URL}`,
      advisorySession
    );
    return response.data;
  } catch (error) {
    console.error('Error creating advisory session:', error);
    throw error;
  }
};

export const updateAdvisorySession = async (
  sessionId: number,
  advisorySession: Partial<AdvisorySession>
): Promise<AdvisorySession> => {
  try {
    const response = await axios.put<AdvisorySession>(
      `${API_URL}/${sessionId}`,
      advisorySession
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating advisory session with ID ${sessionId}:`,
      error
    );
    throw error;
  }
};

export const toggleAdvisorySessionActivation = async (
  sessionId: number
): Promise<void> => {
  try {
    await axios.get(`${API_URL}/active/${sessionId}`);
  } catch (error) {
    console.error(
      `Error toggling activation status for advisory session with ID ${sessionId}:`,
      error
    );
    throw error;
  }
};

export const getAdvisorySessionsByAdvisor = async (
  enrollment: number
): Promise<AdvisorySession[]> => {
  try {
    const response = await axios.get<AdvisorySession[]>(
      `${API_URL}/advisor/${enrollment}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching advisory sessions for advisor with enrollment ${enrollment}:`,
      error
    );
    throw error;
  }
};
