"use client";

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Card';
import { User, Mail, Building, Calendar, Shield, Key } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">View and manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <Card variant="glass" className="p-6 lg:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.company && (
              <p className="text-sm text-gray-500 mt-1">{user.company}</p>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Account Status:</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Key className="w-4 h-4 text-blue-600" />
              <span className="text-gray-600">Account Type:</span>
              <span className="font-medium text-blue-600">Premium</span>
            </div>
          </div>
        </Card>

        {/* Account Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{user.company || 'Not specified'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">Recently joined</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Statistics */}
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-sm text-blue-600">Reports Generated</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-green-600">Data Queries</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-purple-600">Uptime</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-orange-600">Active Projects</div>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Logged into dashboard</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Generated monthly report</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Updated profile settings</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}