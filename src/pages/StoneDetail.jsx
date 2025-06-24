import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStones } from '../services/api';

export default function StoneDetail() {
  const { param } = useParams();
  const [stone, setStone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchStone = async () => {
    const data = await getStones(param);
    setStone(data);
    setLoading(false);
  };

  fetchStone();
}, [param]);

  if (loading) return <div className="text-center p-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-600">{error}</div>;
  if (!stone) return <div className="text-center p-10">Stone not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800 bg-white rounded-2xl shadow-md mb-10 mt-6">
      <strong>
        <p className="text-center text-2xl text-[#b86935] font-bold mt-4">{stone.pedra}</p>
      </strong>

      <strong>
        <p className="text-center text-xl text-[#b86935] mt-6">{stone.titulo1}</p>
      </strong>
      <p className="text-justify mt-2 leading-relaxed">{stone.sobre}</p>

      <strong>
        <p className="text-center text-xl text-[#b86935] mt-6">{stone.titulo2}</p>
      </strong>
      <p className="text-justify mt-2 leading-relaxed">{stone.significado}</p>

      <strong>
        <p className="text-center text-xl text-[#b86935] mt-6">{stone.titulo3}</p>
      </strong>
      <p className="text-justify mt-2 leading-relaxed">{stone.efeitos}</p>

      <strong>
        <p className="text-center text-xl text-[#b86935] mt-6">{stone.titulo4}</p>
      </strong>
      <p className="text-justify mt-2 leading-relaxed">{stone.limpeza}</p>
    </div>
  );
}
