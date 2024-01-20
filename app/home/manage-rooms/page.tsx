import RoomTable from '../../../components/client/manage-room/room-table/RoomTable';
import Navbar from '../../../components/client/navbar/Navbar';
import { Footer } from '../../../components/client/footer/Footer';

const ManageRooms = () => {
  return (
    <main>
      <Navbar />
      <RoomTable />
      <Footer />
    </main>
  );
};

export default ManageRooms;
