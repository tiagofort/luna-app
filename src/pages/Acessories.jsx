import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

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
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-mainColor">Accessories</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Stone. e.g:Agate"
          value={stoneFilter}
          onChange={(e) => setStoneFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Type. e.g:Earing"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Material. e.g:Silver Plated"
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Price. e.g:25"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Lista de Itens */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/item/${item._id}`)}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={item.midia?.url1}
              alt={item.titulo}
              className="w-full h-40 object-contain rounded bg-gray-100"
            />
            <h3 className="mt-2 text-lg font-semibold">{item.titulo}</h3>
            <p className="text-sm text-gray-500">{item.tipo} · {item.pedra} · {item.material}</p>
            <p className="text-mainColor font-bold mt-1">${item.preco}</p>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-mainColor text-white"
                : "border border-mainColor text-mainColor"
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
