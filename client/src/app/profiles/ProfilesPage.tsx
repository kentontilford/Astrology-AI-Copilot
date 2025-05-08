'use client';

import { useState } from 'react';
import { useProfiles } from '@/hooks/useProfiles';
import ProfileCard from '@/components/profiles/ProfileCard';
import ProfileForm from '@/components/profiles/ProfileForm';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

interface BirthProfile {
  id: number;
  name: string;
  birthDate: string;
  birthTime: string;
  latitude: number;
  longitude: number;
  location: string;
  notes?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilesPage() {
  const { profiles, loading, error, createProfile, updateProfile } = useProfiles();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BirthProfile | null>(null);
  
  const handleCreateSubmit = async (data: any) => {
    await createProfile(data);
    setShowCreateForm(false);
  };
  
  const handleEditSubmit = async (data: any) => {
    await updateProfile({
      ...data,
      id: editingProfile!.id,
    });
    setEditingProfile(null);
  };
  
  return (
    <main className="container mx-auto px-4 py-8">
      <SignedIn>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Birth Profiles</h1>
            {!showCreateForm && !editingProfile && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm hover:bg-indigo-700"
              >
                Create New Profile
              </button>
            )}
          </div>
          
          {showCreateForm && (
            <div className="mb-8 p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Create New Profile</h2>
              <ProfileForm
                onSubmit={handleCreateSubmit}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          )}
          
          {editingProfile && (
            <div className="mb-8 p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <ProfileForm
                profile={editingProfile}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditingProfile(null)}
              />
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading profiles...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              <p>Error loading profiles: {error.message}</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-8 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-lg mb-2">No Birth Profiles Yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first birth profile to get started with astrological insights.
              </p>
              {!showCreateForm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm hover:bg-indigo-700"
                >
                  Create First Profile
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {profiles.map(profile => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onEdit={setEditingProfile}
                />
              ))}
            </div>
          )}
        </div>
      </SignedIn>
      
      <SignedOut>
        <div className="max-w-md mx-auto text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Sign In to Manage Birth Profiles</h2>
          <p className="text-gray-600 mb-6">
            You need to sign in to create and manage your birth profiles.
          </p>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}