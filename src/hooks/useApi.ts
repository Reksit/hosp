import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:8080/api';

export function useApi() {
  const { token } = useAuth();

  const request = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return { request };
}

export function useHospitalStats(hospitalId: string | undefined) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  useEffect(() => {
    if (!hospitalId) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await request(`/hospitals/${hospitalId}/stats`);
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [hospitalId]);

  return { stats, loading, error };
}

export function useAmbulances(hospitalId: string | undefined) {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  useEffect(() => {
    if (!hospitalId) return;

    const fetchAmbulances = async () => {
      try {
        setLoading(true);
        const data = await request(`/ambulances/hospital/${hospitalId}`);
        setAmbulances(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ambulances');
      } finally {
        setLoading(false);
      }
    };

    fetchAmbulances();
  }, [hospitalId]);

  const updateAmbulanceLocation = async (locationData: any) => {
    try {
      await request('/ambulances/update-location', {
        method: 'PUT',
        body: JSON.stringify(locationData),
      });
      // Refresh ambulances after update
      const data = await request(`/ambulances/hospital/${hospitalId}`);
      setAmbulances(data);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update location');
    }
  };

  return { ambulances, loading, error, updateAmbulanceLocation };
}

export function useBeds(hospitalId: string | undefined) {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  useEffect(() => {
    if (!hospitalId) return;

    const fetchBeds = async () => {
      try {
        setLoading(true);
        const data = await request(`/beds/hospital/${hospitalId}`);
        setBeds(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch beds');
      } finally {
        setLoading(false);
      }
    };

    fetchBeds();
  }, [hospitalId]);

  const assignBed = async (bedId: string, patientName: string, patientContact: string, doctorId?: string, nurseId?: string) => {
    try {
      const params = new URLSearchParams({
        patientName,
        patientContact,
        ...(doctorId && { doctorId }),
        ...(nurseId && { nurseId })
      });
      
      await request(`/beds/${bedId}/assign?${params}`, {
        method: 'PUT',
      });
      
      // Refresh beds after assignment
      const data = await request(`/beds/hospital/${hospitalId}`);
      setBeds(data);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to assign bed');
    }
  };

  return { beds, loading, error, assignBed };
}

export function useStaff(hospitalId: string | undefined) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  useEffect(() => {
    if (!hospitalId) return;

    const fetchStaff = async () => {
      try {
        setLoading(true);
        const data = await request(`/users/hospital/${hospitalId}`);
        setStaff(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch staff');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [hospitalId]);

  return { staff, loading, error };
}