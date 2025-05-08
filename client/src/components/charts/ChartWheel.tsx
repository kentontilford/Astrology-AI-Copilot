'use client';

import { useEffect, useRef } from 'react';
import { 
  getSignById, 
  getPlanetById, 
  getHouseById, 
  longitudeToZodiac,
  ZODIAC_SIGNS
} from '@/utils/astroUtils';

interface ChartWheelProps {
  chartData: any;
  size?: number;
}

const ChartWheel: React.FC<ChartWheelProps> = ({ chartData, size = 600 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!chartData || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    
    // Define dimensions
    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = size * 0.45;
    const innerRadius = outerRadius * 0.6;
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Draw zodiac wheel
    drawZodiacWheel(ctx, centerX, centerY, outerRadius, innerRadius);
    
    // Draw house cusps
    if (chartData.houses && chartData.houses.length) {
      drawHouseCusps(ctx, chartData.houses, centerX, centerY, outerRadius);
    }
    
    // Draw planets
    if (chartData.celestialBodies && chartData.celestialBodies.length) {
      drawPlanets(ctx, chartData.celestialBodies, centerX, centerY, innerRadius * 0.8);
    }
    
    // Draw aspects
    if (chartData.aspects && chartData.aspects.length) {
      drawAspects(ctx, chartData.aspects, chartData.celestialBodies, centerX, centerY, innerRadius * 0.7);
    }
    
  }, [chartData, size]);
  
  // Draw zodiac wheel
  const drawZodiacWheel = (
    ctx: CanvasRenderingContext2D, 
    centerX: number, 
    centerY: number, 
    outerRadius: number, 
    innerRadius: number
  ) => {
    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw zodiac signs
    ZODIAC_SIGNS.forEach((sign, index) => {
      const startAngle = (index * 30 - 90) * Math.PI / 180;
      const endAngle = ((index + 1) * 30 - 90) * Math.PI / 180;
      
      // Draw section
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill with light color based on element
      let fillColor = '#ffffff';
      switch (sign.element) {
        case 'fire': fillColor = '#ffeeee'; break;
        case 'earth': fillColor = '#eeffee'; break;
        case 'air': fillColor = '#eeeeff'; break;
        case 'water': fillColor = '#eeffff'; break;
      }
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.stroke();
      
      // Draw sign symbol
      const symbolRadius = (outerRadius + innerRadius) / 2;
      const midAngle = (startAngle + endAngle) / 2;
      const symbolX = centerX + Math.cos(midAngle) * symbolRadius;
      const symbolY = centerY + Math.sin(midAngle) * symbolRadius;
      
      ctx.font = `${outerRadius * 0.08}px Arial`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sign.symbol, symbolX, symbolY);
    });
  };
  
  // Draw house cusps
  const drawHouseCusps = (
    ctx: CanvasRenderingContext2D,
    houses: any[],
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    houses.forEach(house => {
      const angle = (house.longitude - 90) * Math.PI / 180;
      const startX = centerX;
      const startY = centerY;
      const endX = centerX + Math.cos(angle) * radius;
      const endY = centerY + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw house number
      const numberRadius = radius * 1.05;
      const numberX = centerX + Math.cos(angle) * numberRadius;
      const numberY = centerY + Math.sin(angle) * numberRadius;
      
      ctx.font = `${radius * 0.04}px Arial`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(house.id.toString(), numberX, numberY);
    });
  };
  
  // Draw planets
  const drawPlanets = (
    ctx: CanvasRenderingContext2D,
    planets: any[],
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    // Group planets by position to handle overlaps
    const positionGroups: Record<string, any[]> = {};
    
    planets.forEach(planet => {
      const position = Math.floor(planet.longitude);
      if (!positionGroups[position]) {
        positionGroups[position] = [];
      }
      positionGroups[position].push(planet);
    });
    
    // Draw each group with slight offsets if needed
    Object.values(positionGroups).forEach(group => {
      const baseOffset = group.length > 1 ? 0.05 : 0;
      
      group.forEach((planet, index) => {
        const offset = baseOffset * (index - (group.length - 1) / 2);
        const angle = (planet.longitude - 90) * Math.PI / 180;
        const offsetAngle = angle + offset;
        
        const planetX = centerX + Math.cos(offsetAngle) * radius;
        const planetY = centerY + Math.sin(offsetAngle) * radius;
        
        // Draw planet background
        ctx.beginPath();
        ctx.arc(planetX, planetY, radius * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = planet.isRetrograde ? '#ffdddd' : 'white';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw planet symbol
        const planetInfo = getPlanetById(planet.id);
        ctx.font = `${radius * 0.06}px Arial`;
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(planetInfo.symbol, planetX, planetY);
        
        // Draw retrograde symbol if applicable
        if (planet.isRetrograde) {
          ctx.font = `${radius * 0.03}px Arial`;
          ctx.fillText('℞', planetX + radius * 0.07, planetY - radius * 0.07);
        }
      });
    });
  };
  
  // Draw aspects
  const drawAspects = (
    ctx: CanvasRenderingContext2D,
    aspects: any[],
    planets: any[],
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    // Create a map of planet IDs to positions
    const planetPositions: Record<number, { x: number, y: number }> = {};
    
    planets.forEach(planet => {
      const angle = (planet.longitude - 90) * Math.PI / 180;
      planetPositions[planet.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    });
    
    // Draw each aspect
    aspects.forEach(aspect => {
      const body1 = aspect.body1;
      const body2 = aspect.body2;
      
      // Skip if we don't have positions for both bodies
      if (!planetPositions[body1.id] || !planetPositions[body2.id]) return;
      
      const pos1 = planetPositions[body1.id];
      const pos2 = planetPositions[body2.id];
      
      // Draw aspect line
      ctx.beginPath();
      ctx.moveTo(pos1.x, pos1.y);
      ctx.lineTo(pos2.x, pos2.y);
      ctx.strokeStyle = aspect.aspectType.color || '#333';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]); // Dashed line
      ctx.stroke();
      ctx.setLineDash([]); // Reset to solid line
    });
  };
  
  return (
    <div className="chart-wheel-container">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="mx-auto"
      />
    </div>
  );
};

export default ChartWheel;