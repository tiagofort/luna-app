import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Search, DollarSign, Tag, Gem } from "lucide-react"; // usando lucide-react para ícones
import { formatCurrency } from "../services/utils";

const Accessories = () => {
  const { param } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = parseInt(searchParams.get("page")) || 1;

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageQuery);
  const [stoneFilter, setStoneFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    setCurrentPage(pageQuery);
  }, [pageQuery]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/item/buscarPorParamentro/${param}`);
        const data = await res.json();
        setItems(data);
        setFiltered(data);
        setCurrentPage(pageQuery);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      }
    };
    fetchItems();
  }, [param]);

  useEffect(() => {
    let filteredItems = items;

    if (stoneFilter) {
      filteredItems = filteredItems.filter((i) =>
        i.pedra?.toLowerCase().includes(stoneFilter.toLowerCase())
      );
    }
    if (typeFilter) {
      filteredItems = filteredItems.filter((i) =>
        i.tipo?.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }
    if (materialFilter) {
      filteredItems = filteredItems.filter((i) =>
        i.material?.toLowerCase().includes(materialFilter.toLowerCase())
      );
    }
    if (priceFilter) {
      filteredItems = filteredItems.filter((i) => i.preco <= parseFloat(priceFilter));
    }

    setFiltered(filteredItems);
    setSearchParams({ page: currentPage });
  }, [stoneFilter, typeFilter, materialFilter, priceFilter, items]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-mainColor tracking-tight">Accessories</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Gem className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Stone. e.g: Agate"
            value={stoneFilter}
            onChange={(e) => setStoneFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-mainColor focus:border-mainColor"
          />
        </div>
        <div className="relative">
          <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Type. e.g: Earring"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-mainColor focus:border-mainColor"
          />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Material. e.g: Silver"
            value={materialFilter}
            onChange={(e) => setMaterialFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-mainColor focus:border-mainColor"
          />
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="number"
            placeholder="Max Price. e.g: 25"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-mainColor focus:border-mainColor"
          />
        </div>
      </div>

      {/* Lista de Itens */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/item/${item._id}`)}
            className="border rounded-2xl p-4 shadow-md hover:shadow-xl transition-all cursor-pointer bg-white"
          >
            <img
              src={item.midia?.url1}
              alt={item.titulo}
              className="w-full h-48 object-contain rounded-lg bg-gray-50"
            />
            <h3 className="mt-3 text-lg font-semibold text-gray-800">{item.titulo}</h3>
            <p className="text-sm text-gray-500">{item.tipo} · {item.pedra} · {item.material}</p>
            <p className="text-mainColor font-bold text-base mt-2">
              {formatCurrency(item.preco, 'EUR', 'en-IE')}
            </p>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              currentPage === index + 1
                ? "bg-mainColor text-white shadow"
                : "border border-mainColor text-mainColor hover:bg-mainColor hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Accessories;
