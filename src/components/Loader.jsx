// src/components/Loader.jsx
import logo from '../assets/favicon.png';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <img
        src={logo}
        alt="Logo do site"
        className="w-24 h-24 animate-bounce"
      />
    </div>
  );
};

export default Loader;
