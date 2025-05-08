import * as swisseph from 'swisseph';
import path from 'path';
import fs from 'fs';
import { 
  ChartCalculationOptions, 
  ChartData,
  CelestialBody,
  HousePosition,
  Aspect,
  CELESTIAL_BODIES,
  ASPECTS,
  ZODIAC_SIGNS,
  HOUSE_SYSTEMS,
  TransitData,
  CompositeChartData
} from '../../types/ephemeris';

// Define path to ephemeris files
const ephemerisPath = process.env.EPHEMERIS_PATH || path.join(__dirname, '../../../ephemeris');

// Initialize Swiss Ephemeris with the ephemeris path
const initEphemeris = () => {
  // Check if ephemeris directory exists
  if (!fs.existsSync(ephemerisPath)) {
    console.warn(`Ephemeris files not found at ${ephemerisPath}. Using built-in ephemeris.`);
  } else {
    swisseph.swe_set_ephe_path(ephemerisPath);
  }
};

// Convert date and time to Julian Day
const getJulianDay = (date: Date, time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  const utcDate = new Date(date);
  utcDate.setHours(hours, minutes, 0, 0);
  
  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth() + 1;
  const day = utcDate.getUTCDate();
  const hour = utcDate.getUTCHours() + utcDate.getUTCMinutes() / 60;
  
  return swisseph.swe_julday(year, month, day, hour, swisseph.SEFLG_SWIEPH);
};

// Get celestial body position
const getCelestialBodyPosition = (julianDay: number, bodyId: number, geopos: number[]): CelestialBody => {
  const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;
  const bodyInfo = swisseph.swe_calc_ut(julianDay, bodyId, flag);
  
  // Calculate if the planet is retrograde based on its longitudinal speed
  const isRetrograde = bodyInfo.speedLong < 0;
  
  // Convert longitude to zodiac sign and degree
  const signIndex = Math.floor(bodyInfo.longitude / 30);
  const degreeInSign = bodyInfo.longitude % 30;
  
  // Initialize with placeholder house
  let house = 1;
  
  return {
    id: bodyId,
    name: CELESTIAL_BODIES[bodyId]?.name || `Body ${bodyId}`,
    longitude: bodyInfo.longitude,
    latitude: bodyInfo.latitude,
    distance: bodyInfo.distance,
    longitudeSpeed: bodyInfo.speedLong,
    latitudeSpeed: bodyInfo.speedLat,
    distanceSpeed: bodyInfo.speedDist,
    house: house, // Will be updated after house calculation
    sign: signIndex + 1,
    isRetrograde: isRetrograde
  };
};

// Calculate house cusps
const calculateHouses = (julianDay: number, latitude: number, longitude: number, houseSystem: string = 'P'): { houses: HousePosition[], ascendant: number, midheaven: number } => {
  const flag = swisseph.SEFLG_SIDEREAL;
  const geopos = [longitude, latitude, 0]; // longitude, latitude, elevation
  
  const housesResult = swisseph.swe_houses(julianDay, flag, latitude, longitude, houseSystem);
  
  // Extract house cusps and special points
  const houses: HousePosition[] = [];
  for (let i = 1; i <= 12; i++) {
    const longitude = housesResult.cusps[i];
    const signIndex = Math.floor(longitude / 30);
    
    houses.push({
      id: i,
      longitude: longitude,
      sign: signIndex + 1
    });
  }
  
  return {
    houses,
    ascendant: housesResult.ascendant,
    midheaven: housesResult.mc
  };
};

// Assign houses to celestial bodies
const assignHousesToBodies = (bodies: CelestialBody[], houses: HousePosition[]): CelestialBody[] => {
  return bodies.map(body => {
    let houseIndex = 0;
    
    // Find which house the body belongs to
    for (let i = 0; i < 12; i++) {
      const currentHouse = houses[i];
      const nextHouse = houses[(i + 1) % 12];
      
      // Handle the case where the house spans the 0° Aries point
      if (currentHouse.longitude > nextHouse.longitude) {
        if (body.longitude >= currentHouse.longitude || body.longitude < nextHouse.longitude) {
          houseIndex = i;
          break;
        }
      } else {
        if (body.longitude >= currentHouse.longitude && body.longitude < nextHouse.longitude) {
          houseIndex = i;
          break;
        }
      }
    }
    
    return {
      ...body,
      house: houseIndex + 1
    };
  });
};

