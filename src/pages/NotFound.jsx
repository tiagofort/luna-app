import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="p-8 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-gray-600 mb-4">Página não encontrada.</p>
      <Link to="/" className="text-mainColor font-bold hover:underline">
        Voltar para a Home
      </Link>
    </section>
  );
}
