const API_BASE_URL = 'http://localhost:8080/api';

export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test/health`);
    if (response.ok) {
      const message = await response.text();
      console.log('Backend connection successful:', message);
      return true;
    } else {
      console.error('Backend connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Backend connection error:', error);
    return false;
  }
};