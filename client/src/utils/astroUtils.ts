export const ZODIAC_SIGNS = [
  { id: 1, name: 'Aries', symbol: '♈', element: 'fire', quality: 'cardinal', ruler: 'Mars', emoji: '🔥' },
  { id: 2, name: 'Taurus', symbol: '♉', element: 'earth', quality: 'fixed', ruler: 'Venus', emoji: '🌍' },
  { id: 3, name: 'Gemini', symbol: '♊', element: 'air', quality: 'mutable', ruler: 'Mercury', emoji: '💨' },
  { id: 4, name: 'Cancer', symbol: '♋', element: 'water', quality: 'cardinal', ruler: 'Moon', emoji: '💧' },
  { id: 5, name: 'Leo', symbol: '♌', element: 'fire', quality: 'fixed', ruler: 'Sun', emoji: '🔥' },
  { id: 6, name: 'Virgo', symbol: '♍', element: 'earth', quality: 'mutable', ruler: 'Mercury', emoji: '🌍' },
  { id: 7, name: 'Libra', symbol: '♎', element: 'air', quality: 'cardinal', ruler: 'Venus', emoji: '💨' },
  { id: 8, name: 'Scorpio', symbol: '♏', element: 'water', quality: 'fixed', ruler: 'Pluto', emoji: '💧' },
  { id: 9, name: 'Sagittarius', symbol: '♐', element: 'fire', quality: 'mutable', ruler: 'Jupiter', emoji: '🔥' },
  { id: 10, name: 'Capricorn', symbol: '♑', element: 'earth', quality: 'cardinal', ruler: 'Saturn', emoji: '🌍' },
  { id: 11, name: 'Aquarius', symbol: '♒', element: 'air', quality: 'fixed', ruler: 'Uranus', emoji: '💨' },
  { id: 12, name: 'Pisces', symbol: '♓', element: 'water', quality: 'mutable', ruler: 'Neptune', emoji: '💧' },
];

export const PLANETS = [
  { id: 0, name: 'Sun', symbol: '☉', emoji: '☀️' },
  { id: 1, name: 'Moon', symbol: '☽', emoji: '🌙' },
  { id: 2, name: 'Mercury', symbol: '☿', emoji: '☄️' },
  { id: 3, name: 'Venus', symbol: '♀', emoji: '💖' },
  { id: 4, name: 'Mars', symbol: '♂', emoji: '⚔️' },
  { id: 5, name: 'Jupiter', symbol: '♃', emoji: '🪐' },
  { id: 6, name: 'Saturn', symbol: '♄', emoji: '⏳' },
  { id: 7, name: 'Uranus', symbol: '♅', emoji: '⚡' },
  { id: 8, name: 'Neptune', symbol: '♆', emoji: '🌊' },
  { id: 9, name: 'Pluto', symbol: '♇', emoji: '🔮' },
  { id: 10, name: 'North Node', symbol: '☊', emoji: '🔼' },
  { id: 11, name: 'South Node', symbol: '☋', emoji: '🔽' },
  { id: 12, name: 'Lilith', symbol: '⚸', emoji: '🔥' },
  { id: 15, name: 'Chiron', symbol: '⚷', emoji: '🩹' },
];

export const HOUSES = [
  { id: 1, name: '1st House', rulership: 'Self, identity, appearance', sign: 'Aries' },
  { id: 2, name: '2nd House', rulership: 'Values, possessions, income', sign: 'Taurus' },
  { id: 3, name: '3rd House', rulership: 'Communication, siblings, local travel', sign: 'Gemini' },
  { id: 4, name: '4th House', rulership: 'Home, family, roots', sign: 'Cancer' },
  { id: 5, name: '5th House', rulership: 'Creativity, pleasure, children', sign: 'Leo' },
  { id: 6, name: '6th House', rulership: 'Work, health, service', sign: 'Virgo' },
  { id: 7, name: '7th House', rulership: 'Relationships, partnerships, open enemies', sign: 'Libra' },
  { id: 8, name: '8th House', rulership: 'Transformation, shared resources, sexuality', sign: 'Scorpio' },
  { id: 9, name: '9th House', rulership: 'Higher learning, philosophy, long-distance travel', sign: 'Sagittarius' },
  { id: 10, name: '10th House', rulership: 'Career, public reputation, authority', sign: 'Capricorn' },
  { id: 11, name: '11th House', rulership: 'Friends, groups, hopes and wishes', sign: 'Aquarius' },
  { id: 12, name: '12th House', rulership: 'Spirituality, subconscious, hidden matters', sign: 'Pisces' },
];

