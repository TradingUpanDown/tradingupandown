
import React, { useState, useEffect } from 'react';
import NewsArticle from './NewsArticle';
import { Article } from './NewsArticle';
import { ArrowLeft, ArrowRight, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type FeaturedStoryProps = {
  article: Article;
};

type MarketData = {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
};

const initialMarketData: MarketData[] = [
  { name: 'S&P Futures', value: 5451.50, change: -39.50, changePercent: -0.72, isPositive: false },
  { name: 'Dow Futures', value: 40854.00, change: -152.00, changePercent: -0.37, isPositive: false },
  { name: 'Nasdaq Futures', value: 19082.75, change: -236.00, changePercent: -1.22, isPositive: false },
  { name: 'Russell 2000', value: 1910.20, change: -14.70, changePercent: -0.76, isPositive: false },
  { name: 'Crude Oil', value: 81.76, change: -0.59, changePercent: -0.85, isPositive: false },
  { name: 'Gold', value: 2144.40, change: 65.00, changePercent: 2.11, isPositive: true },
];

const FeaturedStory = ({ article }: FeaturedStoryProps) => {
  const [marketData, setMarketData] = useState<MarketData[]>(initialMarketData);
  const [activeTab, setActiveTab] = useState('US');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  // Function to update market data with random fluctuations
  const updateMarketData = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const updatedData = marketData.map(item => {
        // Generate random price change between -1.5% and +1.5%
        const changePercent = item.changePercent + (Math.random() * 3 - 1.5);
        const change = (item.value * changePercent / 100);
        const newValue = parseFloat((item.value + (Math.random() * 5 - 2.5)).toFixed(2));
        const isPositive = changePercent > 0;
        
        return {
          ...item,
          value: newValue,
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat(changePercent.toFixed(2)),
          isPositive
        };
      });
      
      setMarketData(updatedData);
      setLastUpdated(new Date());
      setIsLoading(false);
      
      toast({
        title: "Market data updated",
        description: `Last updated: ${new Date().toLocaleTimeString()}`,
      });
    }, 800);
  };
  
  // Set up auto-refresh interval
  useEffect(() => {
    const intervalId = setInterval(updateMarketData, 30000); // Update every 30 seconds
    
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Featured Story</h2>
      <NewsArticle article={article} featured />
      
      {/* Market Overview Widget */}
      <Card className="border border-gray-200 rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gray-50 p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-teal-600 mr-2" />
              <span className="text-sm text-gray-700">U.S. markets open in 8h</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-2">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <button 
                onClick={updateMarketData} 
                disabled={isLoading} 
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Refresh market data"
              >
                <RefreshCw 
                  className={`h-4 w-4 ${isLoading ? 'animate-spin text-blue-500' : 'text-gray-500'}`} 
                />
              </button>
            </div>
          </div>
          
          {/* Market Category Tabs */}
          <div className="flex border-b border-gray-200">
            {['US', 'Europe', 'Asia', 'Rates', 'Commodities'].map((tab) => (
              <button 
                key={tab}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab 
                    ? 'text-finance-blue border-b-2 border-finance-blue' 
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Market Data Grid */}
          <div className="grid grid-cols-3 p-2">
            {marketData.map((item, index) => (
              <div key={index} className={`p-2 ${index < 3 ? 'border-b border-gray-100' : ''}`}>
                <h3 className="text-sm font-medium text-finance-blue">{item.name}</h3>
                <p className="font-medium mt-1">{item.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <div className={`flex items-center mt-1 ${item.isPositive ? 'text-finance-green' : 'text-finance-red'}`}>
                  {item.isPositive ? (
                    <ArrowRight className="h-3 w-3 rotate-90" />
                  ) : (
                    <ArrowLeft className="h-3 w-3 -rotate-90" />
                  )}
                  <span className="text-xs font-medium">
                    {item.isPositive ? '+' : ''}{item.change.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({item.isPositive ? '+' : ''}{item.changePercent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-end p-2 border-t border-gray-100">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4 text-gray-500" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ArrowRight className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedStory;