// Calculate aspects between celestial bodies
const calculateAspects = (bodies: CelestialBody[], aspectsToInclude: number[] = Object.keys(ASPECTS).map(Number)): Aspect[] => {
  const aspects: Aspect[] = [];
  
  // Compare each pair of bodies
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const body1 = bodies[i];
      const body2 = bodies[j];
      
      // Calculate the angular difference
      let diff = Math.abs(body1.longitude - body2.longitude);
      if (diff > 180) diff = 360 - diff;
      
      // Check against each aspect
      for (const aspectId of aspectsToInclude) {
        const aspect = ASPECTS[aspectId];
        if (!aspect) continue;
        
        const orb = Math.abs(diff - aspect.angle);
        if (orb <= aspect.orb) {
          // Determine if the aspect is applying or separating
          const isApplying = (body1.longitudeSpeed < body2.longitudeSpeed);
          
          aspects.push({
            body1,
            body2,
            aspectType: aspect,
            orb,
            isApplying
          });
          
          break; // Found an aspect, no need to check others
        }
      }
    }
  }
  
  return aspects;
};

// Calculate a natal chart
export const calculateNatalChart = (options: ChartCalculationOptions): ChartData => {
  initEphemeris();
  
  const { 
    date, 
    time, 
    latitude, 
    longitude, 
    houseSystem = 'P',
    includedBodies = Object.keys(CELESTIAL_BODIES).map(Number).slice(0, 10), // Default to main planets
  } = options;
  
  // Calculate Julian Day
  const julianDay = getJulianDay(date, time);
  
  // Calculate houses
  const { houses, ascendant, midheaven } = calculateHouses(julianDay, latitude, longitude, houseSystem);
  
  // Calculate positions for all requested celestial bodies
  const geopos = [longitude, latitude, 0];
  const bodies: CelestialBody[] = includedBodies.map(bodyId => 
    getCelestialBodyPosition(julianDay, bodyId, geopos)
  );
  
  // Assign houses to bodies
  const bodiesWithHouses = assignHousesToBodies(bodies, houses);
  
  // Calculate aspects
  const aspects = calculateAspects(bodiesWithHouses);
  
  // Format ascendant and midheaven
  const ascSignIndex = Math.floor(ascendant / 30);
  const mcSignIndex = Math.floor(midheaven / 30);
  
  return {
    timestamp: date,
    celestialBodies: bodiesWithHouses,
    houses,
    aspects,
    ascendant: {
      longitude: ascendant,
      sign: ascSignIndex + 1
    },
    midheaven: {
      longitude: midheaven,
      sign: mcSignIndex + 1
    }
  };
};

// Calculate transit chart
export const calculateTransits = (birthChart: ChartData, transitDate: Date): TransitData => {
  initEphemeris();
  
  // Use noon as the time for transits if not specified
  const transitTime = '12:00';
  
  // Calculate Julian Day for transit
  const julianDay = getJulianDay(transitDate, transitTime);
  
  // Get the same bodies as in the birth chart
  const birthBodies = birthChart.celestialBodies;
  const bodyIds = birthBodies.map(body => body.id);
  
  // Calculate positions for all celestial bodies at transit time
  const geopos = [0, 0, 0]; // Not needed for transit calculations
  const transitBodies: CelestialBody[] = bodyIds.map(bodyId => 
    getCelestialBodyPosition(julianDay, bodyId, geopos)
  );
  
  // Calculate aspects between transit and natal planets
  const aspects: Aspect[] = [];
  
  for (const transitBody of transitBodies) {
    for (const natalBody of birthBodies) {
      // Don't calculate aspects between the same body type
      // e.g., transit Sun to natal Sun, unless it's the luminaries (Sun and Moon)
      if (transitBody.id === natalBody.id && transitBody.id > 1) continue;
      
      // Calculate the angular difference
      let diff = Math.abs(transitBody.longitude - natalBody.longitude);
      if (diff > 180) diff = 360 - diff;
      
      // Check against each aspect
      for (const aspectId in ASPECTS) {
        const aspect = ASPECTS[Number(aspectId)];
        const orb = Math.abs(diff - aspect.angle);
        
        // Use tighter orbs for transits
        const transitOrb = aspect.orb * 0.7;
        
        if (orb <= transitOrb) {
          aspects.push({
            body1: natalBody,
            body2: transitBody,
            aspectType: aspect,
            orb,
            isApplying: true // Simplified for transits
          });
          
          break; // Found an aspect, no need to check others
        }
      }
    }
  }
  
  return {
    date: transitDate,
    celestialBodies: transitBodies,
    aspects
  };
};

