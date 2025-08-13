import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CheckCircle, AlertCircle, Users, LogOut, FileText } from 'lucide-react';

export default function DoctorNurseDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const todayStats = {
    totalPatients: user?.role === 'doctor' ? 12 : 8,
    completedTasks: user?.role === 'doctor' ? 8 : 6,
    pendingTasks: user?.role === 'doctor' ? 4 : 2,
    workHours: 6.5,
    scheduledHours: 12
  };

  const assignments = [
    {
      id: 1,
      type: user?.role === 'doctor' ? 'consultation' : 'patient_care',
      patient: 'John Smith',
      room: 'ICU-001',
      time: '09:00 AM',
      priority: 'high',
      status: 'pending',
      notes: user?.role === 'doctor' ? 'Routine checkup post-surgery' : 'Administer medication and vital checks'
    },
    {
      id: 2,
      type: user?.role === 'doctor' ? 'surgery' : 'patient_care',
      patient: 'Jane Doe',
      room: 'OR-2',
      time: '11:30 AM',
      priority: 'critical',
      status: 'in_progress',
      notes: user?.role === 'doctor' ? 'Emergency appendectomy' : 'Pre-surgery patient preparation'
    },
    {
      id: 3,
      type: user?.role === 'doctor' ? 'consultation' : 'medication',
      patient: 'Mike Johnson',
      room: 'ER-005',
      time: '02:00 PM',
      priority: 'medium',
      status: 'completed',
      notes: user?.role === 'doctor' ? 'Follow-up for chest pain' : 'Pain medication administration'
    },
    {
      id: 4,
      type: user?.role === 'doctor' ? 'consultation' : 'vitals',
      patient: 'Sarah Wilson',
      room: 'GEN-012',
      time: '04:00 PM',
      priority: 'low',
      status: 'pending',
      notes: user?.role === 'doctor' ? 'Discharge consultation' : 'Hourly vital sign monitoring'
    }
  ];

  const workHours = [
    { date: '2025-01-01', hoursWorked: 8, scheduledHours: 12, overtime: 0 },
    { date: '2025-01-02', hoursWorked: 10, scheduledHours: 12, overtime: 0 },
    { date: '2025-01-03', hoursWorked: 12, scheduledHours: 8, overtime: 4 },
    { date: '2025-01-04', hoursWorked: 9, scheduledHours: 12, overtime: 0 },
    { date: '2025-01-05', hoursWorked: 6.5, scheduledHours: 12, overtime: 0 }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'text-yellow-600 bg-yellow-100',
      'in_progress': 'text-blue-600 bg-blue-100',
      'completed': 'text-green-600 bg-green-100',
      'high': 'text-red-600 bg-red-100',
      'medium': 'text-yellow-600 bg-yellow-100',
      'low': 'text-green-600 bg-green-100',
      'critical': 'text-red-600 bg-red-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'critical': 'text-red-600 bg-red-100',
      'high': 'text-orange-600 bg-orange-100',
      'medium': 'text-yellow-600 bg-yellow-100',
      'low': 'text-green-600 bg-green-100'
    };
    return colors[priority] || 'text-gray-600 bg-gray-100';
  };

  const handleTaskComplete = (taskId: number) => {
    // In real app, this would update the backend
    console.log('Completing task:', taskId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.role === 'doctor' ? 'Doctor' : 'Nurse'} Dashboard
              </h1>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Patients</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{todayStats.completedTasks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{todayStats.pendingTasks}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hours Worked</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.workHours}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-600">{todayStats.scheduledHours}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'assignments', name: user?.role === 'doctor' ? 'Consultations' : 'Patient Care' },
                { id: 'schedule', name: 'Schedule' },
                { id: 'hours', name: 'Work Hours' }
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
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h2>
              <div className="space-y-4">
                {assignments.filter(a => a.status === 'pending' || a.status === 'in_progress').slice(0, 4).map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <p className="font-medium text-gray-900">{assignment.patient}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                          {assignment.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{assignment.room} • {assignment.time}</p>
                      <p className="text-xs text-gray-500 mt-1">{assignment.notes}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                      {assignment.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Hours Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Work Hours</span>
                    <span className="text-sm text-gray-500">{todayStats.workHours} / {todayStats.scheduledHours} hours</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(todayStats.workHours / todayStats.scheduledHours) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Tasks Completed</span>
                    <span className="text-sm text-gray-500">{todayStats.completedTasks} / {todayStats.totalPatients}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(todayStats.completedTasks / todayStats.totalPatients) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Department Assignment</p>
                  <p className="font-medium text-gray-900">Emergency Department</p>
                  <p className="text-xs text-gray-500">Shift: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.role === 'doctor' ? 'Patient Consultations' : 'Patient Care Tasks'}
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{assignment.patient}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                          {assignment.priority} priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{assignment.room}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{assignment.time}</span>
                        </span>
                        <span className="capitalize">{assignment.type.replace('_', ' ')}</span>
                      </div>
                      <p className="text-gray-700">{assignment.notes}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {assignment.status === 'pending' && (
                        <button
                          onClick={() => handleTaskComplete(assignment.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          Start
                        </button>
                      )}
                      {assignment.status === 'in_progress' && (
                        <button
                          onClick={() => handleTaskComplete(assignment.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                        >
                          Complete
                        </button>
                      )}
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Schedule</h2>
            <div className="grid grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center">
                  <h3 className="font-medium text-gray-900 mb-2">{day}</h3>
                  <div className="space-y-2">
                    <div className="bg-blue-100 text-blue-800 p-2 rounded text-xs">
                      8:00 - 20:00
                    </div>
                    {day === 'Sat' || day === 'Sun' ? (
                      <div className="bg-gray-100 text-gray-600 p-2 rounded text-xs">
                        Off
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hours' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Work Hours Tracking</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worked</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workHours.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.scheduledHours}h</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{entry.hoursWorked}h</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.overtime}h</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.hoursWorked >= entry.scheduledHours ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                        }`}>
                          {entry.hoursWorked >= entry.scheduledHours ? 'Complete' : 'Incomplete'}
                        </span>
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

function MapPin({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}