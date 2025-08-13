const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Ambulance API
  async getHospitalAmbulances(hospitalId: string) {
    return this.request(`/ambulances/hospital/${hospitalId}`);
  }

  async getMyAmbulance() {
    return this.request('/ambulances/my-ambulance');
  }

  async updateAmbulanceLocation(locationData: any) {
    return this.request('/ambulances/update-location', {
      method: 'PUT',
      body: JSON.stringify(locationData),
    });
  }

  async createAmbulance(ambulanceData: any) {
    return this.request('/ambulances', {
      method: 'POST',
      body: JSON.stringify(ambulanceData),
    });
  }

  // Hospital API
  async getAllHospitals() {
    return this.request('/hospitals');
  }

  async getHospitalStats(hospitalId: string) {
    return this.request(`/hospitals/${hospitalId}/stats`);
  }

  // Bed API
  async getHospitalBeds(hospitalId: string) {
    return this.request(`/beds/hospital/${hospitalId}`);
  }

  async createBed(bedData: any) {
    return this.request('/beds', {
      method: 'POST',
      body: JSON.stringify(bedData),
    });
  }

  async assignBed(bedId: string, assignmentData: any) {
    const params = new URLSearchParams(assignmentData);
    return this.request(`/beds/${bedId}/assign?${params}`, {
      method: 'PUT',
    });
  }

  // User API
  async getHospitalStaff(hospitalId: string) {
    return this.request(`/users/hospital/${hospitalId}`);
  }

  async getUserProfile() {
    return this.request('/users/profile');
  }

  async getUserWorkHours(userId: string, startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    return this.request(`/users/${userId}/work-hours?${params}`);
  }

  async logWorkHours(workHourData: any) {
    return this.request('/users/work-hours', {
      method: 'POST',
      body: JSON.stringify(workHourData),
    });
  }
}

export const apiService = new ApiService();