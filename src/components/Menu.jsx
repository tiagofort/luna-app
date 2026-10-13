import { useState } from 'react';
import { Disclosure, Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Menu, X, ShoppingBag, UserRound, ChevronDown, LogOut } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/luna-logo.png';
import CartDrawer from '../components/CartDrawer';
import LoginModal from './LoginModal';
import { useCart } from '../context/CartContext';
import { useAuthContext } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/accessories/all', label: 'Accessories' },
  { to: '/about', label: 'About us' },
];

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCart();
  const totalItems = (cart ?? []).reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#e9e4db] bg-[#faf8f4]/95 backdrop-blur-xl">
        <Disclosure as="nav" aria-label="Main navigation">
          {({ open, close }) => (
            <>
              <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-4 sm:h-24 sm:px-8 lg:px-12">
                <Link to="/" aria-label="Luna home" className="shrink-0" onClick={() => close()}>
                  <img src={logo} alt="Luna" className="h-12 w-auto max-w-[125px] object-contain sm:h-16 sm:max-w-[165px]" />
                </Link>

                <div className="hidden items-center gap-9 md:flex">
                  {links.map(({ to, label, end }) => (
                    <NavLink key={to} to={to} end={end} className={({ isActive }) => `relative py-3 text-[11px] font-semibold uppercase tracking-[.17em] transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:bg-[#a88b67] after:transition-all ${isActive ? 'text-[#263b32] after:w-full' : 'text-[#77766d] after:w-0 hover:text-[#263b32] hover:after:w-full'}`}>
                      {label}
                    </NavLink>
                  ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  {user ? (
                    <HeadlessMenu as="div" className="relative">
                      <HeadlessMenu.Button className="inline-flex min-h-11 items-center gap-1 rounded-full p-2 text-[#263b32] transition hover:bg-[#efe9df]" aria-label="Open account menu">
                        <UserRound size={21} strokeWidth={1.6} /><ChevronDown size={13} />
                      </HeadlessMenu.Button>
                      <Transition enter="transition duration-150 ease-out" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition duration-100 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <HeadlessMenu.Items className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-[#e8e0d4] bg-[#faf8f4] p-3 shadow-xl focus:outline-none">
                          <div className="border-b border-[#e8e0d4] px-3 py-3"><p className="text-[10px] uppercase tracking-[.2em] text-[#a28c6c]">Signed in as</p><p className="mt-1 break-all text-sm text-[#263b32]">{user.email}</p></div>
                          <HeadlessMenu.Item>{({ active }) => <button type="button" onClick={logoutUser} className={`mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm text-[#263b32] ${active ? 'bg-[#efe9df]' : ''}`}><LogOut size={16}/> Log out</button>}</HeadlessMenu.Item>
                        </HeadlessMenu.Items>
                      </Transition>
                    </HeadlessMenu>
                  ) : (
                    <button type="button" onClick={() => setIsModalOpen(true)} className="rounded-full p-2 text-[#263b32] transition hover:bg-[#efe9df]" aria-label="Log in"><UserRound size={22} strokeWidth={1.6}/></button>
                  )}

                  <button type="button" onClick={() => setCartOpen(true)} className="relative rounded-full p-2 text-[#263b32] transition hover:bg-[#efe9df]" aria-label={`Open cart, ${totalItems} items`}>
                    <ShoppingBag size={22} strokeWidth={1.6}/>
                    {totalItems > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#263b32] px-1 text-[10px] font-semibold text-white">{totalItems > 99 ? '99+' : totalItems}</span>}
                  </button>

                  <Disclosure.Button className="inline-flex rounded-full p-2 text-[#263b32] transition hover:bg-[#efe9df] md:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={23}/> : <Menu size={23}/>}</Disclosure.Button>
                </div>
              </div>
              <Disclosure.Panel className="border-t border-[#e9e4db] bg-[#faf8f4] px-5 py-5 md:hidden">
                <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
                  {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} onClick={() => close()} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-[#eee9df] text-[#263b32]' : 'text-[#77766d] hover:bg-[#f0ebe2]'}`}>{label}</NavLink>)}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <LoginModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
