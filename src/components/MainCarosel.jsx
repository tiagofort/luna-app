import { useEffect, useState } from 'react';
import { getMainCarosel } from '../services/api';
import { Link } from 'react-router-dom';

const MainCarosel = () => {
  const handleItemClick = (index) => {
    console.log(`Item ${index + 1} clicado`);
  };

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getMainCarosel();
        setImages(response);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error.message);
      }
    };
    fetchImages();
  }, []);

  return (
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-max animate-scroll-left group-hover:[animation-play-state:paused]">
          {[...images, ...images].map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-[0.75vw]
                        sm:px-[1vw]
                        md:px-[1.25vw]
                        lg:px-[1.5vw]
                        xl:px-[1.75vw]"
            >
              <Link
                to={`/item/${img.id_produto}`}
                className="block w-[30vw] h-[calc(30vw*1.48)] 
                          sm:w-[20vw] sm:h-[calc(20vw*1.48)]
                          md:w-[15vw] md:h-[calc(15vw*1.48)]
                          lg:w-[10vw] lg:h-[calc(10vw*1.48)]
                          xl:w-[7vw] xl:h-[calc(7vw*1.48)]"
              >
                <img
                  src={img.url}
                  alt={`Item ${img._id}`}
                  className="w-full h-full object-cover rounded-md shadow-md"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
};

export default MainCarosel;
