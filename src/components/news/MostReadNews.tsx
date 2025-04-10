
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Article } from './NewsArticle';

type MostReadNewsProps = {
  articles: Article[];
};

const MostReadNews = ({ articles }: MostReadNewsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Most Read</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.slice(0, 5).map((article, index) => (
            <div key={article.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
              <div className="text-xl font-bold text-finance-blue">{index + 1}</div>
              <div>
                <h3 className="font-medium text-sm hover:text-finance-blue">
                  <Link to={`/news/${article.id}`}>{article.title}</Link>
                </h3>
                <div className="text-xs text-gray-500 mt-1">{article.source}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MostReadNews;
