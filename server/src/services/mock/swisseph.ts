/**
 * Mock Swiss Ephemeris service for development and testing
 * This provides fake data instead of actual astronomical calculations
 */

import { ZodiacSigns, Houses, PlanetPosition, Planets, Aspect, AspectType } from '../../types/astrology';

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
    {
      planet: Planets.MERCURY,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 10,
      isRetrograde: true
    },
    {
      planet: Planets.VENUS,
      sign: ZodiacSigns.TAURUS,
      house: Houses.SECOND,
      degree: 5,
      isRetrograde: false
    },
    {
      planet: Planets.MARS,
      sign: ZodiacSigns.GEMINI,
      house: Houses.THIRD,
      degree: 18,
      isRetrograde: false
    },
    {
      planet: Planets.JUPITER,
      sign: ZodiacSigns.SAGITTARIUS,
      house: Houses.NINTH,
      degree: 8,
      isRetrograde: false
    },
    {
      planet: Planets.SATURN,
      sign: ZodiacSigns.CAPRICORN,
      house: Houses.TENTH,
      degree: 25,
      isRetrograde: true
    },
    {
      planet: Planets.URANUS,
      sign: ZodiacSigns.AQUARIUS,
      house: Houses.ELEVENTH,
      degree: 2,
      isRetrograde: false
    },
    {
      planet: Planets.NEPTUNE,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 14,
      isRetrograde: false
    },
    {
      planet: Planets.PLUTO,
      sign: ZodiacSigns.SCORPIO,
      house: Houses.EIGHTH,
      degree: 19,
      isRetrograde: true
    }
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
    {
      aspectType: AspectType.SQUARE,
      firstPlanet: Planets.MOON,
      secondPlanet: Planets.MARS,
      orb: 1.8,
      applying: false
    },
    {
      aspectType: AspectType.TRINE,
      firstPlanet: Planets.JUPITER,
      secondPlanet: Planets.SATURN,
      orb: 3.2,
      applying: true
    },
    {
      aspectType: AspectType.OPPOSITION,
      firstPlanet: Planets.MERCURY,
      secondPlanet: Planets.NEPTUNE,
      orb: 4.1,
      applying: false
    }
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

// Mock transit calculations
export const calculateTransits = (birthPositions: PlanetPosition[], date: string): PlanetPosition[] => {
  return [
    {
      planet: Planets.SUN,
      sign: ZodiacSigns.TAURUS,
      house: Houses.SECOND,
      degree: 8,
      isRetrograde: false
    },
    {
      planet: Planets.MOON,
      sign: ZodiacSigns.LIBRA,
      house: Houses.SEVENTH,
      degree: 12,
      isRetrograde: false
    },
    {
      planet: Planets.MERCURY,
      sign: ZodiacSigns.GEMINI,
      house: Houses.THIRD,
      degree: 3,
      isRetrograde: false
    },
    {
      planet: Planets.VENUS,
      sign: ZodiacSigns.CANCER,
      house: Houses.FOURTH,
      degree: 25,
      isRetrograde: false
    },
    {
      planet: Planets.MARS,
      sign: ZodiacSigns.ARIES,
      house: Houses.FIRST,
      degree: 18,
      isRetrograde: false
    },
    {
      planet: Planets.JUPITER,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 10,
      isRetrograde: false
    },
    {
      planet: Planets.SATURN,
      sign: ZodiacSigns.AQUARIUS,
      house: Houses.ELEVENTH,
      degree: 22,
      isRetrograde: true
    },
    {
      planet: Planets.URANUS,
      sign: ZodiacSigns.TAURUS,
      house: Houses.SECOND,
      degree: 14,
      isRetrograde: false
    },
    {
      planet: Planets.NEPTUNE,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 24,
      isRetrograde: false
    },
    {
      planet: Planets.PLUTO,
      sign: ZodiacSigns.CAPRICORN,
      house: Houses.TENTH,
      degree: 26,
      isRetrograde: true
    }
  ];
};

// Mock composite chart
export const calculateComposite = (chart1: PlanetPosition[], chart2: PlanetPosition[]): PlanetPosition[] => {
  return [
    {
      planet: Planets.SUN,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 10,
      isRetrograde: false
    },
    {
      planet: Planets.MOON,
      sign: ZodiacSigns.VIRGO,
      house: Houses.SIXTH,
      degree: 15,
      isRetrograde: false
    },
    {
      planet: Planets.MERCURY,
      sign: ZodiacSigns.AQUARIUS,
      house: Houses.ELEVENTH,
      degree: 5,
      isRetrograde: false
    },
    {
      planet: Planets.VENUS,
      sign: ZodiacSigns.LIBRA,
      house: Houses.SEVENTH,
      degree: 18,
      isRetrograde: false
    },
    {
      planet: Planets.MARS,
      sign: ZodiacSigns.SCORPIO,
      house: Houses.EIGHTH,
      degree: 22,
      isRetrograde: false
    },
    {
      planet: Planets.JUPITER,
      sign: ZodiacSigns.LEO,
      house: Houses.FIFTH,
      degree: 8,
      isRetrograde: false
    },
    {
      planet: Planets.SATURN,
      sign: ZodiacSigns.TAURUS,
      house: Houses.SECOND,
      degree: 12,
      isRetrograde: true
    },
    {
      planet: Planets.URANUS,
      sign: ZodiacSigns.GEMINI,
      house: Houses.THIRD,
      degree: 25,
      isRetrograde: false
    },
    {
      planet: Planets.NEPTUNE,
      sign: ZodiacSigns.CANCER,
      house: Houses.FOURTH,
      degree: 6,
      isRetrograde: false
    },
    {
      planet: Planets.PLUTO,
      sign: ZodiacSigns.SAGITTARIUS,
      house: Houses.NINTH,
      degree: 19,
      isRetrograde: false
    }
  ];
};