// Calculate composite chart (midpoint method)
export const calculateCompositeChart = (chart1: ChartData, chart2: ChartData): CompositeChartData => {
  // Create midpoint bodies
  const compositeBodies: CelestialBody[] = [];
  
  // Map of bodies by ID for easier access
  const chart1BodiesMap = new Map(chart1.celestialBodies.map(body => [body.id, body]));
  const chart2BodiesMap = new Map(chart2.celestialBodies.map(body => [body.id, body]));
  
  // Get common body IDs
  const bodyIds = Array.from(new Set([
    ...chart1.celestialBodies.map(b => b.id),
    ...chart2.celestialBodies.map(b => b.id)
  ]));
  
  // Calculate midpoints for each body
  for (const bodyId of bodyIds) {
    const body1 = chart1BodiesMap.get(bodyId);
    const body2 = chart2BodiesMap.get(bodyId);
    
    // Skip if one of the charts doesn't have this body
    if (!body1 || !body2) continue;
    
    // Calculate midpoint of longitude
    let longitude1 = body1.longitude;
    let longitude2 = body2.longitude;
    
    // Adjust if crossing 0° Aries
    if (Math.abs(longitude1 - longitude2) > 180) {
      if (longitude1 < longitude2) {
        longitude1 += 360;
      } else {
        longitude2 += 360;
      }
    }
    
    const midLongitude = (longitude1 + longitude2) / 2 % 360;
    const signIndex = Math.floor(midLongitude / 30);
    
    // Simplified composite body
    compositeBodies.push({
      id: bodyId,
      name: body1.name,
      longitude: midLongitude,
      latitude: (body1.latitude + body2.latitude) / 2,
      distance: (body1.distance + body2.distance) / 2,
      longitudeSpeed: 0, // Not relevant for composite
      latitudeSpeed: 0,
      distanceSpeed: 0,
      house: 1, // Will be recalculated
      sign: signIndex + 1,
      isRetrograde: false // Not relevant for composite
    });
  }
  
  // Create composite houses (simplified)
  const compositeHouses: HousePosition[] = [];
  
  // Make sure both charts have houses data
  if (chart1.houses.length > 0 && chart2.houses.length > 0) {
    for (let i = 0; i < 12; i++) {
      const house1 = chart1.houses[i];
      const house2 = chart2.houses[i];
      
      let longitude1 = house1.longitude;
      let longitude2 = house2.longitude;
      
      // Adjust if crossing 0° Aries
      if (Math.abs(longitude1 - longitude2) > 180) {
        if (longitude1 < longitude2) {
          longitude1 += 360;
        } else {
          longitude2 += 360;
        }
      }
      
      const midLongitude = (longitude1 + longitude2) / 2 % 360;
      const signIndex = Math.floor(midLongitude / 30);
      
      compositeHouses.push({
        id: i + 1,
        longitude: midLongitude,
        sign: signIndex + 1
      });
    }
  }
  
  // Assign houses to bodies
  const bodiesWithHouses = assignHousesToBodies(compositeBodies, compositeHouses);
  
  // Calculate aspects within the composite chart
  const aspects = calculateAspects(bodiesWithHouses);
  
  // Calculate midpoint of ascendants
  let asc1 = chart1.ascendant.longitude;
  let asc2 = chart2.ascendant.longitude;
  
  // Adjust if crossing 0° Aries
  if (Math.abs(asc1 - asc2) > 180) {
    if (asc1 < asc2) {
      asc1 += 360;
    } else {
      asc2 += 360;
    }
  }
  
  const midAscendant = (asc1 + asc2) / 2 % 360;
  const ascSignIndex = Math.floor(midAscendant / 30);
  
  // Calculate midpoint of midheavens
  let mc1 = chart1.midheaven.longitude;
  let mc2 = chart2.midheaven.longitude;
  
  // Adjust if crossing 0° Aries
  if (Math.abs(mc1 - mc2) > 180) {
    if (mc1 < mc2) {
      mc1 += 360;
    } else {
      mc2 += 360;
    }
  }
  
  const midMidheaven = (mc1 + mc2) / 2 % 360;
  const mcSignIndex = Math.floor(midMidheaven / 30);
  
  // Calculate synastry aspects (aspects between both charts)
  const synastryAspects: Aspect[] = [];
  
  for (const body1 of chart1.celestialBodies) {
    for (const body2 of chart2.celestialBodies) {
      // Skip aspects between the same body
      if (body1.id === body2.id) continue;
      
      // Calculate the angular difference
      let diff = Math.abs(body1.longitude - body2.longitude);
      if (diff > 180) diff = 360 - diff;
      
      // Check against each aspect
      for (const aspectId in ASPECTS) {
        const aspect = ASPECTS[Number(aspectId)];
        const orb = Math.abs(diff - aspect.angle);
        
        if (orb <= aspect.orb) {
          synastryAspects.push({
            body1,
            body2,
            aspectType: aspect,
            orb,
            isApplying: false // Not relevant for synastry
          });
          
          break; // Found an aspect, no need to check others
        }
      }
    }
  }
  
  return {
    timestamp: new Date(), // Current date as composite time
    celestialBodies: bodiesWithHouses,
    houses: compositeHouses,
    aspects,
    synastryAspects,
    ascendant: {
      longitude: midAscendant,
      sign: ascSignIndex + 1
    },
    midheaven: {
      longitude: midMidheaven,
      sign: mcSignIndex + 1
    }
  };
};

// Clean up ephemeris when shutting down
export const closeEphemeris = () => {
  swisseph.swe_close();
};

// Initialize ephemeris when this module is loaded
initEphemeris();