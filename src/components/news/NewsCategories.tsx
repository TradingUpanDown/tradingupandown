
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewsArticle from './NewsArticle';
import { Article } from './NewsArticle';

type NewsCategoriesProps = {
  latestNews: Article[];
  marketNews: Article[];
  economyNews: Article[];
  technologyNews: Article[];
};

const NewsCategories = ({ latestNews, marketNews, economyNews, technologyNews }: NewsCategoriesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>News by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="latest">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
          </TabsList>
          
          <TabsContent value="latest">
            <div className="space-y-6">
              {latestNews.map((article) => (
                <NewsArticle key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="markets">
            <div className="space-y-6">
              {marketNews.map((article) => (
                <NewsArticle key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="economy">
            <div className="space-y-6">
              {economyNews.map((article) => (
                <NewsArticle key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="technology">
            <div className="space-y-6">
              {technologyNews.length > 0 ? (
                technologyNews.map((article) => (
                  <NewsArticle key={article.id} article={article} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No technology news articles available at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NewsCategories;
