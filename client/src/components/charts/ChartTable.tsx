'use client';

import { 
  getSignById, 
  getPlanetById, 
  getHouseById, 
  longitudeToZodiac,
  formatAspect 
} from '@/utils/astroUtils';

interface ChartTableProps {
  chartData: any;
  showAspects?: boolean;
}

const ChartTable: React.FC<ChartTableProps> = ({ chartData, showAspects = true }) => {
  if (!chartData) return <div>No chart data available</div>;
  
  const { celestialBodies, aspects } = chartData;
  
  return (
    <div className="chart-table-container">
      <h3 className="text-lg font-semibold mb-3">Planetary Positions</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planet</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sign</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">House</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {celestialBodies.map((body: any) => {
              const planet = getPlanetById(body.id);
              const sign = getSignById(body.sign);
              const house = getHouseById(body.house);
              const position = longitudeToZodiac(body.longitude);
              
              return (
                <tr key={body.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-1">{planet.emoji}</span>
                      <span>{planet.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-1">{sign.emoji}</span>
                      <span>{sign.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {position.formatted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {house.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {body.isRetrograde ? 
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Retrograde
                      </span> : 
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Direct
                      </span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {showAspects && aspects && aspects.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Aspects</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orb</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influence</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {aspects.map((aspect: any, index: number) => {
                  const formattedAspect = formatAspect(aspect);
                  
                  return (
                    <tr key={index} style={{ borderLeftColor: formattedAspect.color, borderLeftWidth: '4px' }}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formattedAspect.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formattedAspect.nature}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formattedAspect.orb}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formattedAspect.influence}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartTable;