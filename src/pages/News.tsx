
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/ads/AdBanner';
import { mockNews, marketNews, economyNews } from '@/data/mockData';
import FeaturedStory from '@/components/news/FeaturedStory';
import NewsCategories from '@/components/news/NewsCategories';
import CategoryNewsCard from '@/components/news/CategoryNewsCard';
import MostReadNews from '@/components/news/MostReadNews';

// Additional category data
const technologyNews = mockNews.filter(article => article.category === 'Technology');
const cryptoNews = mockNews.filter(article => article.category === 'Crypto');
const earningsNews = mockNews.filter(article => article.category === 'Earnings');
const commoditiesNews = mockNews.filter(article => article.category === 'Commodities');

const News = () => {
  const featuredArticle = mockNews[0];
  const latestNews = [...mockNews].sort(() => Math.random() - 0.5).slice(0, 5);
  
  return (
    <div className="min-h-screen flex flex-col bg-finance-gray">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-white py-6 border-b">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Financial News</h1>
            <p className="text-gray-600">Latest market news, analysis, and insights</p>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Left Column (2/3 width on large screens) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Featured Article */}
                <FeaturedStory article={featuredArticle} />
                
                {/* Horizontal Ad Banner */}
                <AdBanner type="horizontal" />
                
                {/* News Categories Tabs */}
                <NewsCategories 
                  latestNews={latestNews}
                  marketNews={marketNews}
                  economyNews={economyNews}
                  technologyNews={technologyNews}
                />
                
                {/* More News Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Earnings News */}
                  <CategoryNewsCard title="Earnings" articles={earningsNews} />
                  
                  {/* Crypto News */}
                  <CategoryNewsCard title="Crypto" articles={cryptoNews} />
                </div>
              </div>
              
              {/* Sidebar - Right Column (1/3 width on large screens) */}
              <div className="space-y-8">
                {/* Most Read News */}
                <MostReadNews articles={mockNews} />
                
                {/* Vertical Ad Banner */}
                <AdBanner type="vertical" />
                
                {/* Commodities News */}
                <CategoryNewsCard title="Commodities" articles={commoditiesNews} />
                
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

export default News;
