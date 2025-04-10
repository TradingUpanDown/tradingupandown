
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from './NewsArticle';

type CategoryNewsCardProps = {
  title: string;
  articles: Article[];
};

const CategoryNewsCard = ({ title, articles }: CategoryNewsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className="pb-4 border-b border-gray-100 last:border-0">
                <h3 className="font-medium hover:text-finance-blue">
                  <Link to={`/news/${article.id}`}>{article.title}</Link>
                </h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>{article.source}</span>
                  <span className="mx-2">•</span>
                  <span>{article.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No {title.toLowerCase()} news available at the moment.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryNewsCard;
