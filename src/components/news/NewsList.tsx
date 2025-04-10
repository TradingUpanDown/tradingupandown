
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewsArticle, { Article } from './NewsArticle';

type NewsListProps = {
  title: string;
  articles: Article[];
  viewAll?: string;
};

const NewsList = ({ title, articles, viewAll }: NewsListProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          {viewAll && (
            <a href={viewAll} className="text-finance-blue text-sm hover:underline">
              View All
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article) => (
            <NewsArticle key={article.id} article={article} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsList;
