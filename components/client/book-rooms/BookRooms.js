'use client';

import React, { useEffect, useState } from 'react';
import { AiFillCar, AiFillTool } from 'react-icons/ai';
import { GiCarDoor } from 'react-icons/gi';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import Checkbox from '../../checkbox';
import ModalComponent from '../../modal';
import { Center, ChakraProvider } from '@chakra-ui/react';
import { MoonLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import SuccessModalComponent from '../../modal/successModal';
import ErrorModalComponent from '../../modal/errorModal';

function BookRoom() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(4);
  const [paginationRange, setPaginationRange] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [showDouble, setShowDouble] = useState(false);
  const [showSuite, setShowSuite] = useState(false);
  const [showSingle, setShowSingle] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const router = useRouter();

  const openModal = (room) => {
    setSelectedRoom(room);
  };

  const openReserveModal = (room) => {
    setSelectedRoom(room);
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setIsModalOpen(false);
    setIsErrorModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  useEffect(() => {
    const range = [];
    const totalPages = Math.ceil(rooms.length / roomsPerPage);
    const maxButtonsToShow = 4;

    let startPage, endPage;
    if (totalPages <= maxButtonsToShow) {
      // Show all buttons
      startPage = 1;
      endPage = totalPages;
    } else {
      // Determine the range of buttons to show
      const middlePage = Math.floor(maxButtonsToShow / 2);
      if (currentPage <= middlePage) {
        // Show first n buttons
        startPage = 1;
        endPage = maxButtonsToShow;
      } else if (currentPage + middlePage >= totalPages) {
        // Show last n buttons
        startPage = totalPages - maxButtonsToShow + 1;
        endPage = totalPages;
      } else {
        // Show middle n buttons
        startPage = currentPage - middlePage;
        endPage = currentPage + middlePage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    setPaginationRange(range);
  }, [currentPage, rooms, roomsPerPage]);

  const onSubmit = async (room) => {
    const data = {
      roomId: room.id,
    };
    console.log(data);
    try {
      const response = await fetch('/api/add-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

  function resetAllFilters() {
    setShowSuite(false);
    setShowDouble(false);
    setShowSingle(false);
  }

  function handleSingleChange(e) {
    setShowSingle(e.target.checked);
    if (e.target.checked) {
      setShowDouble(false);
      setShowSuite(false);
    }
  }

  function handleDoubleChange(e) {
    setShowDouble(e.target.checked);
    if (e.target.checked) {
      setShowSingle(false);
      setShowSuite(false);
    }
  }

  function handleSuiteChange(e) {
    setShowSuite(e.target.checked);
    if (e.target.checked) {
      setShowSingle(false);
      setShowDouble(false);
    }
  }

  useEffect(() => {
    setIsLoadingRoom(true);
    const fetchRooms = async () => {
      try {
        const response = await fetch(`/api/get-room`, { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setRooms(data.data);
        } else {
          console.error('Error fetching rooms:', response.statusText);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    setTimeout(() => {
      setIsLoadingRoom(false);
    }, 1000);
    fetchRooms();
  }, []);

  // Effectuer le filtrage chaque fois que l'état change
  useEffect(() => {
    const result = rooms.filter((room) => {
      let matchSingle = true,
        matchDouble = true,
        matchSuite = true;

      if (showDouble || showSingle || showSuite) {
        matchSingle =
          (showSuite && room.roomType === 'SUITE') ||
          (showDouble && room.roomType === 'DOUBLE') ||
          (showSingle && room.roomType === 'SINGLE');
      }

      return matchSingle && matchDouble && matchSuite;
    });

    setFilteredRooms(result);
  }, [showSingle, showSuite, showDouble, rooms]);

  useEffect(() => {
    if (isSuccessModalOpen) {
      const redirectTimeout = setTimeout(() => {
        router.push('/home/reservations');
      }, 10);
      return () => clearTimeout(redirectTimeout);
    }
  }, [isSuccessModalOpen]);

  return (
    <ChakraProvider>
      {isLoadingRoom && (
        <Center minHeight="100vh">
          <MoonLoader size={50} color="blue" />
        </Center>
      )}
      <section id="models-main" className="mt-20">
        <div className="m-6 mt-8 flex justify-end">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-3xl border border-gray-300 px-4 py-2"
          />
        </div>
        <div className="my-8 flex flex-col px-8 py-8 lg:flex-row lg:px-32 lg:py-16">
          <div className="w-full px-2 lg:w-1/3">
            <div className="rounded border border-gray-200 p-4">
              <div className="flex justify-between">
                <h2>+ of Filters</h2>
                <small className="cursor-pointer" onClick={resetAllFilters}>
                  Reset all
                </small>
              </div>
              <hr />
              <div className="mt-4 py-2">
                <div className="flex justify-between">
                  <h3>Gearbox</h3>
                  <small className="cursor-pointer" onClick={resetAllFilters}>
                    reset
                  </small>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between ">
                    <div>Suite</div>
                    <Checkbox
                      checked={showSuite}
                      onChange={handleSuiteChange}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>Double</div>
                    <Checkbox
                      checked={showDouble}
                      onChange={handleDoubleChange}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>Single</div>
                    <Checkbox
                      checked={showSingle}
                      onChange={handleSingleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-12/12 w-full px-4">
            <div className="grid grid-cols-1 gap-8">
              {filteredRooms.length > 0 ? (
                (() => {
                  let searchFilteredRoom = filteredRooms.filter(
                    (room) =>
                      room.status.toString().includes(search) ||
                      room.roomType.toString().includes(search) ||
                      room.costPerNight.toString().includes(search),
                  );

                  if (searchFilteredRoom.length > 0) {
                    return searchFilteredRoom.map((room) => {
                      return (
                        <div className="border-lighter-grey relative rounded border bg-white p-4">
                          <div className="flex flex-col lg:flex-row">
                            <div className="mb-4 w-full lg:mb-0 lg:w-2/3">
                              <div className="image-container ">
                                <div className="flex h-full w-full transform items-center justify-center rounded-lg  transition-all duration-300 hover:scale-x-110">
                                  <img
                                    src="/bedroom.jpg"
                                    alt="img"
                                    className="rounded-2xl"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="w-full p-2 lg:w-1/2">
                              <div className="mb-8 flex items-center justify-between">
                                <div className="space-y-1">
                                  <div>
                                    <h1 className="-mt-6 text-xl font-bold lg:text-xl">
                                      {room.roomType}
                                    </h1>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <h1 className="text-xl font-bold lg:text-xl">
                                    {room.costPerNight} DT
                                  </h1>
                                  <p className="text-custom-grey">per nigth</p>
                                </div>
                              </div>
                              <div className="mb-4 flex items-center justify-between text-lg">
                                <div className="-mt-8 flex items-center gap-2">
                                  <span>
                                    <AiFillCar className="text-blue-600" />
                                  </span>
                                  <span>{room.status}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="-mt-5">room.door</span>
                                  <span>
                                    <GiCarDoor className="-mt-5 text-blue-600" />
                                  </span>
                                </div>
                              </div>
                              <div className="mb-2 flex items-center justify-between text-lg">
                                <div className="flex items-center gap-2">
                                  <span>
                                    <AiFillTool className="text-blue-600" />
                                  </span>
                                  <span>room.gearBox</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span>room.fuel</span>
                                  <span>
                                    <BsFillFuelPumpFill className="text-blue-600" />
                                  </span>
                                </div>
                              </div>
                              <div>
                                <hr className="border-lighter-grey mt-4 border" />
                              </div>
                              <div className="mt-4 flex space-x-4">
                                <button
                                  onClick={() => openReserveModal(room)}
                                  className={`flex w-full items-center justify-center rounded p-2 font-bold text-white ${
                                    room.status === 'OCCUPIED'
                                      ? 'bg-red-500'
                                      : 'bg-blue-600'
                                  }`}
                                  disabled={room.status === 'OCCUPIED'}
                                >
                                  {room.status === 'OCCUPIED'
                                    ? 'OCCUPIED'
                                    : 'Book now'}
                                </button>

                                <button
                                  onClick={() => openModal(room)}
                                  className="block w-full rounded bg-blue-600 p-2 text-center font-bold text-white"
                                >
                                  More details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  } else {
                    return (
                      <div className="mt-8 text-center text-xl font-bold">
                        No rooms match the selected filters.
                      </div>
                    );
                  }
                })()
              ) : (
                <div className="mt-8 text-center text-xl font-bold">
                  No rooms match the selected filters.
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-center">
              {rooms.length > roomsPerPage && (
                <ul className="flex max-w-xs items-center">
                  {paginationRange.map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        className={`${
                          currentPage === pageNumber
                            ? 'bg-blue-500 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        } mx-1 rounded px-4 py-2 font-bold`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {selectedRoom && (
              <ModalComponent
                title="Your Modal Title"
                primaryButtonLabel="Save"
                secondaryButtonLabel="Cancel"
                isOpen={openModal}
                onClose={closeModal}
                size="xl"
              >
                <div>
                  <p>Room Number: {selectedRoom.roomNumber}</p>
                  <p>Room Type: {selectedRoom.roomType}</p>
                  <p>Cost Per Night: {selectedRoom.costPerNight}</p>
                  <p>Status: {selectedRoom.status}</p>
                  <p>Description: {selectedRoom.description}</p>
                </div>
              </ModalComponent>
            )}

            {selectedRoom && (
              <ModalComponent
                title="Book Room"
                primaryButtonLabel="Yes"
                secondaryButtonLabel="No"
                isOpen={openReserveModal}
                onClose={closeModal}
                onSubmit={() => onSubmit(selectedRoom)}
                showButton={true}
                showCloseButton={true}
                size="xl"
              >
                <div>
                  voulez vous reserver cette chambre ?
                  <p>Room Number: {selectedRoom.id}</p>
                  <p>Room Type: {selectedRoom.roomType}</p>
                  <p>Cost Per Night: {selectedRoom.costPerNight}</p>
                  <p>Status: {selectedRoom.status}</p>
                  <p>Description: {selectedRoom.description}</p>
                </div>
              </ModalComponent>
            )}
          </div>
        </div>
      </section>
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

export default BookRoom;
