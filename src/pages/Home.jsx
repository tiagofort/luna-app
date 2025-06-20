import { useAuthContext } from '../context/AuthContext';
import Banner from '../components/MainBanner';
import MainCarosel from '../components/MainCarosel';
import FeatureGrid from '../components/FeatureGrid';
import Crystals from '../components/Crystals';

export default function Home() {
  const { user } = useAuthContext(); 
  
    return (
        <main className="w-full">
        <Banner />
          <section className="p-4 text-center">
            <MainCarosel />
            <FeatureGrid />
            <Crystals />
          </section>
        </main>
    );
  }