
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-finance-blue">TradingUpAndDown</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/markets" className="text-finance-darkGray hover:text-finance-blue font-medium">
                Markets
              </Link>
              <Link to="/news" className="text-finance-darkGray hover:text-finance-blue font-medium">
                News
              </Link>
              <Link to="/watchlist" className="text-finance-darkGray hover:text-finance-blue font-medium">
                Watchlist
              </Link>
              <Link to="/portfolio" className="text-finance-darkGray hover:text-finance-blue font-medium">
                Portfolio
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search symbols, news..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-finance-blue"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-finance-darkGray" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-finance-red rounded-full"></span>
            </Button>
            
            <Button className="hidden md:flex bg-finance-blue hover:bg-blue-700 text-white">
              Sign In
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-finance-darkGray" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
