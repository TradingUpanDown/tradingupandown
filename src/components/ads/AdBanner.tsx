
import React from 'react';

type AdBannerProps = {
  type: 'horizontal' | 'vertical' | 'square';
  className?: string;
};

const AdBanner = ({ type, className = '' }: AdBannerProps) => {
  let adStyle = '';
  let adText = '';
  
  switch (type) {
    case 'horizontal':
      adStyle = 'w-full h-24 md:h-28 lg:h-32';
      adText = 'Horizontal Ad Banner';
      break;
    case 'vertical':
      adStyle = 'w-full h-64 md:h-80 lg:h-96';
      adText = 'Vertical Ad Banner';
      break;
    case 'square':
      adStyle = 'w-full aspect-square';
      adText = 'Square Ad Banner';
      break;
    default:
      adStyle = 'w-full h-32';
  }
  
  return (
    <div className={`${adStyle} ${className} bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center`}>
      <div className="text-center">
        <div className="text-xs text-gray-400 uppercase">Advertisement</div>
        <div className="text-gray-500 font-medium">{adText}</div>
      </div>
    </div>
  );
};

export default AdBanner;
