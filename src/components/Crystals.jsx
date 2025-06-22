import { useNavigate } from "react-router-dom";
import agate from '../assets/crystals/agate.png';
import amazonite from '../assets/crystals/amazonite.png';
import amethyst from '../assets/crystals/amethyst.png';
import apatite from '../assets/crystals/apatite.png';
import aquamarine from '../assets/crystals/aquamarine.png';
import black_Tourmaline from '../assets/crystals/black_turmaline.png';
import crystal_quartz from '../assets/crystals/crystal_quartz.png';
import onyx from '../assets/crystals/onyx.png';
import pink_quartz from '../assets/crystals/pink_quartz.png';
import pyrite from '../assets/crystals/pyrite.png';
import selenite from '../assets/crystals/selenite.png';
import sodalite from '../assets/crystals/agate.png';
import white_quartz from '../assets/crystals/white_quartz.png';

// Exemplo de dados. Você pode substituir pelos seus.
const crystals = [
  { id: 1, name: "Agate", image: agate },
  { id: 2, name: "Amazonite", image: amazonite },
  { id: 3, name: "Amethyst", image: amethyst },
  { id: 4, name: "Apatite", image: apatite },
  { id: 5, name: "Aquamarine", image: aquamarine },
  { id: 6, name: "Black Tourmaline", image: black_Tourmaline },
  { id: 7, name: "Crystal Quartz", image: crystal_quartz },
  { id: 8, name: "Onyx", image: onyx },
  { id: 9, name: "Rose Quartz", image: pink_quartz },
  { id: 10, name: "Pyrite", image: pyrite },
  { id: 11, name: "Selenite", image: selenite },
  { id: 12, name: "Sodalite", image: sodalite },
  { id: 13, name: "White Quartz", image: white_quartz },
];

const CrystalCatalog = () => {
  const navigate = useNavigate();

  const handleClick = (crystal) => {
    navigate(`/accessories?stone=${encodeURIComponent(crystal.name)}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-mainColor mb-8">Choose Your Crystal</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {crystals.map((crystal) => (
          <div
            key={crystal.id}
            onClick={() => handleClick(crystal)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-mainColor shadow-sm group-hover:shadow-md transition">
              <img
                src={crystal.image}
                alt={crystal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-2 text-sm text-gray-700 group-hover:text-mainColor font-medium transition">
              {crystal.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrystalCatalog;
