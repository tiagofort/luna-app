import { Disclosure } from '@headlessui/react';
import { useState } from "react";
import { Menu, X, ShoppingCart, UserX, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/luna-logo.png';
import CartDrawer from "../components/CartDrawer";
import LoginModal from './LoginModal';
import { useCart } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthContext();
  const { logoutUser } = useAuthContext();
  const isLoggedIn = !!user;

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

 

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow-md">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-24 items-center">
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img
                      className="w-28 sm:w-32 md:w-40 object-contain"
                      src={logo}
                      alt="Logo"
                    />
                  </Link>
                </div>

                <div className="hidden md:flex space-x-6 items-center">
                  <Link to="/" className="text-mainColor font-semibold hover:text-black">Home</Link>
                  <Link to="/accessories/all" className="text-mainColor font-semibold hover:text-black">Accessories</Link>
                  <Link to="/about" className="text-mainColor font-semibold hover:text-black">About Us</Link>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Botão de Usuário com modal */}
                  <div className="relative mr-8 group">
                    {isLoggedIn ? (
                      <div className="relative">
                        <button className="relative">
                          <UserCheck className="w-6 h-6 text-green-500" />
                        </button>

                        {/* Tooltip flutuante com detalhes */}
                        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-52 bg-white shadow-xl rounded-xl border border-gray-200 z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <div className="p-4 text-sm">
                            <h3 className="font-semibold text-gray-800 mb-1 text-base">👤 User Details</h3>
                            <p className="text-gray-600 text-xs break-words">{user?.email}</p>
                          </div>
                          <div className="border-t px-4 py-2 bg-gray-50 rounded-b-xl">
                            <button
                              onClick={logoutUser}
                              className="w-full text-sm text-red-500 hover:text-red-600 transition"
                            >
                              logout
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <button onClick={() => setIsModalOpen(true)}>
                          <UserX className="w-6 h-6 text-red-500" />
                        </button>

                        {/* Tooltip para não logado */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-medium rounded-md py-1.5 px-3 shadow-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                          Click to Connect
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botão do carrinho */}
                  <button onClick={() => setCartOpen(true)} className="relative">
                    <ShoppingCart className="w-6 h-6 text-mainColor" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black rounded-full px-1">
                        {totalItems}
                      </span>
                    )}
                  </button>

                  {/* Menu mobile */}
                  <div className="md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-mainColor hover:text-black focus:outline-none">
                      {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu mobile aberto */}
            <Disclosure.Panel className="md:hidden px-4 pt-2 pb-3 space-y-1 bg-white">
              <Link to="/" className="block text-mainColor font-semibold hover:text-black">Home</Link>
              <Link to="/accessories/all" className="block text-mainColor font-semibold hover:text-black">Accessories</Link>
              <Link to="/about" className="block text-mainColor font-semibold hover:text-black">About Us</Link>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Drawer do carrinho */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Modal de login */}
      <LoginModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
