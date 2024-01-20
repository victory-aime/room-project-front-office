import HeroSection from '../../../components/client/hero-section/HeroSection';
import { RoomProducts } from '../../../components/client/rooms/RoomProducts';
import { Footer } from '../../../components/client/footer/Footer';
import Navbar from '../../../components/client/navbar/Navbar';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <RoomProducts />
      <Footer />
    </div>
  );
}
