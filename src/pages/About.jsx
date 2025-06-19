import React from "react";
import stones from '../assets/stones.jpg'

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-white min-h-screen px-6 py-16 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#b86935] drop-shadow-sm mb-4">
            About Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-700">
            If you believe in the energy of natural stones and crystals, you are in the right place!
          </p>
        </div>

        {/* Bloco principal */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Imagem */}
          <img
            src={stones}
            alt="Crystal display"
            className="rounded-2xl shadow-xl object-cover h-[400px] w-full"
          />

          {/* Texto */}
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className="mb-4">
              <strong className="text-[#b86935]">Luna Crystals</strong> aims to tune your vibrations with those of the chosen stones, enhancing your energies in daily life. Our accessories support your well-being while making you shine with elegance.
            </p>
            <p className="mb-4">
              Our jewellery is a great way to innovate and show your identity with style. Here you’ll find the greatest variety and quality of natural stone and crystal accessories to add a special touch to your look.
            </p>
            <p>
              Being with us is an invitation to relax, intuit, transform, love yourself, and rediscover the most beautiful light within you.
              Let’s share the magic and grandeur of crystals with the world!
            </p>
          </div>
        </div>

        {/* Missão */}
        <div className="mt-20 bg-white border border-[#b86935]/20 rounded-3xl shadow-md p-10 text-center">
          <h2 className="text-3xl font-bold text-[#b86935] mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our mission is to help you align your energy with the vibrations of these beautiful stones, enhancing your well-being and enriching your daily life.
            <br /><br />
            Through our unique and elegant jewelry, we aim to beautify your look and empower your inner strength. Each piece is carefully curated to bring style, meaning, and harmony to your journey.
          </p>
        </div>

        {/* Encerramento */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-medium text-gray-600">
            🌙 Begin your journey into the crystalline universe with us!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
