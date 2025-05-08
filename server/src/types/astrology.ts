/**
 * Astrology type definitions
 */

export enum ZodiacSigns {
  ARIES = 'Aries',
  TAURUS = 'Taurus',
  GEMINI = 'Gemini',
  CANCER = 'Cancer',
  LEO = 'Leo',
  VIRGO = 'Virgo',
  LIBRA = 'Libra',
  SCORPIO = 'Scorpio',
  SAGITTARIUS = 'Sagittarius',
  CAPRICORN = 'Capricorn',
  AQUARIUS = 'Aquarius',
  PISCES = 'Pisces'
}

export enum Houses {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
  SIXTH = 6,
  SEVENTH = 7,
  EIGHTH = 8,
  NINTH = 9,
  TENTH = 10,
  ELEVENTH = 11,
  TWELFTH = 12
}

export enum Planets {
  SUN = 'Sun',
  MOON = 'Moon',
  MERCURY = 'Mercury',
  VENUS = 'Venus',
  MARS = 'Mars',
  JUPITER = 'Jupiter',
  SATURN = 'Saturn',
  URANUS = 'Uranus',
  NEPTUNE = 'Neptune',
  PLUTO = 'Pluto',
  NORTH_NODE = 'North Node',
  SOUTH_NODE = 'South Node',
  CHIRON = 'Chiron'
}

export enum AspectType {
  CONJUNCTION = 'Conjunction',
  SEXTILE = 'Sextile',
  SQUARE = 'Square',
  TRINE = 'Trine',
  OPPOSITION = 'Opposition',
  QUINCUNX = 'Quincunx',
  SEMISEXTILE = 'Semisextile'
}

export interface PlanetPosition {
  planet: Planets;
  sign: ZodiacSigns;
  house: Houses;
  degree: number;
  isRetrograde: boolean;
}

export interface Aspect {
  aspectType: AspectType;
  firstPlanet: Planets;
  secondPlanet: Planets;
  orb: number;
  applying: boolean;
}

export interface ChartPoint {
  sign: ZodiacSigns;
  degree: number;
}

export interface BirthChart {
  planets: PlanetPosition[];
  houses: ChartPoint[];
  ascendant: ChartPoint;
  midheaven: ChartPoint;
  aspects: Aspect[];
}

export interface BirthData {
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  location: string;
}

export interface TransitChart {
  date: string;
  planets: PlanetPosition[];
  aspects: Aspect[];
}

export interface CompositeChart {
  planets: PlanetPosition[];
  houses: ChartPoint[];
  aspects: Aspect[];
}