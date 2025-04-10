
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MarketOverview from '@/components/markets/MarketOverview';
import TopMovers from '@/components/markets/TopMovers';
import MarketSectors from '@/components/markets/MarketSectors';
import NewsArticle from '@/components/news/NewsArticle';
import NewsList from '@/components/news/NewsList';
import AdBanner from '@/components/ads/AdBanner';
import { mockNews, marketNews, economyNews } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  // Get the featured article (first in the list)
  const featuredArticle = mockNews[0];
  
  // Get the rest of the articles
  const recentNews = mockNews.slice(1, 5);
  
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
                {/* Featured News */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Top Stories</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <NewsArticle article={featuredArticle} featured />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recentNews.map((article) => (
                        <NewsArticle key={article.id} article={article} />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Horizontal Ad Banner */}
                <AdBanner type="horizontal" />
                
                {/* Market News & Analysis Tabs */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Markets & Economy</h2>
                  <Tabs defaultValue="markets">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="markets" className="flex-1">Markets</TabsTrigger>
                      <TabsTrigger value="economy" className="flex-1">Economy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="markets">
                      <div className="space-y-4">
                        {marketNews.map((article) => (
                          <NewsArticle key={article.id} article={article} />
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="economy">
                      <div className="space-y-4">
                        {economyNews.map((article) => (
                          <NewsArticle key={article.id} article={article} />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
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

export default Index;
