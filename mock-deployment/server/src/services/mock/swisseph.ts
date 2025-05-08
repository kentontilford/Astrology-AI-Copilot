/**
 * Mock Swiss Ephemeris service for development and testing
 * This provides fake data instead of actual astronomical calculations
 */

import { ZodiacSigns, Houses, PlanetPosition, Planets, Aspect, AspectType } from 'shared/src/types/astrology';

// Mock planet positions
export const calculatePlanetPositions = (birthDate: string, birthTime: string, latitude: number, longitude: number): PlanetPosition[] => {
  return [
    {
      planet: Planets.SUN,
      sign: ZodiacSigns.ARIES,
      house: Houses.FIRST,
      degree: 15,
      isRetrograde: false
    },
    {
      planet: Planets.MOON,
      sign: ZodiacSigns.CANCER,
      house: Houses.FOURTH,
      degree: 22,
      isRetrograde: false
    },
    // Add more planets as needed
  ];
};

// Mock aspects
export const calculateAspects = (planets: PlanetPosition[]): Aspect[] => {
  return [
    {
      aspectType: AspectType.CONJUNCTION,
      firstPlanet: Planets.SUN,
      secondPlanet: Planets.VENUS,
      orb: 2.5,
      applying: true
    },
    // Add more aspects as needed
  ];
};

// Mock houses
export const calculateHouses = (birthDate: string, birthTime: string, latitude: number, longitude: number) => {
  return {
    ascendant: {
      sign: ZodiacSigns.ARIES,
      degree: 5
    },
    midheaven: {
      sign: ZodiacSigns.CAPRICORN,
      degree: 15
    }
  };
};
