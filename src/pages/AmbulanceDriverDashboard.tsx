import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import { useAuth } from '../context/AuthContext';

interface EmergencyCall {
  id: string;
  patientName: string;
  location: string;
  coordinates: { lat: number; lng: number };
  emergencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  timestamp: string;
  status: 'PENDING' | 'ACCEPTED' | 'EN_ROUTE' | 'ARRIVED' | 'COMPLETED';
}

interface AmbulanceStatus {
  id: string;
  vehicleNumber: string;
  status: 'AVAILABLE' | 'BUSY' | 'MAINTENANCE';
  currentLocation: { lat: number; lng: number };
  driver: string;
}

const AmbulanceDriverDashboard: React.FC = () => {
  const [emergencyCalls, setEmergencyCalls] = useState<EmergencyCall[]>([]);
  const [ambulanceStatus, setAmbulanceStatus] = useState<AmbulanceStatus | null>(null);
  const [currentCall, setCurrentCall] = useState<EmergencyCall | null>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchEmergencyCalls();
    fetchAmbulanceStatus();
  }, []);

  const fetchEmergencyCalls = async () => {
    try {
      // Mock data for now - replace with actual API call
      setEmergencyCalls([]);
    } catch (error) {
      console.error('Error fetching emergency calls:', error);
    }
  };

  const fetchAmbulanceStatus = async () => {
    try {
      // Mock data for now - replace with actual API call
      setAmbulanceStatus(null);
    } catch (error) {
      console.error('Error fetching ambulance status:', error);
    }
  };

  const acceptCall = async (callId: string) => {
    try {
      const call = emergencyCalls.find(c => c.id === callId);
      if (call) {
        setCurrentCall({ ...call, status: 'ACCEPTED' });
        setEmergencyCalls(prev => prev.filter(c => c.id !== callId));
      }
    } catch (error) {
      console.error('Error accepting call:', error);
    }
  };

  const updateCallStatus = async (status: EmergencyCall['status']) => {
    if (!currentCall) return;
    
    try {
      setCurrentCall(prev => prev ? { ...prev, status } : null);
      
      if (status === 'COMPLETED') {
        setCurrentCall(null);
        fetchEmergencyCalls();
      }
    } catch (error) {
      console.error('Error updating call status:', error);
    }
  };

  const getEmergencyLevelColor = (level: EmergencyCall['emergencyLevel']) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: EmergencyCall['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-gray-100 text-gray-800';
      case 'ACCEPTED': return 'bg-blue-100 text-blue-800';
      case 'EN_ROUTE': return 'bg-yellow-100 text-yellow-800';
      case 'ARRIVED': return 'bg-orange-100 text-orange-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Navigation className="h-8 w-8 text-red-600" />
                <h1 className="text-2xl font-bold text-gray-900">Ambulance Driver Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {ambulanceStatus && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Vehicle:</span>
                  <span className="font-semibold text-gray-900">{ambulanceStatus.vehicleNumber}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ambulanceStatus.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                    ambulanceStatus.status === 'BUSY' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ambulanceStatus.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Call */}
          {currentCall && (
            <div className="lg:col-span-3 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-red-200">
                <div className="px-6 py-4 border-b border-red-200 bg-red-50">
                  <h2 className="text-lg font-semibold text-red-900 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Current Emergency Call
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{currentCall.patientName}</h3>
                        <p className="text-gray-600 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {currentCall.location}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEmergencyLevelColor(currentCall.emergencyLevel)}`}>
                          {currentCall.emergencyLevel}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentCall.status)}`}>
                          {currentCall.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Description:</p>
                        <p className="text-gray-900">{currentCall.description}</p>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(currentCall.timestamp).toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Update Status</h4>
                        <div className="space-y-2">
                          {currentCall.status === 'ACCEPTED' && (
                            <button
                              onClick={() => updateCallStatus('EN_ROUTE')}
                              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Mark as En Route
                            </button>
                          )}
                          {currentCall.status === 'EN_ROUTE' && (
                            <button
                              onClick={() => updateCallStatus('ARRIVED')}
                              className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                            >
                              Mark as Arrived
                            </button>
                          )}
                          {currentCall.status === 'ARRIVED' && (
                            <button
                              onClick={() => updateCallStatus('COMPLETED')}
                              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Complete Call
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Emergency Contact</h4>
                        <button className="flex items-center text-blue-600 hover:text-blue-700">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Emergency Services
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Available Emergency Calls */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Available Emergency Calls</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {emergencyCalls.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No emergency calls available</p>
                  </div>
                ) : (
                  emergencyCalls.map((call) => (
                    <div key={call.id} className="p-6 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{call.patientName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEmergencyLevelColor(call.emergencyLevel)}`}>
                              {call.emergencyLevel}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 flex items-center mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {call.location}
                          </p>
                          
                          <p className="text-gray-700 mb-3">{call.description}</p>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(call.timestamp).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          <button
                            onClick={() => acceptCall(call.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            disabled={!!currentCall}
                          >
                            Accept Call
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Location Map</h2>
              </div>
              <div className="p-6">
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <GoogleMap
                    center={currentCall?.coordinates || { lat: 40.7128, lng: -74.0060 }}
                    zoom={13}
                    markers={currentCall ? [
                      {
                        position: currentCall.coordinates,
                        title: `Emergency: ${currentCall.patientName}`,
                        icon: 'emergency'
                      }
                    ] : []}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceDriverDashboard;