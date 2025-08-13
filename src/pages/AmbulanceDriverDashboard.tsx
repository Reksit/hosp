import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, Navigation, Phone, Clock, CheckCircle, AlertCircle, LogOut } from 'lucide-react';

export default function AmbulanceDriverDashboard() {
  const { user, logout } = useAuth();
  const [currentStatus, setCurrentStatus] = useState('idle');
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [pickupDetails, setPickupDetails] = useState({
    patientName: '',
    pickupAddress: '',
    hospitalDestination: 'General Hospital',
    emergencyLevel: 'medium'
  });

  const statusOptions = [
    { value: 'idle', label: 'Available', color: 'bg-green-500', icon: CheckCircle },
    { value: 'enroute_pickup', label: 'En Route to Pickup', color: 'bg-yellow-500', icon: Navigation },
    { value: 'at_pickup', label: 'At Pickup Location', color: 'bg-orange-500', icon: MapPin },
    { value: 'patient_onboard', label: 'Patient On Board', color: 'bg-red-500', icon: AlertCircle },
    { value: 'arriving_hospital', label: 'Arriving at Hospital', color: 'bg-blue-500', icon: Navigation },
  ];

  useEffect(() => {
    // Simulate location updates
    const interval = setInterval(() => {
      setLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    // In real app, this would send to backend
    console.log('Status updated:', newStatus, 'Location:', location);
  };

  const handleEmergencyCall = () => {
    // Simulate emergency call
    window.open('tel:+1234567890');
  };

  const currentStatusOption = statusOptions.find(s => s.value === currentStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ambulance Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleEmergencyCall}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Emergency</span>
              </button>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Status Control */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Status</h2>
              <div className="flex items-center space-x-4 mb-6">
                {currentStatusOption && (
                  <>
                    <div className={`w-4 h-4 rounded-full ${currentStatusOption.color}`}></div>
                    <span className="text-lg font-medium text-gray-900">
                      {currentStatusOption.label}
                    </span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {statusOptions.map((status) => {
                  const Icon = status.icon;
                  return (
                    <button
                      key={status.value}
                      onClick={() => handleStatusChange(status.value)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        currentStatus === status.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${
                        currentStatus === status.value ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-xs font-medium ${
                        currentStatus === status.value ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {status.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pickup Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pickup Information</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      value={pickupDetails.patientName}
                      onChange={(e) => setPickupDetails(prev => ({ ...prev, patientName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter patient name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Level
                    </label>
                    <select
                      value={pickupDetails.emergencyLevel}
                      onChange={(e) => setPickupDetails(prev => ({ ...prev, emergencyLevel: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Address
                  </label>
                  <input
                    type="text"
                    value={pickupDetails.pickupAddress}
                    onChange={(e) => setPickupDetails(prev => ({ ...prev, pickupAddress: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter pickup address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Hospital
                  </label>
                  <select
                    value={pickupDetails.hospitalDestination}
                    onChange={(e) => setPickupDetails(prev => ({ ...prev, hospitalDestination: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="General Hospital">General Hospital</option>
                    <option value="Memorial Hospital">Memorial Hospital</option>
                    <option value="City Medical Center">City Medical Center</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Location</h2>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Google Maps Integration</p>
                  <p className="text-sm text-gray-500">
                    Current: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Runs</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours Active</span>
                  <span className="font-semibold text-gray-900">6.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Response</span>
                  <span className="font-semibold text-gray-900">12 min</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Completed pickup at Main St</p>
                    <p className="text-xs text-gray-500">2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">En route to General Hospital</p>
                    <p className="text-xs text-gray-500">2:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Arrived at pickup location</p>
                    <p className="text-xs text-gray-500">2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dispatch</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hospital</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Police</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}