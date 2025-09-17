'use client';

import Lottie from 'lottie-react';

import vesselAnimation from '@/asset/lottie/vessel-animation.json';

const VesselLoader = () => {
  return (
    <div
      className={
        'fixed top-0 left-0 right-0 bottom-0 z-[99999] bg-black/50 pointer-events-auto'
      }
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex items-center justify-center w-96 h-96 bg-white/50 rounded-full shadow-lg overflow-hidden">
          <Lottie
            animationData={vesselAnimation}
            loop={true}
            autoplay={true}
            className="w-80 h-80"
          />
        </div>
      </div>
    </div>
  );
};

export { VesselLoader };
