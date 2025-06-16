import { useAuthContext } from '../context/AuthContext';
import Banner from '../components/MainBanner';
import MainCarosel from '../components/MainCarosel';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export default function Home() {
  const { user } = useAuthContext(); 
  
    return (
        <main className="w-full">
        <Banner />
        <section className="p-4 text-center">
          <MainCarosel />
            <h1 className="text-2xl font-bold text-gray-700">Bem-vindo à nossa loja!</h1>
            <p className="text-gray-500 mt-2">Confira nossas bijuterias exclusivas e encantadoras.</p>
          </section>
        </main>
    );
  }