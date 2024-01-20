import BookRoom from '../../../components/client/book-rooms/BookRooms';
import Navbar from '../../../components/client/navbar/Navbar';
import { Footer } from '../../../components/client/footer/Footer';

export default function BookPage() {
  return (
    <div>
      <Navbar />
      <BookRoom />
      <Footer />
    </div>
  );
}
