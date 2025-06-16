import React from 'react';
import banner from '../assets/banner_final.jpeg'

const Banner = () => {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-[1600/568]">
        <img
          src={banner} 
          alt="Banner"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;