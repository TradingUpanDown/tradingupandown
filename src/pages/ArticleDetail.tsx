
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import AdBanner from '@/components/ads/AdBanner';
import NewsList from '@/components/news/NewsList';
import { mockNews } from '@/data/mockData';
import { Article } from '@/components/news/NewsArticle';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Find the current article
    const currentArticle = mockNews.find(article => article.id === id);
    if (currentArticle) {
      setArticle(currentArticle);
      
      // Find related articles of the same category (excluding current)
      const related = mockNews
        .filter(a => a.category === currentArticle.category && a.id !== id)
        .slice(0, 3);
      setRelatedArticles(related);
    }
    
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-finance-gray">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Article not found</h2>
            <Link to="/news" className="text-finance-blue hover:underline">
              Return to News
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-finance-gray">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column (2/3 width on large screens) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Breadcrumb & Back Button */}
              <div className="flex items-center space-x-2 text-sm">
                <Link to="/news" className="flex items-center text-finance-blue hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to News
                </Link>
                <span>/</span>
                <span className="text-gray-500">{article.category}</span>
              </div>
              
              {/* Article Content */}
              <Card>
                <CardContent className="p-6">
                  {/* Article Category & Title */}
                  <div className="inline-block bg-finance-blue text-white px-2 py-1 text-xs rounded mb-4">
                    {article.category}
                  </div>
                  <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                  
                  {/* Article Meta Information */}
                  <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 space-x-4">
                    <div className="flex items-center">
                      <span>{article.source}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{article.date}</span>
                    </div>
                    {article.readTime && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{article.readTime} min read</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Featured Image */}
                  {article.image && (
                    <div className="mb-6">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2 italic">
                        Photo: Finance Daily / {article.source}
                      </p>
                    </div>
                  )}
                  
                  {/* Article Body - First we need to create a more detailed description */}
                  <div className="prose max-w-none">
                    {/* Lead paragraph in bold */}
                    <p className="font-semibold text-lg mb-4">
                      {article.description}
                    </p>
                    
                    {/* Generate a more detailed article from the description */}
                    <p className="mb-4">
                      {article.description} The implications of this development are far-reaching, potentially affecting markets across multiple sectors. Analysts at major financial institutions have begun to adjust their forecasts in response to this news.
                    </p>
                    
                    <p className="mb-4">
                      Industry experts point to several key factors that could influence how this situation evolves in the coming weeks. The timing of this announcement, coinciding with quarterly earnings reports from several major companies, has added another layer of complexity to market dynamics.
                    </p>
                    
                    <h2 className="text-xl font-bold my-4">Market Reaction</h2>
                    
                    <p className="mb-4">
                      Initial market reaction has been mixed, with some sectors seeing significant movement while others remain relatively stable. Trading volume has increased substantially, indicating high investor interest and engagement with this development.
                    </p>
                    
                    <p className="mb-4">
                      "This is definitely a situation that requires careful monitoring," said a senior market analyst at a leading investment firm. "We're advising our clients to maintain diversified positions while we assess the full impact."
                    </p>
                    
                    <h2 className="text-xl font-bold my-4">Looking Ahead</h2>
                    
                    <p className="mb-4">
                      As markets continue to process this information, volatility may increase in the short term. Long-term implications remain unclear, though several analysts have suggested that this could represent a significant shift in the {article.category} landscape.
                    </p>
                    
                    <p>
                      Investors are advised to consult with financial professionals about how these developments might affect their individual portfolios and investment strategies.
                    </p>
                  </div>
                  
                  {/* Social Sharing & Comments Section */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <button className="text-gray-500 hover:text-finance-blue flex items-center">
                        <Share className="w-5 h-5 mr-1" />
                        <span>Share</span>
                      </button>
                      <button className="text-gray-500 hover:text-finance-blue flex items-center">
                        <MessageSquare className="w-5 h-5 mr-1" />
                        <span>Comments</span>
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      Article ID: {article.id}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Horizontal Ad Banner */}
              <AdBanner type="horizontal" />
              
              {/* Related Articles */}
              <NewsList 
                title="Related Articles" 
                articles={relatedArticles} 
                viewAll="/news"
              />
            </div>
            
            {/* Sidebar - Right Column (1/3 width on large screens) */}
            <div className="space-y-8">
              {/* Vertical Ad Banner */}
              <AdBanner type="vertical" />
              
              {/* Popular Articles */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-4">Most Read</h3>
                  <div className="space-y-4">
                    {mockNews.slice(0, 5).map((article, index) => (
                      <div key={article.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                        <div className="text-xl font-bold text-finance-blue">{index + 1}</div>
                        <div>
                          <Link to={`/news/${article.id}`} className="font-medium text-sm hover:text-finance-blue">
                            {article.title}
                          </Link>
                          <div className="text-xs text-gray-500 mt-1">{article.source}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Square Ad Banner */}
              <AdBanner type="square" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
