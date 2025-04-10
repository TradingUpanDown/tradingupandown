
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MarketOverview from '@/components/markets/MarketOverview';
import TopMovers from '@/components/markets/TopMovers';
import MarketSectors from '@/components/markets/MarketSectors';
import AdBanner from '@/components/ads/AdBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Sample market data for different categories
const stocksData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 184.25, change: 2.34, changePercent: 1.28, volume: '42.3M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 425.96, change: 5.87, changePercent: 1.39, volume: '21.5M' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 182.57, change: -0.98, changePercent: -0.53, volume: '32.8M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 159.78, change: 2.12, changePercent: 1.34, volume: '18.7M' },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 509.12, change: 7.23, changePercent: 1.44, volume: '15.2M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 172.23, change: -4.87, changePercent: -2.75, volume: '54.1M' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 925.65, change: 12.34, changePercent: 1.35, volume: '39.6M' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 152.78, change: -1.23, changePercent: -0.80, volume: '8.3M' },
  { symbol: 'V', name: 'Visa Inc.', price: 278.34, change: 3.56, changePercent: 1.29, volume: '7.5M' },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 62.87, change: 0.45, changePercent: 0.72, volume: '10.2M' },
];

const forexData = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0845, change: -0.0035, changePercent: -0.32, volume: '98.5B' },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 151.86, change: 0.53, changePercent: 0.35, volume: '87.2B' },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2678, change: 0.0043, changePercent: 0.34, volume: '65.3B' },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.6598, change: -0.0027, changePercent: -0.41, volume: '42.7B' },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.3562, change: 0.0025, changePercent: 0.18, volume: '38.9B' },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.8843, change: -0.0012, changePercent: -0.14, volume: '32.1B' },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', price: 0.6098, change: -0.0045, changePercent: -0.73, volume: '18.5B' },
  { symbol: 'EUR/GBP', name: 'Euro / British Pound', price: 0.8555, change: -0.0057, changePercent: -0.66, volume: '25.6B' },
  { symbol: 'EUR/JPY', name: 'Euro / Japanese Yen', price: 164.69, change: 0.43, changePercent: 0.26, volume: '34.8B' },
  { symbol: 'USD/MXN', name: 'US Dollar / Mexican Peso', price: 16.8743, change: 0.0845, changePercent: 0.50, volume: '15.7B' },
];

const cryptoData = [
  { symbol: 'BTC/USD', name: 'Bitcoin', price: 67245.78, change: 1823.45, changePercent: 2.78, volume: '32.5B' },
  { symbol: 'ETH/USD', name: 'Ethereum', price: 3467.92, change: 85.67, changePercent: 2.53, volume: '16.8B' },
  { symbol: 'BNB/USD', name: 'Binance Coin', price: 578.23, change: -12.56, changePercent: -2.13, volume: '2.3B' },
  { symbol: 'SOL/USD', name: 'Solana', price: 167.89, change: 7.34, changePercent: 4.57, volume: '4.5B' },
  { symbol: 'ADA/USD', name: 'Cardano', price: 0.4523, change: 0.0213, changePercent: 4.94, volume: '985.6M' },
  { symbol: 'XRP/USD', name: 'XRP', price: 0.5234, change: -0.0145, changePercent: -2.70, volume: '1.2B' },
  { symbol: 'DOGE/USD', name: 'Dogecoin', price: 0.1342, change: 0.0087, changePercent: 6.94, volume: '876.4M' },
  { symbol: 'DOT/USD', name: 'Polkadot', price: 6.87, change: 0.23, changePercent: 3.46, volume: '423.7M' },
  { symbol: 'AVAX/USD', name: 'Avalanche', price: 37.56, change: 1.23, changePercent: 3.38, volume: '734.2M' },
  { symbol: 'SHIB/USD', name: 'Shiba Inu', price: 0.000023, change: 0.000001, changePercent: 4.55, volume: '534.8M' },
];

