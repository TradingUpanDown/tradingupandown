
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Stock = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

// Initial data
const initialGainers: Stock[] = [
  {
    id: 'g1',
    name: 'TechGrowth Inc',
    symbol: 'TCGR',
    price: 87.45,
    change: 12.34,
    changePercent: 16.43,
    volume: 15643210,
  },
  {
    id: 'g2',
    name: 'BioHealth Solutions',
    symbol: 'BHLT',
    price: 42.67,
    change: 5.87,
    changePercent: 15.96,
    volume: 9876543,
  },
  {
    id: 'g3',
    name: 'Green Energy Corp',
    symbol: 'GRNE',
    price: 29.32,
    change: 3.67,
    changePercent: 14.31,
    volume: 7654321,
  },
  {
    id: 'g4',
    name: 'Digital Innovations',
    symbol: 'DGIN',
    price: 124.89,
    change: 14.56,
    changePercent: 13.20,
    volume: 4321654,
  },
];

const initialLosers: Stock[] = [
  {
    id: 'l1',
    name: 'Retail Chains Inc',
    symbol: 'RTCI',
    price: 45.23,
    change: -8.67,
    changePercent: -16.09,
    volume: 8765432,
  },
  {
    id: 'l2',
    name: 'Manufacturing Group',
    symbol: 'MFGP',
    price: 67.89,
    change: -12.45,
    changePercent: -15.50,
    volume: 5432167,
  },
  {
    id: 'l3',
    name: 'Travel Services Ltd',
    symbol: 'TRVS',
    price: 32.45,
    change: -5.78,
    changePercent: -15.12,
    volume: 3456789,
  },
  {
    id: 'l4',
    name: 'Consumer Products',
    symbol: 'CNPR',
    price: 54.32,
    change: -8.97,
    changePercent: -14.17,
    volume: 2345678,
  },
];

const TopMovers = () => {
  const [gainers, setGainers] = useState<Stock[]>(initialGainers);
  const [losers, setLosers] = useState<Stock[]>(initialLosers);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Function to update stock prices with random fluctuations
  const updateStockData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update gainers with random fluctuations
      const updatedGainers = gainers.map(stock => {
        // Random price change between -3% and +3%
        const randomFactor = 0.97 + (Math.random() * 0.06);
        const newPrice = parseFloat((stock.price * randomFactor).toFixed(2));
        const change = parseFloat((newPrice - stock.price + stock.change).toFixed(2));
        const changePercent = parseFloat(((change / (newPrice - change)) * 100).toFixed(2));
        
        return {
          ...stock,
          price: newPrice,
          change,
          changePercent,
          // Random volume change between -10% and +10%
          volume: Math.floor(stock.volume * (0.9 + Math.random() * 0.2))
        };
      }).sort((a, b) => b.changePercent - a.changePercent);
      
      // Update losers with random fluctuations
      const updatedLosers = losers.map(stock => {
        // Random price change between -3% and +3%
        const randomFactor = 0.97 + (Math.random() * 0.06);
        const newPrice = parseFloat((stock.price * randomFactor).toFixed(2));
        const change = parseFloat((newPrice - stock.price + stock.change).toFixed(2));
        const changePercent = parseFloat(((change / (newPrice - change)) * 100).toFixed(2));
        
        return {
          ...stock,
          price: newPrice,
          change,
          changePercent,
          // Random volume change between -10% and +10%
          volume: Math.floor(stock.volume * (0.9 + Math.random() * 0.2))
        };
      }).sort((a, b) => a.changePercent - b.changePercent);
      
      setGainers(updatedGainers);
      setLosers(updatedLosers);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error updating top movers data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up interval for auto-refreshing data
  useEffect(() => {
    // Initial fetch
    updateStockData();
    
    // Set up interval for periodic updates (every 45 seconds)
    const intervalId = setInterval(updateStockData, 45000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Top Movers</span>
          <div className="flex items-center text-xs text-gray-500">
            <button 
              onClick={updateStockData} 
              disabled={isLoading} 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1"
            >
              <RefreshCw 
                className={`h-3 w-3 ${isLoading ? 'animate-spin text-blue-500' : 'text-gray-500'}`} 
              />
              <span>{isLoading ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>
          <TabsContent value="gainers">
            <div className="space-y-3">
              {gainers.map((stock) => (
                <div 
                  key={stock.id} 
                  className="p-3 border rounded-lg hover:shadow-sm transition-shadow flex justify-between items-center"
                >
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <span className="font-semibold">{stock.symbol}</span>
                      <span className="text-sm text-gray-500 ml-2">{stock.name}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="font-medium">${stock.price.toFixed(2)}</span>
                      <div className="flex items-center ml-3 text-finance-green">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">
                          +{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Vol</div>
                    <div className="text-sm">{(stock.volume / 1000000).toFixed(1)}M</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="losers">
            <div className="space-y-3">
              {losers.map((stock) => (
                <div 
                  key={stock.id} 
                  className="p-3 border rounded-lg hover:shadow-sm transition-shadow flex justify-between items-center"
                >
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <span className="font-semibold">{stock.symbol}</span>
                      <span className="text-sm text-gray-500 ml-2">{stock.name}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="font-medium">${stock.price.toFixed(2)}</span>
                      <div className="flex items-center ml-3 text-finance-red">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">
                          {stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Vol</div>
                    <div className="text-sm">{(stock.volume / 1000000).toFixed(1)}M</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TopMovers;
