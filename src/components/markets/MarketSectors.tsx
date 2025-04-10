
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type Sector = {
  id: string;
  name: string;
  change: number;
  color: string;
};

const sectors: Sector[] = [
  { id: '1', name: 'Technology', change: 2.1, color: 'bg-green-500' },
  { id: '2', name: 'Energy', change: 1.8, color: 'bg-green-500' },
  { id: '3', name: 'Healthcare', change: 1.3, color: 'bg-green-500' },
  { id: '4', name: 'Financials', change: 0.7, color: 'bg-green-500' },
  { id: '5', name: 'Consumer Discretionary', change: 0.2, color: 'bg-green-500' },
  { id: '6', name: 'Materials', change: -0.2, color: 'bg-red-500' },
  { id: '7', name: 'Real Estate', change: -0.6, color: 'bg-red-500' },
  { id: '8', name: 'Industrials', change: -0.9, color: 'bg-red-500' },
  { id: '9', name: 'Utilities', change: -1.1, color: 'bg-red-500' },
  { id: '10', name: 'Consumer Staples', change: -1.4, color: 'bg-red-500' },
  { id: '11', name: 'Communication Services', change: -1.8, color: 'bg-red-500' },
];

const MarketSectors = () => {
  // Sort sectors by performance
  const sortedSectors = [...sectors].sort((a, b) => b.change - a.change);
  
  // Find max absolute change for progress bar scaling
  const maxChange = Math.max(...sortedSectors.map(s => Math.abs(s.change)));
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Sector Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedSectors.map((sector) => (
            <div key={sector.id} className="flex items-center space-x-4">
              <div className="w-36 text-sm">{sector.name}</div>
              <div className="flex-1 relative h-2">
                {sector.change > 0 ? (
                  <div className="w-full flex justify-end">
                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                    <div 
                      className="h-2 bg-finance-green absolute right-0 rounded-full"
                      style={{ 
                        width: `${(sector.change / maxChange) * 100}%`
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full flex justify-start">
                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                    <div 
                      className="h-2 bg-finance-red absolute left-0 rounded-full"
                      style={{ 
                        width: `${(Math.abs(sector.change) / maxChange) * 100}%`
                      }}
                    />
                  </div>
                )}
              </div>
              <div 
                className={`w-16 text-right font-medium ${
                  sector.change > 0 ? 'text-finance-green' : 'text-finance-red'
                }`}
              >
                {sector.change > 0 ? '+' : ''}{sector.change.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSectors;
