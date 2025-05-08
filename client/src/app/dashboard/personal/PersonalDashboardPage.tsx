'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProfiles } from '@/hooks/useProfiles';
import { useAstroData } from '@/hooks/useAstroData';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import ChartWheel from '@/components/charts/ChartWheel';
import ChartTable from '@/components/charts/ChartTable';
import { 
  getSignById, 
  getPlanetById, 
  interpretPlanetInSign,
  interpretPlanetInHouse,
  calculateDistribution 
} from '@/utils/astroUtils';

export default function PersonalDashboardPage() {
  const searchParams = useSearchParams();
  const profileIdParam = searchParams.get('profileId');
  
  const { profiles, defaultProfile, loading: profilesLoading } = useProfiles();
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(profileIdParam);
  
  const { 
    natalChart, 
    transitChart, 
    isLoading, 
    error, 
    fetchNatalChart 
  } = useAstroData(selectedProfileId);
  
  const [activeTab, setActiveTab] = useState('chart');
  
  // Set selected profile when profiles are loaded
  useEffect(() => {
    if (profileIdParam) {
      setSelectedProfileId(profileIdParam);
    } else if (defaultProfile && !selectedProfileId) {
      setSelectedProfileId(defaultProfile.id.toString());
    }
  }, [profileIdParam, defaultProfile, profiles]);
  
  // Handle profile change
  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfileId(e.target.value);
  };
  
  // Get selected profile
  const selectedProfile = profiles.find(p => p.id.toString() === selectedProfileId) || defaultProfile;
  
  // Calculate element and modality distribution
  const distribution = natalChart?.celestialBodies ? 
    calculateDistribution(natalChart.celestialBodies) : null;
  
  return (
    <SignedIn>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Personal Birth Chart Dashboard</h1>
          
          {/* Profile selector */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="profile-select" className="text-sm font-medium text-gray-700">
              Select Birth Profile:
            </label>
            <select
              id="profile-select"
              value={selectedProfileId || ''}
              onChange={handleProfileChange}
              className="rounded-md border border-gray-300 p-2"
              disabled={profilesLoading || isLoading}
            >
              {profiles.length === 0 && (
                <option value="">No profiles available</option>
              )}
              {profiles.map(profile => (
                <option key={profile.id} value={profile.id}>
                  {profile.name} {profile.isDefault ? '(Default)' : ''}
                </option>
              ))}
            </select>
            
            <Link
              href="/profiles"
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              Manage Profiles
            </Link>
          </div>
          
          {/* Error display */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
              <p>Error: {error.message}</p>
            </div>
          )}
          
          {/* Loading state */}
          {(profilesLoading || isLoading) && (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading chart data...</p>
            </div>
          )}
          
          {/* No profiles message */}
          {!profilesLoading && profiles.length === 0 && (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-lg mb-2">No Birth Profiles Yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first birth profile to see your astrological chart.
              </p>
              <Link
                href="/profiles"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm hover:bg-indigo-700"
              >
                Create Profile
              </Link>
            </div>
          )}
        </div>
        
        {/* Chart display */}
        {selectedProfile && natalChart && (
          <div>
            {/* Profile info */}
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-2">{selectedProfile.name}</h2>
              <p className="text-gray-600">
                Born on {new Date(selectedProfile.birthDate).toLocaleDateString()} at {selectedProfile.birthTime}
              </p>
              <p className="text-gray-600">
                {selectedProfile.location}
              </p>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('chart')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'chart'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Chart Wheel
                </button>
                <button
                  onClick={() => setActiveTab('positions')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'positions'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Positions
                </button>
                <button
                  onClick={() => setActiveTab('interpretations')}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === 'interpretations'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Interpretations
                </button>
              </nav>
            </div>
            
            {/* Tab content */}
            <div>
              {activeTab === 'chart' && (
                <div className="mx-auto max-w-3xl">
                  <ChartWheel chartData={natalChart} size={600} />
                  
                  {/* Element and Modality Distribution */}
                  {distribution && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Element Distribution</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-red-200 rounded-full mr-2"></span>
                            <span>Fire: {distribution.elements.fire}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-green-200 rounded-full mr-2"></span>
                            <span>Earth: {distribution.elements.earth}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-blue-200 rounded-full mr-2"></span>
                            <span>Air: {distribution.elements.air}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-indigo-200 rounded-full mr-2"></span>
                            <span>Water: {distribution.elements.water}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Modality Distribution</h3>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-purple-200 rounded-full mr-2"></span>
                            <span>Cardinal: {distribution.modalities.cardinal}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-yellow-200 rounded-full mr-2"></span>
                            <span>Fixed: {distribution.modalities.fixed}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-teal-200 rounded-full mr-2"></span>
                            <span>Mutable: {distribution.modalities.mutable}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'positions' && (
                <div>
                  <ChartTable chartData={natalChart} />
                </div>
              )}
              
              {activeTab === 'interpretations' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Key Placements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Sun, Moon, Ascendant */}
                      {natalChart.celestialBodies
                        .filter((body: any) => [0, 1].includes(body.id)) // Sun and Moon
                        .map((body: any) => {
                          const planet = getPlanetById(body.id);
                          const sign = getSignById(body.sign);
                          const house = getHouseById(body.house);
                          
                          return (
                            <div key={body.id} className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-medium text-lg flex items-center">
                                <span className="mr-2">{planet.emoji}</span>
                                {planet.name} in {sign.name}
                              </h4>
                              <p className="text-gray-600 mt-1">
                                {house.name} {sign.emoji}
                              </p>
                              <p className="mt-3">
                                {interpretPlanetInSign(body.id, body.sign)}
                              </p>
                              <p className="mt-2">
                                {interpretPlanetInHouse(body.id, body.house)}
                              </p>
                            </div>
                          );
                        })}
                      
                      {/* Ascendant */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-lg flex items-center">
                          <span className="mr-2">⬆️</span>
                          Ascendant in {getSignById(natalChart.ascendant.sign).name}
                        </h4>
                        <p className="text-gray-600 mt-1">
                          Rising Sign {getSignById(natalChart.ascendant.sign).emoji}
                        </p>
                        <p className="mt-3">
                          Your Ascendant in {getSignById(natalChart.ascendant.sign).name} shapes your outward personality and how others perceive you. It represents your physical appearance and the way you interact with the world.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Personal Planets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Mercury, Venus, Mars */}
                      {natalChart.celestialBodies
                        .filter((body: any) => [2, 3, 4].includes(body.id))
                        .map((body: any) => {
                          const planet = getPlanetById(body.id);
                          const sign = getSignById(body.sign);
                          const house = getHouseById(body.house);
                          
                          return (
                            <div key={body.id} className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-medium text-lg flex items-center">
                                <span className="mr-2">{planet.emoji}</span>
                                {planet.name} in {sign.name}
                                {body.isRetrograde && (
                                  <span className="ml-2 text-xs bg-red-100 text-red-800 rounded-full px-2 py-1">
                                    Retrograde
                                  </span>
                                )}
                              </h4>
                              <p className="text-gray-600 mt-1">
                                {house.name} {sign.emoji}
                              </p>
                              <p className="mt-3">
                                {interpretPlanetInSign(body.id, body.sign)}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3">Major Aspects</h3>
                    <div className="space-y-4">
                      {natalChart.aspects
                        .filter((aspect: any) => aspect.aspectType.importance >= 7)
                        .slice(0, 5)
                        .map((aspect: any, index: number) => {
                          const body1 = getPlanetById(aspect.body1.id);
                          const body2 = getPlanetById(aspect.body2.id);
                          const aspectType = aspect.aspectType;
                          
                          return (
                            <div 
                              key={index}
                              className="p-4 bg-gray-50 rounded-lg border-l-4"
                              style={{ borderLeftColor: aspectType.color }}
                            >
                              <h4 className="font-medium">
                                {body1.name} {aspectType.name} {body2.name} ({aspect.orb.toFixed(1)}°)
                              </h4>
                              <p className="mt-2">
                                This {aspectType.name} represents a {aspectType.influence.toLowerCase()} energy between your {body1.name} and {body2.name}, affecting how these planetary energies interact in your chart.
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SignedIn>
    
    <SignedOut>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign In to Access Your Dashboard</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Please sign in to view your personal birth chart and astrological insights.
        </p>
        <SignInButton mode="modal">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            Sign In
          </button>
        </SignInButton>
      </div>
    </SignedOut>
  );
}