export const ASPECTS = [
  { id: 1, name: 'Conjunction', symbol: '☌', angle: 0, orb: 8, nature: 'Major', influence: 'Blending', color: '#FF0000' },
  { id: 2, name: 'Opposition', symbol: '☍', angle: 180, orb: 8, nature: 'Major', influence: 'Tension', color: '#0000FF' },
  { id: 3, name: 'Trine', symbol: '△', angle: 120, orb: 8, nature: 'Major', influence: 'Harmony', color: '#00FF00' },
  { id: 4, name: 'Square', symbol: '□', angle: 90, orb: 7, nature: 'Major', influence: 'Challenge', color: '#FF00FF' },
  { id: 5, name: 'Sextile', symbol: '⚹', angle: 60, orb: 6, nature: 'Major', influence: 'Opportunity', color: '#FFFF00' },
  { id: 6, name: 'Semisextile', symbol: '⚺', angle: 30, orb: 3, nature: 'Minor', influence: 'Subtle tension', color: '#00FFFF' },
  { id: 7, name: 'Quincunx', symbol: '⚻', angle: 150, orb: 3, nature: 'Minor', influence: 'Adjustment', color: '#FFA500' },
  { id: 8, name: 'Quintile', symbol: 'Q', angle: 72, orb: 2, nature: 'Minor', influence: 'Creativity', color: '#800080' },
];

// Get sign information by ID
export const getSignById = (signId: number) => {
  return ZODIAC_SIGNS.find(sign => sign.id === signId) || ZODIAC_SIGNS[0];
};

// Get planet information by ID
export const getPlanetById = (planetId: number) => {
  return PLANETS.find(planet => planet.id === planetId) || PLANETS[0];
};

// Get house information by ID
export const getHouseById = (houseId: number) => {
  return HOUSES.find(house => house.id === houseId) || HOUSES[0];
};

// Get aspect information by ID
export const getAspectById = (aspectId: number) => {
  return ASPECTS.find(aspect => aspect.id === aspectId) || ASPECTS[0];
};

// Convert decimal degrees to formatted DMS (degrees, minutes, seconds)
export const formatDegrees = (decimalDegrees: number) => {
  const totalSeconds = Math.abs(decimalDegrees * 3600);
  const degrees = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  return `${degrees}° ${minutes}' ${seconds}"`;
};

// Convert longitude to zodiac sign and degrees
export const longitudeToZodiac = (longitude: number) => {
  const signIndex = Math.floor(longitude / 30);
  const degreesInSign = longitude % 30;
  
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degrees: degreesInSign,
    formatted: `${ZODIAC_SIGNS[signIndex].symbol} ${Math.floor(degreesInSign)}° ${Math.floor((degreesInSign % 1) * 60)}'`
  };
};

// Format an aspect for display
export const formatAspect = (aspect: any) => {
  const aspectInfo = getAspectById(aspect.aspectType.id);
  const body1 = getPlanetById(aspect.body1.id);
  const body2 = getPlanetById(aspect.body2.id);
  
  return {
    name: `${body1.name} ${aspectInfo.name} ${body2.name}`,
    symbol: `${body1.symbol} ${aspectInfo.symbol} ${body2.symbol}`,
    orb: `${aspect.orb.toFixed(2)}°`,
    applying: aspect.isApplying ? 'Applying' : 'Separating',
    nature: aspectInfo.nature,
    influence: aspectInfo.influence,
    color: aspectInfo.color
  };
};

// Calculate element and modality distribution
export const calculateDistribution = (celestialBodies: any[]) => {
  const elements = {
    fire: 0,
    earth: 0,
    air: 0,
    water: 0
  };
  
  const modalities = {
    cardinal: 0,
    fixed: 0,
    mutable: 0
  };
  
  celestialBodies.forEach(body => {
    const sign = getSignById(body.sign);
    elements[sign.element as keyof typeof elements]++;
    modalities[sign.quality as keyof typeof modalities]++;
  });
  
  return { elements, modalities };
};

