'use client';

import Ongoing from '../../../components/client/reservations/Ongoing';
import { Box } from '@chakra-ui/react';
import Navbar from '../../../components/client/navbar/Navbar';
import { Footer } from '../../../components/client/footer/Footer';

export default function ReservationsPage() {
  return (
    <Box>
      <Navbar />
      <Ongoing />
      <Footer />
    </Box>
  );
}
