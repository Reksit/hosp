import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHospitalStats, useAmbulances, useBeds, useStaff } from '../hooks/useApi';
import GoogleMap from '../components/GoogleMap';
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
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<any>({});

  // Real data from API
  const { stats: hospitalStats, loading: statsLoading } = useHospitalStats(user?.hospitalId);
  const { ambulances, loading: ambulancesLoading } = useAmbulances(user?.hospitalId);
  const { beds, loading: bedsLoading, assignBed } = useBeds(user?.hospitalId);
  const { staff, loading: staffLoading } = useStaff(user?.hospitalId);

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

  const handleAddItem = async (type: string) => {
    try {
      // Implementation for adding new items
      console.log('Adding new', type, newItem);
      setShowAddModal(null);
      setNewItem({});
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleAssignBed = async (bedId: string, patientName: string, patientContact: string) => {
    try {
      await assignBed(bedId, patientName, patientContact);
    } catch (error) {
      console.error('Failed to assign bed:', error);
    }
  };

  if (statsLoading || ambulancesLoading || bedsLoading || staffLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
                <p className="text-2xl font-bold text-gray-900">{hospitalStats?.totalBeds || 0}</p>
              </div>
              <Bed className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{hospitalStats?.availableBeds || 0}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalStats?.doctors || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nurses</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalStats?.nurses || 0}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ambulances</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalStats?.ambulances || 0}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-orange-600">{ambulances?.filter(a => a.status !== 'available').length || 0}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-red-600">{ambulances?.filter(a => a.emergencyLevel === 'CRITICAL').length || 0}</p>
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
                {ambulances?.slice(0, 3).map((ambulance) => (
                  <div key={ambulance.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{ambulance.vehicleNumber} - {ambulance.driver?.name || 'No driver assigned'}</p>
                      <p className="text-sm text-gray-600">{ambulance.pickupAddress || 'No current pickup'}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambulance.status)}`}>
                      {ambulance.status.replace('_', ' ')}
                    </span>
                  </div>
                )) || <p className="text-gray-500">No recent activity</p>}
              </div>
            </div>

            {/* Live Map */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Ambulance Tracking</h2>
              <GoogleMap
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={12}
                markers={ambulances?.filter(a => a.currentLatitude && a.currentLongitude).map(ambulance => ({
                  id: ambulance.id.toString(),
                  position: { lat: ambulance.currentLatitude, lng: ambulance.currentLongitude },
                  title: ambulance.vehicleNumber,
                  info: `Status: ${ambulance.status} | Driver: ${ambulance.driver?.name || 'Unassigned'}`
                })) || []}
                height="300px"
              />
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
                  <button 
                    onClick={() => setShowAddModal('ambulance')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ambulances?.map((ambulance) => (
                    <tr key={ambulance.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ambulance.vehicleNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{ambulance.driver?.name || 'Unassigned'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambulance.status)}`}>
                          {ambulance.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{ambulance.pickupAddress || 'No pickup'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{ambulance.patientName || 'No patient'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ambulance.emergencyLevel?.toLowerCase() || 'low')}`}>
                          {ambulance.emergencyLevel || 'LOW'}
                        </span>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No ambulances found</td>
                    </tr>
                  )}
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
                <button 
                  onClick={() => setShowAddModal('bed')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
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
                  {beds?.map((bed) => (
                    <tr key={bed.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{bed.bedNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{bed.bedType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bed.status)}`}>
                          {bed.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{bed.patientName || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{bed.assignedDoctor?.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bed.status === 'AVAILABLE' && (
                          <button 
                            onClick={() => {
                              const patientName = prompt('Enter patient name:');
                              const patientContact = prompt('Enter patient contact:');
                              if (patientName && patientContact) {
                                handleAssignBed(bed.id.toString(), patientName, patientContact);
                              }
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Assign
                          </button>
                        )}
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No beds found</td>
                    </tr>
                  )}
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
                <button 
                  onClick={() => setShowAddModal('staff')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staff?.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 capitalize">{member.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.hospital?.name || 'Unassigned'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.isEmailVerified ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                          {member.isEmailVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Remove</button>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No staff found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New {showAddModal}</h3>
            <div className="space-y-4">
              {showAddModal === 'ambulance' && (
                <>
                  <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={newItem.vehicleNumber || ''}
                    onChange={(e) => setNewItem({...newItem, vehicleNumber: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </>
              )}
              {showAddModal === 'bed' && (
                <>
                  <input
                    type="text"
                    placeholder="Bed Number"
                    value={newItem.bedNumber || ''}
                    onChange={(e) => setNewItem({...newItem, bedNumber: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <select
                    value={newItem.bedType || ''}
                    onChange={(e) => setNewItem({...newItem, bedType: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Bed Type</option>
                    <option value="ICU">ICU</option>
                    <option value="EMERGENCY">Emergency</option>
                    <option value="GENERAL">General</option>
                    <option value="PEDIATRIC">Pediatric</option>
                    <option value="MATERNITY">Maternity</option>
                  </select>
                </>
              )}
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => handleAddItem(showAddModal)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => {setShowAddModal(null); setNewItem({});}}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}