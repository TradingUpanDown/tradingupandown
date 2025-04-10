
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export type Article = {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  image?: string;
  url: string;
  category: string;
  readTime?: string;
};

type NewsArticleProps = {
  article: Article;
  featured?: boolean;
};

const NewsArticle = ({ article, featured = false }: NewsArticleProps) => {
  if (featured) {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img 
            src={article.image || '/placeholder.svg'} 
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-3 left-3 bg-finance-blue text-white px-2 py-1 text-xs rounded">
            {article.category}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{article.source}</span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
            {article.readTime && (
              <>
                <span className="mx-2">•</span>
                <span>{article.readTime} min read</span>
              </>
            )}
          </div>
          <Link to={`/news/${article.id}`} className="block">
            <h3 className="text-xl font-bold mb-2 hover:text-finance-blue transition-colors">
              {article.title}
            </h3>
          </Link>
          <p className="text-gray-700 line-clamp-3">
            {article.description}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
      {article.image && (
        <div className="md:w-1/3">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
      )}
      <CardContent className={`p-4 ${article.image ? 'md:w-2/3' : 'w-full'}`}>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
            {article.category}
          </span>
          <span className="mx-2">•</span>
          <span>{article.source}</span>
          <span className="mx-2">•</span>
          <span>{article.date}</span>
        </div>
        <Link to={`/news/${article.id}`} className="block">
          <h3 className="text-lg font-bold mb-2 hover:text-finance-blue transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-700 line-clamp-2">
          {article.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default NewsArticle;
