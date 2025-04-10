
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-finance-blue text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TradingUpAndDown</h3>
            <p className="text-gray-300 text-sm">
              Your trusted source for market news, analysis, and real-time stock quotes.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Markets</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/markets/stocks" className="hover:text-white">Stocks</Link></li>
              <li><Link to="/markets/forex" className="hover:text-white">Forex</Link></li>
              <li><Link to="/markets/crypto" className="hover:text-white">Crypto</Link></li>
              <li><Link to="/markets/commodities" className="hover:text-white">Commodities</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">News & Research</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/news/latest" className="hover:text-white">Latest News</Link></li>
              <li><Link to="/news/market-analysis" className="hover:text-white">Market Analysis</Link></li>
              <li><Link to="/news/earnings" className="hover:text-white">Earnings</Link></li>
              <li><Link to="/news/economy" className="hover:text-white">Economy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <div>
            © {new Date().getFullYear()} TradingUpAndDown. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            This site is for informational purposes only. Not financial advice.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
