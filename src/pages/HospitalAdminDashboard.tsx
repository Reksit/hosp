import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Bed, 
  MapPin, 
  Plus, 
  Filter, 
  AlertTriangle,
  CheckCircle,
  Clock,
  LogOut,
  Activity
} from 'lucide-react';

export default function HospitalAdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const hospitalStats = {
    totalBeds: 120,
    availableBeds: 28,
    occupiedBeds: 92,
    doctors: 45,
    nurses: 120,
    ambulances: 8,
    activeAmbulances: 5
  };

  const ambulances = [
    { id: 'AMB001', driver: 'John Driver', status: 'enroute_pickup', location: 'Main St & 5th Ave', eta: '12 min', priority: 'high' },
    { id: 'AMB002', driver: 'Mike Johnson', status: 'patient_onboard', location: 'Downtown Medical', eta: '8 min', priority: 'critical' },
    { id: 'AMB003', driver: 'Sarah Wilson', status: 'available', location: 'Station 1', eta: '-', priority: 'low' },
    { id: 'AMB004', driver: 'Tom Brown', status: 'at_pickup', location: 'Park Ave & 10th', eta: '15 min', priority: 'medium' },
  ];

  const staff = [
    { id: 1, name: 'Dr. Michael Smith', role: 'doctor', department: 'Emergency', status: 'available', workHours: '8.5/12' },
    { id: 2, name: 'Dr. Sarah Johnson', role: 'doctor', department: 'Cardiology', status: 'busy', workHours: '6.0/12' },
    { id: 3, name: 'Lisa Nurse', role: 'nurse', department: 'Emergency', status: 'available', workHours: '7.2/12' },
    { id: 4, name: 'John Nurse', role: 'nurse', department: 'ICU', status: 'break', workHours: '8.0/12' },
  ];

  const beds = [
    { id: 'ICU-001', type: 'ICU', status: 'occupied', patient: 'John Doe', assignedDoctor: 'Dr. Smith' },
    { id: 'ICU-002', type: 'ICU', status: 'available', patient: null, assignedDoctor: null },
    { id: 'ER-001', type: 'Emergency', status: 'occupied', patient: 'Jane Smith', assignedDoctor: 'Dr. Johnson' },
    { id: 'GEN-001', type: 'General', status: 'cleaning', patient: null, assignedDoctor: null },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'available': 'text-green-600 bg-green-100',
      'occupied': 'text-red-600 bg-red-100',
      'cleaning': 'text-yellow-600 bg-yellow-100',
      'maintenance': 'text-gray-600 bg-gray-100',
      'busy': 'text-red-600 bg-red-100',
      'break': 'text-yellow-600 bg-yellow-100',
      'enroute_pickup': 'text-blue-600 bg-blue-100',
      'patient_onboard': 'text-orange-600 bg-orange-100',
      'at_pickup': 'text-purple-600 bg-purple-100',
      'critical': 'text-red-600 bg-red-100',
      'high': 'text-orange-600 bg-orange-100',
      'medium': 'text-yellow-600 bg-yellow-100',
      'low': 'text-green-600 bg-green-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hospital Administration</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Beds</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalStats.totalBeds}</p>
              </div>
              <Bed className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{hospitalStats.availableBeds}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalStats.doctors}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nurses</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalStats.nurses}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ambulances</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalStats.ambulances}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-orange-600">{hospitalStats.activeAmbulances}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'ambulances', name: 'Ambulances' },
                { id: 'beds', name: 'Bed Management' },
                { id: 'staff', name: 'Staff Management' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Ambulance Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {ambulances.slice(0, 3).map((ambulance) => (
                  <div key={ambulance.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{ambulance.id} - {ambulance.driver}</p>
                      <p className="text-sm text-gray-600">{ambulance.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambulance.status)}`}>
                      {ambulance.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bed Occupancy Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Bed Occupancy</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ICU</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium">17/20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Emergency</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-sm font-medium">14/20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">General</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium">48/80</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ambulances' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Ambulance Fleet</h2>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Ambulance</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ambulances.map((ambulance) => (
                    <tr key={ambulance.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ambulance.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{ambulance.driver}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambulance.status)}`}>
                          {ambulance.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{ambulance.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{ambulance.eta}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambulance.priority)}`}>
                          {ambulance.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'beds' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Bed Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Bed</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bed ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {beds.map((bed) => (
                    <tr key={bed.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{bed.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{bed.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bed.status)}`}>
                          {bed.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{bed.patient || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{bed.assignedDoctor || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Staff Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Staff</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staff.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 capitalize">{member.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.workHours}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900">Assign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}