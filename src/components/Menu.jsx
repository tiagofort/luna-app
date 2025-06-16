import { Disclosure } from '@headlessui/react'
import { Menu, X, ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/luna-logo.png'

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24 items-center">

              <div className="flex-shrink-0">
                <Link to="/">
                  <img className="w-28 sm:w-32 md:w-40 object-contain" src={logo} alt="Logo" />
                </Link>
              </div>

              <div className="hidden md:flex space-x-6 items-center">
                <Link to="/" className="text-mainColor font-semibold hover:text-black">Home</Link>
                <Link to="/accessories" className="text-mainColor font-semibold hover:text-black">Accessories</Link>
                <Link to="/about" className="text-mainColor font-semibold hover:text-black">About Us</Link>
              </div>

              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-mainColor" />
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-mainColor" />
                  <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-white rounded-full px-1">12</span>
                </div>

                <div className="md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-mainColor hover:text-black focus:outline-none">
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden px-4 pt-2 pb-3 space-y-1 bg-white">
            <Link to="/" className="block text-mainColor font-semibold hover:text-black">Home</Link>
            <Link to="/accessories" className="block text-mainColor font-semibold hover:text-black">Accessories</Link>
            <Link to="/about" className="block text-mainColor font-semibold hover:text-black">About Us</Link>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
