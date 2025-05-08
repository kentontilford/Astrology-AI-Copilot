/**
 * Types for the Swiss Ephemeris calculations
 */

export interface CelestialBody {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  distance: number;
  longitudeSpeed: number;
  latitudeSpeed: number;
  distanceSpeed: number;
  house: number;
  sign: number;
  isRetrograde: boolean;
}

export interface HousePosition {
  id: number;
  longitude: number;
  sign: number;
}

export interface HouseSystem {
  id: string;
  name: string;
}

export interface CelestialBodyInfo {
  id: number;
  name: string;
  type: 'planet' | 'asteroid' | 'node' | 'point';
}

export interface AspectInfo {
  id: number;
  name: string;
  angle: number;
  orb: number;
  color: string;
  importance: number; // 1-10 scale, higher is more important
}

export interface Aspect {
  body1: CelestialBody;
  body2: CelestialBody;
  aspectType: AspectInfo;
  orb: number;
  isApplying: boolean;
}

export interface ChartCalculationOptions {
  date: Date;
  time: string; // HH:MM format
  latitude: number;
  longitude: number;
  houseSystem?: string; // Default 'P' (Placidus)
  includedBodies?: number[]; // Default all major planets
  includedAspects?: number[]; // Default major aspects
}

export interface ChartData {
  timestamp: Date;
  celestialBodies: CelestialBody[];
  houses: HousePosition[];
  aspects: Aspect[];
  ascendant: {
    longitude: number;
    sign: number;
  };
  midheaven: {
    longitude: number;
    sign: number;
  };
}

export interface TransitData {
  date: Date;
  celestialBodies: CelestialBody[];
  aspects: Aspect[]; // Aspects between transit and natal chart
}

export interface CompositeChartData extends ChartData {
  synastryAspects: Aspect[]; // Aspects between the two natal charts
}

export const HOUSE_SYSTEMS: { [key: string]: HouseSystem } = {
  P: { id: 'P', name: 'Placidus' },
  K: { id: 'K', name: 'Koch' },
  R: { id: 'R', name: 'Regiomontanus' },
  C: { id: 'C', name: 'Campanus' },
  E: { id: 'E', name: 'Equal' },
  W: { id: 'W', name: 'Whole Sign' },
  B: { id: 'B', name: 'Alcabitius' },
  M: { id: 'M', name: 'Morinus' },
  A: { id: 'A', name: 'Equal (Asc)' },
  V: { id: 'V', name: 'Vehlow Equal' },
  X: { id: 'X', name: 'Axial Rotation' },
  H: { id: 'H', name: 'Horizon/Azimuth' },
  T: { id: 'T', name: 'Polich/Page' },
  G: { id: 'G', name: 'Gauquelin' },
  i: { id: 'i', name: 'Sunshine' },
};

// Standard celestial bodies
export const CELESTIAL_BODIES: { [key: number]: CelestialBodyInfo } = {
  0: { id: 0, name: 'Sun', type: 'planet' },
  1: { id: 1, name: 'Moon', type: 'planet' },
  2: { id: 2, name: 'Mercury', type: 'planet' },
  3: { id: 3, name: 'Venus', type: 'planet' },
  4: { id: 4, name: 'Mars', type: 'planet' },
  5: { id: 5, name: 'Jupiter', type: 'planet' },
  6: { id: 6, name: 'Saturn', type: 'planet' },
  7: { id: 7, name: 'Uranus', type: 'planet' },
  8: { id: 8, name: 'Neptune', type: 'planet' },
  9: { id: 9, name: 'Pluto', type: 'planet' },
  10: { id: 10, name: 'Mean Node', type: 'node' },
  11: { id: 11, name: 'True Node', type: 'node' },
  12: { id: 12, name: 'Mean Apogee', type: 'point' },
  13: { id: 13, name: 'Oscu Apogee', type: 'point' },
  14: { id: 14, name: 'Earth', type: 'planet' },
  15: { id: 15, name: 'Chiron', type: 'asteroid' },
  16: { id: 16, name: 'Pholus', type: 'asteroid' },
  17: { id: 17, name: 'Ceres', type: 'asteroid' },
  18: { id: 18, name: 'Pallas', type: 'asteroid' },
  19: { id: 19, name: 'Juno', type: 'asteroid' },
  20: { id: 20, name: 'Vesta', type: 'asteroid' },
};

// Standard aspects
export const ASPECTS: { [key: number]: AspectInfo } = {
  1: { id: 1, name: 'Conjunction', angle: 0, orb: 8, color: '#FF0000', importance: 10 },
  2: { id: 2, name: 'Opposition', angle: 180, orb: 8, color: '#0000FF', importance: 9 },
  3: { id: 3, name: 'Trine', angle: 120, orb: 8, color: '#00FF00', importance: 8 },
  4: { id: 4, name: 'Square', angle: 90, orb: 7, color: '#FF00FF', importance: 7 },
  5: { id: 5, name: 'Sextile', angle: 60, orb: 6, color: '#FFFF00', importance: 6 },
  6: { id: 6, name: 'Semisextile', angle: 30, orb: 3, color: '#00FFFF', importance: 5 },
  7: { id: 7, name: 'Quincunx', angle: 150, orb: 3, color: '#FFA500', importance: 5 },
  8: { id: 8, name: 'Quintile', angle: 72, orb: 2, color: '#800080', importance: 4 },
  9: { id: 9, name: 'Biquintile', angle: 144, orb: 2, color: '#800080', importance: 4 },
  10: { id: 10, name: 'Semisquare', angle: 45, orb: 2, color: '#FF00FF', importance: 3 },
  11: { id: 11, name: 'Sesquiquadrate', angle: 135, orb: 2, color: '#FF00FF', importance: 3 },
};

// Zodiac signs
export const ZODIAC_SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];