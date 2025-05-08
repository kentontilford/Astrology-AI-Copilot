import { BirthProfile } from './user';

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
}

export enum HouseSystems {
  WHOLE_SIGN = 'Whole Sign',
  PLACIDUS = 'Placidus',
  KOCH = 'Koch',
  EQUAL = 'Equal',
  PORPHYRY = 'Porphyry',
}

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
  PISCES = 'Pisces',
}

export enum Houses {
  FIRST = '1st',
  SECOND = '2nd',
  THIRD = '3rd',
  FOURTH = '4th',
  FIFTH = '5th',
  SIXTH = '6th',
  SEVENTH = '7th',
  EIGHTH = '8th',
  NINTH = '9th',
  TENTH = '10th',
  ELEVENTH = '11th',
  TWELFTH = '12th',
}

export enum AspectType {
  CONJUNCTION = 'Conjunction',
  SEXTILE = 'Sextile',
  SQUARE = 'Square',
  TRINE = 'Trine',
  OPPOSITION = 'Opposition',
  QUINCUNX = 'Quincunx',
  SEMISEXTILE = 'Semisextile',
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

export interface NatalChart {
  birthProfile: BirthProfile;
  planets: PlanetPosition[];
  aspects: Aspect[];
  ascendant: {
    sign: ZodiacSigns;
    degree: number;
  };
  midheaven: {
    sign: ZodiacSigns;
    degree: number;
  };
}

export interface TransitChart {
  date: string; // ISO format
  planets: PlanetPosition[];
  aspects: Aspect[]; // Aspects to natal chart
}

export interface CompositeChart {
  profileOne: BirthProfile;
  profileTwo: BirthProfile;
  planets: PlanetPosition[];
  aspects: Aspect[];
  ascendant: {
    sign: ZodiacSigns;
    degree: number;
  };
  midheaven: {
    sign: ZodiacSigns;
    degree: number;
  };
}

export interface DashboardInsight {
  id: string;
  title: string;
  description: string;
  favorability: 'very_favorable' | 'favorable' | 'neutral' | 'challenging' | 'very_challenging';
  relatedPlanets: Planets[];
  relatedSigns: ZodiacSigns[];
  aiInterpretation: string;
}

export interface PersonalDashboard {
  date: string;
  natalChart: NatalChart;
  transitChart: TransitChart;
  insights: DashboardInsight[];
}

export interface RelationshipDashboard {
  compositeChart: CompositeChart;
  insights: DashboardInsight[];
}