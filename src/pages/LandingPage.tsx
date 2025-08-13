import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, MapPin } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">HealthConnect</h1>
            </div>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing Healthcare
            <span className="text-blue-600 block">Emergency Management</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline ambulance operations, optimize hospital resources, and enhance patient care 
            with our integrated healthcare management platform.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Live ambulance location tracking and route optimization for faster response times.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Resource Management</h3>
              <p className="text-gray-600">
                Intelligent bed allocation and staff scheduling to maximize hospital efficiency.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Coordination</h3>
              <p className="text-gray-600">
                Seamless communication between drivers, doctors, and hospital administrators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Options */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Access Your Portal
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Ambulance Driver</h4>
              <p className="text-gray-600 text-sm mb-4">
                Update pickup status and share live location
              </p>
              <Link
                to="/login?role=ambulance_driver"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Driver Portal →
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Hospital Admin</h4>
              <p className="text-gray-600 text-sm mb-4">
                Manage resources and track all operations
              </p>
              <Link
                to="/login?role=hospital_admin"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Admin Portal →
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Medical Staff</h4>
              <p className="text-gray-600 text-sm mb-4">
                View assignments and track work hours
              </p>
              <Link
                to="/login?role=doctor"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Staff Portal →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold">HealthConnect</span>
          </div>
          <p className="text-gray-400">
            © 2025 HealthConnect. Improving healthcare one connection at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}