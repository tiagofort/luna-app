import React from 'react';

const images = [
'https://picsum.photos/250/370?random=1',
'https://picsum.photos/250/370?random=2',
'https://picsum.photos/250/370?random=3',
'https://picsum.photos/250/370?random=4',
'https://picsum.photos/250/370?random=5',
'https://picsum.photos/250/370?random=6',
'https://picsum.photos/250/370?random=7',
'https://picsum.photos/250/370?random=8',
'https://picsum.photos/250/370?random=9',
];

const MainCarosel = () => {
  const handleItemClick = (index) => {
    console.log(`Item ${index + 1} clicado`);
  };

  return (
    <div className="relative w-full overflow-hidden group">
        <div className="flex w-max animate-scroll-left group-hover:[animation-play-state:paused]">
            {[...images, ...images].map((src, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 px-[0.75vw]
                                sm:px-[1vw]
                                md:px-[1.25vw]
                                lg:px-[1.5vw]
                                xl:px-[1.75vw]"
                    >
                    <div
                        className="w-[30vw] h-[calc(30vw*1.48)] cursor-pointer
                                    sm:w-[20vw] sm:h-[calc(20vw*1.48)]
                                    md:w-[15vw] md:h-[calc(15vw*1.48)]
                                    lg:w-[10vw] lg:h-[calc(10vw*1.48)]
                                    xl:w-[7vw] xl:h-[calc(7vw*1.48)]"
                        onClick={() => handleItemClick(index % images.length)}
                    >
                        <img src={src} alt={`Item ${index}`} className="w-full h-full object-cover rounded-md shadow-md" />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default MainCarosel;