const commoditiesData = [
  { symbol: 'CL=F', name: 'Crude Oil', price: 85.67, change: 1.23, changePercent: 1.46, volume: '312.5K' },
  { symbol: 'GC=F', name: 'Gold', price: 2323.40, change: 15.60, changePercent: 0.67, volume: '187.3K' },
  { symbol: 'SI=F', name: 'Silver', price: 27.43, change: 0.35, changePercent: 1.29, volume: '93.2K' },
  { symbol: 'HG=F', name: 'Copper', price: 4.23, change: 0.05, changePercent: 1.20, volume: '75.6K' },
  { symbol: 'NG=F', name: 'Natural Gas', price: 1.78, change: -0.05, changePercent: -2.73, volume: '128.9K' },
  { symbol: 'PL=F', name: 'Platinum', price: 932.80, change: 7.40, changePercent: 0.80, volume: '42.1K' },
  { symbol: 'PA=F', name: 'Palladium', price: 965.50, change: -12.30, changePercent: -1.26, volume: '32.5K' },
  { symbol: 'ZC=F', name: 'Corn', price: 428.25, change: 5.75, changePercent: 1.36, volume: '87.3K' },
  { symbol: 'ZW=F', name: 'Wheat', price: 556.75, change: -4.25, changePercent: -0.76, volume: '65.4K' },
  { symbol: 'ZS=F', name: 'Soybeans', price: 1189.50, change: 12.75, changePercent: 1.08, volume: '76.8K' },
];

const Markets = () => {
  return (
    <div className="min-h-screen flex flex-col bg-finance-gray">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Market Overview */}
        <section className="bg-white py-6 border-b">
          <div className="container mx-auto px-4">
            <MarketOverview />
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Left Column (2/3 width on large screens) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Market Symbol Search */}
                <Card>
                  <CardHeader>
                    <CardTitle>Market Symbol Search</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by symbol or company name..."
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-finance-blue"
                      />
                      <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Horizontal Ad Banner */}
                <AdBanner type="horizontal" />
                
                {/* Market Data Tabs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Market Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="stocks">
                      <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="stocks">Stocks</TabsTrigger>
                        <TabsTrigger value="forex">Forex</TabsTrigger>
                        <TabsTrigger value="crypto">Crypto</TabsTrigger>
                        <TabsTrigger value="commodities">Commodities</TabsTrigger>
                      </TabsList>
                      
                      {/* Stocks Table */}
                      <TabsContent value="stocks">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {stocksData.map((stock, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-finance-blue">{stock.symbol}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{stock.name}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">${stock.price.toFixed(2)}</td>
                                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${stock.change >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                                  </td>
                                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${stock.changePercent >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{stock.volume}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                      
                      {/* Forex Table */}
                      <TabsContent value="forex">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {forexData.map((forex, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-finance-blue">{forex.symbol}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{forex.name}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{forex.price.toFixed(4)}</td>
                                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${forex.change >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {forex.change >= 0 ? '+' : ''}{forex.change.toFixed(4)}
                                  </td>
                                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${forex.changePercent >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {forex.changePercent >= 0 ? '+' : ''}{forex.changePercent.toFixed(2)}%
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{forex.volume}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                      
                      {/* Crypto Table */}
                      <TabsContent value="crypto">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {cryptoData.map((crypto, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-finance-blue">{crypto.symbol}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{crypto.name}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">
                                    ${crypto.price < 0.01 ? crypto.price.toFixed(6) : crypto.price.toFixed(2)}
                                  </td>
                                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${crypto.change >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {crypto.change >= 0 ? '+' : ''}{crypto.change < 0.01 ? crypto.change.toFixed(6) : crypto.change.toFixed(2)}
                                  </td>
                                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${crypto.changePercent >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{crypto.volume}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                      
                      {/* Commodities Table */}
                      <TabsContent value="commodities">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Change</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {commoditiesData.map((commodity, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-finance-blue">{commodity.symbol}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{commodity.name}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">${commodity.price.toFixed(2)}</td>
                                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${commodity.change >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {commodity.change >= 0 ? '+' : ''}{commodity.change.toFixed(2)}
                                  </td>
                                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${commodity.changePercent >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                                    {commodity.changePercent >= 0 ? '+' : ''}{commodity.changePercent.toFixed(2)}%
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{commodity.volume}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* Sidebar - Right Column (1/3 width on large screens) */}
              <div className="space-y-8">
                {/* Top Movers Widget */}
                <TopMovers />
                
                {/* Vertical Ad Banner */}
                <AdBanner type="vertical" />
                
                {/* Sector Performance */}
                <MarketSectors />
                
                {/* Square Ad Banner */}
                <AdBanner type="square" />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Markets;
