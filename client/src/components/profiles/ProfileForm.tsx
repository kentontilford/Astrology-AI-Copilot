import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

interface ProfileFormProps {
  onSubmit: (data: any) => Promise<void>;
  profile?: BirthProfile;
  onCancel: () => void;
}

export default function ProfileForm({ onSubmit, profile, onCancel }: ProfileFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: profile ? {
      ...profile,
      birthDate: profile.birthDate,
      birthTime: profile.birthTime ? profile.birthTime.substr(0, 5) : '',
    } : {
      name: '',
      birthDate: '',
      birthTime: '',
      latitude: '',
      longitude: '',
      location: '',
      notes: '',
      isDefault: false,
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [locationSearchResults, setLocationSearchResults] = useState<any[]>([]);
  const [searchingLocation, setSearchingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Monitor the location field for search
  const locationValue = watch('location');
  
  // Handle form submission
  const handleFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      await onSubmit(data);
      setLoading(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to save profile. Please try again.');
      setLoading(false);
    }
  };
  
  // Search for locations using a geocoding API
  const searchLocation = async (query: string) => {
    if (!query || query.length < 3) {
      setLocationSearchResults([]);
      return;
    }
    
    try {
      setSearchingLocation(true);
      // Implement the API call to a geocoding service like Google Places API or Mapbox
      // For this example, we're using mock data
      setTimeout(() => {
        const mockResults = [
          { id: 1, name: 'New York, NY, USA', lat: 40.7128, lng: -74.0060 },
          { id: 2, name: 'New Orleans, LA, USA', lat: 29.9511, lng: -90.0715 },
          { id: 3, name: 'New Delhi, India', lat: 28.6139, lng: 77.2090 },
        ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        
        setLocationSearchResults(mockResults);
        setSearchingLocation(false);
      }, 500);
    } catch (err) {
      console.error('Error searching location:', err);
      setSearchingLocation(false);
    }
  };
  
  // Select a location from search results
  const selectLocation = (location: any) => {
    setValue('location', location.name);
    setValue('latitude', location.lat);
    setValue('longitude', location.lng);
    setLocationSearchResults([]);
  };
  
  // Helper to set form values
  const setValue = (field: string, value: any) => {
    const event = {
      target: {
        name: field,
        value: value
      }
    };
    register(field).onChange(event);
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="E.g., My Birth Chart, John Doe"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Birth Date</label>
          <input
            type="date"
            {...register('birthDate', { required: 'Birth date is required' })}
            className="w-full rounded-md border border-gray-300 p-2"
          />
          {errors.birthDate && (
            <p className="text-red-500 text-xs mt-1">{errors.birthDate.message as string}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Birth Time</label>
          <input
            type="time"
            {...register('birthTime', { required: 'Birth time is required' })}
            className="w-full rounded-md border border-gray-300 p-2"
          />
          {errors.birthTime && (
            <p className="text-red-500 text-xs mt-1">{errors.birthTime.message as string}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          {...register('location', { required: 'Location is required' })}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="City, State, Country"
          onChange={(e) => {
            register('location').onChange(e);
            searchLocation(e.target.value);
          }}
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location.message as string}</p>
        )}
        
        {/* Location search results */}
        {locationSearchResults.length > 0 && (
          <div className="mt-1 border rounded-md shadow-sm bg-white z-10 absolute w-full max-w-md">
            <ul className="py-1">
              {locationSearchResults.map(location => (
                <li
                  key={location.id}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => selectLocation(location)}
                >
                  {location.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="number"
            step="0.0001"
            {...register('latitude', { 
              required: 'Latitude is required',
              min: { value: -90, message: 'Latitude must be between -90 and 90' },
              max: { value: 90, message: 'Latitude must be between -90 and 90' }
            })}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="E.g., 40.7128"
          />
          {errors.latitude && (
            <p className="text-red-500 text-xs mt-1">{errors.latitude.message as string}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            type="number"
            step="0.0001"
            {...register('longitude', { 
              required: 'Longitude is required',
              min: { value: -180, message: 'Longitude must be between -180 and 180' },
              max: { value: 180, message: 'Longitude must be between -180 and 180' }
            })}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="E.g., -74.0060"
          />
          {errors.longitude && (
            <p className="text-red-500 text-xs mt-1">{errors.longitude.message as string}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
        <textarea
          {...register('notes')}
          className="w-full rounded-md border border-gray-300 p-2"
          rows={3}
          placeholder="Any additional information about this birth chart"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('isDefault')}
          id="isDefault"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
          Set as default profile
        </label>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
}