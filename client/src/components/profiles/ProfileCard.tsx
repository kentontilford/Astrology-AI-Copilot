import { useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useProfiles } from '@/hooks/useProfiles';

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

interface ProfileCardProps {
  profile: BirthProfile;
  onEdit: (profile: BirthProfile) => void;
}

export default function ProfileCard({ profile, onEdit }: ProfileCardProps) {
  const { deleteProfile, setDefaultProfile } = useProfiles();
  const [loading, setLoading] = useState(false);
  
  const formatBirthDateTime = (date: string, time: string) => {
    const formattedDate = format(new Date(date), 'MMMM d, yyyy');
    
    // Format time from HH:MM:SS to HH:MM AM/PM
    const timeParts = time.split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    return `${formattedDate} at ${hours}:${minutes} ${ampm}`;
  };
  
  const formatCoordinates = (latitude: number, longitude: number) => {
    const latDir = latitude >= 0 ? 'N' : 'S';
    const lonDir = longitude >= 0 ? 'E' : 'W';
    
    return `${Math.abs(latitude).toFixed(4)}° ${latDir}, ${Math.abs(longitude).toFixed(4)}° ${lonDir}`;
  };
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this profile?')) {
      return;
    }
    
    try {
      setLoading(true);
      await deleteProfile(profile.id);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting profile:', error);
      setLoading(false);
    }
  };
  
  const handleSetDefault = async () => {
    if (profile.isDefault) return;
    
    try {
      setLoading(true);
      await setDefaultProfile(profile.id);
      setLoading(false);
    } catch (error) {
      console.error('Error setting default profile:', error);
      setLoading(false);
    }
  };
  
  return (
    <div className={`rounded-lg border shadow-sm p-4 ${profile.isDefault ? 'border-indigo-500 bg-indigo-50/30' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold">
            {profile.name}
            {profile.isDefault && (
              <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-600">{formatBirthDateTime(profile.birthDate, profile.birthTime)}</p>
        </div>
        <div className="flex space-x-2">
          {!profile.isDefault && (
            <button
              onClick={handleSetDefault}
              disabled={loading}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Set as Default
            </button>
          )}
          <button
            onClick={() => onEdit(profile)}
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">{profile.location}</p>
      <p className="text-xs text-gray-500">{formatCoordinates(profile.latitude, profile.longitude)}</p>
      {profile.notes && (
        <p className="mt-2 text-sm text-gray-700">{profile.notes}</p>
      )}
      <div className="mt-3 flex gap-2">
        <Link
          href={`/dashboard/personal?profileId=${profile.id}`}
          className="text-xs px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          View Chart
        </Link>
        <Link
          href={`/dashboard/relationships?profileId=${profile.id}`}
          className="text-xs px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Relationships
        </Link>
      </div>
    </div>
  );
}