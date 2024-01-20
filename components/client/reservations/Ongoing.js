'use client';

import React, { useEffect, useState } from 'react';
import { FiInfo, FiTrash } from 'react-icons/fi';
import ModalComponent from '../../../components/modal';
import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { MoonLoader } from 'react-spinners';
import SuccessModalComponent from '../../../components/modal/successModal';
import ErrorModalComponent from '../../../components/modal/errorModal';

function Ongoing() {
  const [rental, setRental] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalPerPage] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(1);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const indexOfLastCar = currentPage * rentalPerPage;
  const indexOfFirstCar = indexOfLastCar - rentalPerPage;
  const currentRental = rental.slice(indexOfFirstCar, indexOfLastCar);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const openModal = (rental) => {
    setSelectedRental(rental);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteModalIsOpen(false);
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
  };

  const openDeleteModal = (rental) => {
    setDeleteModalIsOpen(true);
  };
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + rentalPerPage);
      setMinPageNumberLimit(minPageNumberLimit + rentalPerPage);
    }
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % rentalPerPage === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - rentalPerPage);
      setMinPageNumberLimit(minPageNumberLimit - rentalPerPage);
    }
  };

  const onSubmit = async (rental) => {
    const id = {
      roomId: rental.id,
    };
    try {
      const response = await fetch(`/api/delete-reservation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      if (response.ok) {
        const successData = await response.json();
        setTimeout(() => {
          setIsSuccessModalOpen(true);
          setSuccessMessage(successData.data);
        }, 10);
      } else {
        const errorData = await response.json();
        setTimeout(() => {
          setIsErrorModalOpen(true);
          setErrorMessage(errorData.error);
        }, 10);
      }
    } catch (error) {
      setIsErrorModalOpen(true);
    }
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchRooms = async () => {
      try {
        const response = await fetch(`/api/get-reservations`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setRental(data.data);
        } else {
          console.error('Error fetching rooms:', response.statusText);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fetchRooms();
  }, []);

  return (
    <ChakraProvider>
      <Box mt={10} p={15} mb={10}>
        {isLoading ? (
          <Center minHeight="100vh">
            <MoonLoader size={50} color="blue" />
          </Center>
        ) : rental.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center ">
            <div className="mr-5 flex h-32 w-32 -rotate-12 transform items-center justify-center overflow-hidden rounded shadow-lg">
              <img
                className="h-full w-full object-cover"
                src="/no-reservations.jpeg"
                alt="No reservations"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold uppercase">
                you do not have a reservation planned
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-md border p-4">
              <table className="min-w-full">
                <thead className="text-center">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      room type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="text-x px-6  py-3 font-medium uppercase tracking-wider text-gray-500">
                  {currentRental.map((rental) => (
                    <tr key={rental?.id}>
                      <td className="text-left">{rental.room?.roomType}</td>
                      <td>{rental.room?.costPerNight} DT</td>
                      <td className=" flex justify-center  space-x-2 px-6 py-4">
                        <button
                          className="mx-1 rounded bg-green-500 p-2 text-white"
                          onClick={() => openModal(rental)}
                        >
                          <FiInfo size={18} />
                        </button>
                        <button
                          className="mx-1 rounded bg-red-500 p-2 text-white"
                          onClick={() => openDeleteModal(rental)}
                        >
                          <FiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              {rental.length > rentalPerPage && (
                <ul className="flex items-center">
                  {currentPage !== 1 && (
                    <>
                      <li>
                        <button
                          onClick={() => setCurrentPage(1)}
                          className="mx-1 rounded bg-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-300"
                        >
                          First
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handlePrevBtn}
                          className="mx-1 rounded bg-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-300"
                        >
                          Prev
                        </button>
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      className={`mx-1 rounded bg-blue-500 px-4 py-2 font-bold text-white`}
                    >
                      {currentPage}
                    </button>
                  </li>
                  {currentPage !== Math.ceil(rental.length / rentalPerPage) && (
                    <>
                      <li>
                        <button
                          onClick={handleNextBtn}
                          className="mx-1 rounded bg-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-300"
                        >
                          Next
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.ceil(rental.length / rentalPerPage),
                            )
                          }
                          className="mx-1 rounded bg-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-300"
                        >
                          Last
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
            {selectedRental && (
              <ModalComponent
                isOpen={modalIsOpen}
                title={'Informations'}
                onClose={closeModal}
                showButton={false}
                showCloseButton={true}
                secondaryButtonLabel={'Close'}
              >
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem colSpan={1}>
                    <Box width={200} height={200}>
                      <img
                        src="/bedroom.jpg"
                        alt="img"
                        className=" w-full rounded-xl"
                      />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Box flexDirection="row" mt={4}>
                      <Text fontWeight="bold">
                        {selectedRental.room.roomType}
                      </Text>
                    </Box>
                    <Box flexDirection="row" mt={4}>
                      <Text>Description</Text>
                      <Text>{selectedRental.room.description}</Text>
                    </Box>
                    <Box flexDirection="row" mt={4}>
                      <Text fontWeight="bold">Per nigth</Text>
                      <Text>{selectedRental.room.costPerNight} DT</Text>
                    </Box>
                  </GridItem>
                </Grid>
              </ModalComponent>
            )}

            {selectedRental && (
              <ModalComponent
                isOpen={deleteModalIsOpen}
                title={'Suppression'}
                onClose={closeModal}
                showButton={true}
                showCloseButton={true}
                primaryButtonLabel={'Apply'}
                secondaryButtonLabel={'Close'}
                onSubmit={() => onSubmit(selectedRental)}
              >
                voulez vous supprimez votre reservation ?
              </ModalComponent>
            )}
          </>
        )}
      </Box>

      {isSuccessModalOpen && (
        <SuccessModalComponent
          isOpen={true}
          onClose={closeModal}
          title="Success"
          description={successMessage}
        />
      )}

      {/* Modal d'erreur */}
      {isErrorModalOpen && (
        <ErrorModalComponent
          isOpen={true}
          onClose={closeModal}
          title="Error"
          description={errorMessage}
        />
      )}
    </ChakraProvider>
  );
}

export default Ongoing;
