
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type MarketIndex = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

// Initial market data
const initialMarketIndices: MarketIndex[] = [
  {
    id: '1',
    name: 'S&P 500',
    symbol: 'SPX',
    price: 5254.67,
    change: 12.45,
    changePercent: 0.24,
  },
  {
    id: '2',
    name: 'Dow Jones',
    symbol: 'DJI',
    price: 39798.31,
    change: -54.86,
    changePercent: -0.14,
  },
  {
    id: '3',
    name: 'Nasdaq',
    symbol: 'IXIC',
    price: 16399.23,
    change: 122.36,
    changePercent: 0.75,
  },
  {
    id: '4',
    name: 'Russell 2000',
    symbol: 'RUT',
    price: 2083.56,
    change: 8.75,
    changePercent: 0.42,
  },
];

const MarketOverview = () => {
  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>(initialMarketIndices);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  // Function to fetch market data
  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with a 1-second delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate data updates with random fluctuations
      const updatedIndices = marketIndices.map(index => {
        // Generate random price change between -0.5% and +0.5%
        const randomChange = (Math.random() - 0.5) * index.price * 0.01;
        const newPrice = parseFloat((index.price + randomChange).toFixed(2));
        const change = parseFloat((newPrice - index.price + index.change).toFixed(2));
        const changePercent = parseFloat(((change / (newPrice - change)) * 100).toFixed(2));
        
        return {
          ...index,
          price: newPrice,
          change,
          changePercent
        };
      });
      
      setMarketIndices(updatedIndices);
      setLastUpdated(new Date());
      toast({
        title: "Market data updated",
        description: "Latest market data has been fetched successfully.",
      });
    } catch (error) {
      console.error("Error updating market data:", error);
      toast({
        title: "Update failed",
        description: "Failed to fetch latest market data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Set up interval for auto-refreshing data every 60 seconds
  useEffect(() => {
    // Initial fetch
    fetchMarketData();
    
    // Set up interval for periodic updates
    const intervalId = setInterval(fetchMarketData, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Market Overview</span>
          <div className="flex items-center gap-2 text-sm font-normal text-gray-500">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <button 
              onClick={fetchMarketData} 
              disabled={isLoading} 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <RefreshCw 
                className={`h-4 w-4 ${isLoading ? 'animate-spin text-blue-500' : 'text-gray-500'}`} 
              />
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketIndices.map((index) => (
            <div 
              key={index.id} 
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{index.name}</h3>
                  <p className="text-sm text-gray-500">{index.symbol}</p>
                </div>
                {index.changePercent > 0 ? (
                  <ArrowUpRight className="h-5 w-5 text-finance-green" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-finance-red" />
                )}
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold">{index.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <div className="flex items-center mt-1">
                  <span 
                    className={`text-sm font-medium ${index.changePercent > 0 ? 'text-finance-green' : 'text-finance-red'}`}
                  >
                    {index.change > 0 ? '+' : ''}{index.change.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span 
                    className={`text-sm font-medium ml-2 ${index.changePercent > 0 ? 'text-finance-green' : 'text-finance-red'}`}
                  >
                    ({index.changePercent > 0 ? '+' : ''}{index.changePercent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
