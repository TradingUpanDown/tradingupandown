
import { Article } from '@/components/news/NewsArticle';

export const mockNews: Article[] = [
  {
    id: '1',
    title: 'Fed Signals Potential Rate Cut Amid Cooling Inflation',
    description: 'Federal Reserve officials indicated they could cut interest rates in the coming months if inflation continues to moderate, according to minutes from their latest policy meeting. The central bank has maintained rates at a 23-year high since last July.',
    source: 'The Financial Times',
    date: 'April 9, 2025',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    url: '/news/1',
    category: 'Economy',
    readTime: '5'
  },
  {
    id: '2',
    title: 'Tech Giants Face New Antitrust Scrutiny in Global Regulatory Push',
    description: 'Major technology companies including Apple, Google, and Microsoft are facing heightened regulatory scrutiny as governments worldwide coordinate efforts to address market dominance concerns. The new regulations could reshape how these companies operate in key markets.',
    source: 'Reuters',
    date: 'April 9, 2025',
    image: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    url: '/news/2',
    category: 'Technology',
    readTime: '6'
  },
  {
    id: '3',
    title: 'Oil Prices Surge as Supply Concerns Grow Amid Middle East Tensions',
    description: 'Crude oil prices jumped to a six-month high as escalating tensions in the Middle East raised concerns about potential supply disruptions. Brent crude futures rose above $95 per barrel, while U.S. West Texas Intermediate crude topped $90.',
    source: 'Bloomberg',
    date: 'April 8, 2025',
    image: 'https://images.unsplash.com/photo-1520057364180-4e0a121ab3e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    url: '/news/3',
    category: 'Commodities',
    readTime: '4'
  },
  {
    id: '4',
    title: 'Major Retailer Exceeds Quarterly Earnings Expectations',
    description: 'The retail giant reported strong quarterly results that surpassed analyst expectations, driven by robust e-commerce growth and effective cost management strategies. The company raised its full-year guidance, signaling confidence in continued consumer spending.',
    source: 'CNBC',
    date: 'April 8, 2025',
    url: '/news/4',
    category: 'Earnings',
    readTime: '3'
  },
  {
    id: '5',
    title: 'Cryptocurrency Market Hits New Milestone as Institutional Adoption Grows',
    description: 'The total cryptocurrency market capitalization reached a new record as institutional investors continue to allocate funds to digital assets. Major financial institutions have launched new crypto investment products in response to growing client demand.',
    source: 'CoinDesk',
    date: 'April 7, 2025',
    image: 'https://images.unsplash.com/photo-1518544621721-37cddfe3cea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
    url: '/news/5',
    category: 'Crypto',
    readTime: '7'
  },
  {
    id: '6',
    title: 'Housing Market Shows Signs of Cooling as Mortgage Rates Remain Elevated',
    description: 'The housing market is experiencing a moderation in price growth as higher mortgage rates impact affordability. Monthly home sales have declined for the fourth consecutive month, while inventory levels are slowly increasing in major markets.',
    source: 'Wall Street Journal',
    date: 'April 7, 2025',
    url: '/news/6',
    category: 'Real Estate',
    readTime: '5'
  },
  {
    id: '7',
    title: 'Green Energy Investments Surge as Climate Initiatives Accelerate',
    description: 'Investments in renewable energy projects reached a record high in the first quarter as governments and corporations accelerate climate initiatives. Solar and wind power installations are on track to exceed previous forecasts for the year.',
    source: 'Energy Insights',
    date: 'April 6, 2025',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    url: '/news/7',
    category: 'Energy',
    readTime: '6'
  },
  {
    id: '8',
    title: 'Global Shipping Rates Decline as Supply Chain Pressures Ease',
    description: 'Shipping rates for major global routes have continued to decline as supply chain disruptions ease and container availability improves. The normalization in shipping costs could help reduce inflationary pressures for imported goods.',
    source: 'Logistics Today',
    date: 'April 6, 2025',
    url: '/news/8',
    category: 'Transportation',
    readTime: '4'
  }
];

export const marketNews: Article[] = [
  {
    id: 'm1',
    title: 'Market Rally Faces Resistance as Earnings Season Approaches',
    description: 'The recent market rally is testing key technical resistance levels as investors prepare for the upcoming earnings season. Analysts expect mixed results across sectors with technology and healthcare companies likely to outperform.',
    source: 'Market Watch',
    date: 'April 9, 2025',
    url: '/news/m1',
    category: 'Markets',
    readTime: '5'
  },
  {
    id: 'm2',
    title: 'Small Cap Stocks Outperform as Economic Outlook Improves',
    description: 'Small-capitalization stocks have outperformed their larger counterparts in recent weeks as improving economic data suggests a stronger growth outlook. The Russell 2000 index has gained over 6% in the past month.',
    source: "Investor's Daily", // Fixed: Changed single quotes to double quotes to handle the apostrophe
    date: 'April 8, 2025',
    url: '/news/m2',
    category: 'Markets',
    readTime: '4'
  },
  {
    id: 'm3',
    title: 'Bond Market Signals Shifting Expectations on Future Rate Cuts',
    description: 'Treasury yields have adjusted as bond market participants recalibrate expectations for the Federal Reserve\'s rate cut timeline. The 10-year Treasury yield fell below 4% for the first time in three months.',
    source: 'Bond Insights',
    date: 'April 8, 2025',
    url: '/news/m3',
    category: 'Bonds',
    readTime: '6'
  },
  {
    id: 'm4',
    title: 'Dividend Aristocrats Attract Investors Seeking Stability',
    description: 'Companies with long histories of consistent dividend increases are attracting more investor attention amid market uncertainty. These "dividend aristocrats" have historically provided lower volatility during market downturns.',
    source: 'Financial Review',
    date: 'April 7, 2025',
    url: '/news/m4',
    category: 'Stocks',
    readTime: '3'
  },
];

export const economyNews: Article[] = [
  {
    id: 'e1',
    title: 'Job Market Remains Resilient Despite Economic Headwinds',
    description: 'The latest employment report showed continued job growth despite broader economic concerns. The unemployment rate held steady at 3.8% while wage growth moderated slightly, which could help ease inflation pressures.',
    source: 'Economic Times',
    date: 'April 9, 2025',
    url: '/news/e1',
    category: 'Economy',
    readTime: '5'
  },
  {
    id: 'e2',
    title: 'Consumer Confidence Rises to Highest Level in 18 Months',
    description: 'Consumer confidence rose to its highest level since October 2023, according to the latest survey data. Improved sentiment regarding job prospects and personal finances contributed to the stronger outlook.',
    source: 'Consumer Reports',
    date: 'April 8, 2025',
    url: '/news/e2',
    category: 'Economy',
    readTime: '4'
  },
  {
    id: 'e3',
    title: 'Retail Sales Exceed Forecasts, Indicating Resilient Consumer Spending',
    description: 'Retail sales increased more than expected last month, suggesting that consumer spending remains a key driver of economic growth. Non-store retailers and food services saw the strongest gains.',
    source: 'Commerce Daily',
    date: 'April 7, 2025',
    url: '/news/e3',
    category: 'Economy',
    readTime: '3'
  },
  {
    id: 'e4',
    title: 'Manufacturing Activity Expands After Six Months of Contraction',
    description: 'The manufacturing sector expanded for the first time in seven months according to the latest purchasing managers\' index. New orders and production components showed particular strength, signaling potential broader improvement.',
    source: 'Industry Week',
    date: 'April 6, 2025',
    url: '/news/e4',
    category: 'Economy',
    readTime: '6'
  },
];