// Get a simple interpretation of a planet in a sign
export const interpretPlanetInSign = (planetId: number, signId: number) => {
  const planet = getPlanetById(planetId);
  const sign = getSignById(signId);
  
  const interpretations: any = {
    // Sun
    0: {
      1: 'Bold, confident, pioneering spirit',
      2: 'Steady, reliable, appreciates beauty and comfort',
      3: 'Curious, communicative, intellectual approach',
      4: 'Nurturing, emotionally sensitive, protective',
      5: 'Charismatic, creative, needs recognition',
      6: 'Analytical, detail-oriented, service-minded',
      7: 'Diplomatic, balanced, relationship-focused',
      8: 'Intense, transformative, mysterious',
      9: 'Optimistic, adventurous, philosophical',
      10: 'Ambitious, disciplined, responsible',
      11: 'Progressive, humanitarian, independent',
      12: 'Compassionate, intuitive, spiritually oriented'
    },
    // Moon
    1: {
      1: 'Emotionally direct, independent, impulsive feelings',
      2: 'Emotionally steady, security-focused, loyal',
      3: 'Intellectualizes emotions, needs communication',
      4: 'Deeply nurturing, emotionally sensitive, protective',
      5: 'Dramatic emotional expression, warm-hearted',
      6: 'Practical emotional responses, analytical feelings',
      7: 'Balanced emotions, needs harmony, relationship-focused',
      8: 'Deep, intense emotions, transformation through feelings',
      9: 'Optimistic emotions, needs freedom, adventure',
      10: 'Reserved emotional expression, responsible',
      11: 'Emotionally detached, humanitarian focus',
      12: 'Highly intuitive, sensitive, compassionate feelings'
    },
    // Mercury
    2: {
      1: 'Direct communication, quick thinking, assertive ideas',
      2: 'Methodical thinking, practical communication',
      3: 'Versatile mind, curious, excellent communication',
      4: 'Intuitive thinking, emotional communication',
      5: 'Creative thinking, dramatic communication',
      6: 'Analytical mind, detail-oriented, precise communication',
      7: 'Diplomatic communication, balanced thinking',
      8: 'Penetrating mind, investigative thinking',
      9: 'Philosophical thinking, expansive ideas',
      10: 'Structured thinking, practical communication',
      11: 'Innovative thinking, humanitarian ideas',
      12: 'Intuitive thinking, spiritual ideas'
    },
    // Venus
    3: {
      1: 'Bold in love, direct approach to relationships',
      2: 'Sensual, loyal, appreciates beauty and comfort',
      3: 'Intellectually stimulating relationships, communicative',
      4: 'Nurturing love style, emotionally attached',
      5: 'Romantic, passionate, dramatic in love',
      6: 'Practical approach to love, service-oriented',
      7: 'Harmonious relationships, diplomatic, balanced',
      8: 'Intense, transformative relationships',
      9: 'Freedom in love, adventurous relationships',
      10: 'Committed, responsible approach to relationships',
      11: 'Unconventional relationships, friendship-based love',
      12: 'Spiritual connection, compassionate love'
    },
    // Mars
    4: {
      1: 'Strong drive, assertive, pioneering energy',
      2: 'Steady, determined action, practical approach',
      3: 'Quick actions, versatile energy, mental drive',
      4: 'Emotionally driven action, protective energy',
      5: 'Creative drive, passionate action, confident',
      6: 'Efficient action, detail-oriented approach',
      7: 'Diplomatic actions, partnership-oriented drive',
      8: 'Powerful drive, transformative action',
      9: 'Adventurous energy, expansive actions',
      10: 'Disciplined action, ambitious drive',
      11: 'Innovative action, humanitarian drive',
      12: 'Subtle action, compassionate drive'
    }
  };
  
  // Return a generic interpretation if specific one isn't available
  if (!interpretations[planetId] || !interpretations[planetId][signId]) {
    return `${planet.name} in ${sign.name} brings together the energies of ${planet.name} and the qualities of ${sign.name} (${sign.element}, ${sign.quality}).`;
  }
  
  return interpretations[planetId][signId];
};

// Get a simple interpretation of a planet in a house
export const interpretPlanetInHouse = (planetId: number, houseId: number) => {
  const planet = getPlanetById(planetId);
  const house = getHouseById(houseId);
  
  const interpretations: any = {
    // Sun
    0: {
      1: 'Strong sense of self, identity is a key focus',
      2: 'Self-worth tied to resources and values',
      3: 'Identity expressed through communication',
      4: 'Identity tied to home and family matters',
      5: 'Creative self-expression, focus on pleasure',
      6: 'Identity tied to work and service',
      7: 'Identity found through relationships',
      8: 'Transformative identity, focus on shared resources',
      9: 'Identity expressed through higher learning',
      10: 'Identity tied to career and public reputation',
      11: 'Identity found through groups and friendships',
      12: 'Spiritual identity, focus on the subconscious'
    },
    // Moon
    1: {
      1: 'Emotional needs tied to self-expression',
      2: 'Emotional security through material resources',
      3: 'Emotional expression through communication',
      4: 'Deep emotional connection to home and family',
      5: 'Emotional fulfillment through creativity',
      6: 'Emotional satisfaction through service',
      7: 'Emotional needs met through relationships',
      8: 'Emotional transformation through intimacy',
      9: 'Emotional growth through higher learning',
      10: 'Emotional satisfaction through achievement',
      11: 'Emotional connection to friends and groups',
      12: 'Subconscious emotional patterns'
    }
  };
  
  // Return a generic interpretation if specific one isn't available
  if (!interpretations[planetId] || !interpretations[planetId][houseId]) {
    return `${planet.name} in the ${house.name} focuses the energy of ${planet.name} in the area of ${house.rulership}.`;
  }
  
  return interpretations[planetId][houseId];
};