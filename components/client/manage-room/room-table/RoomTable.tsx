'use client';

import { MdEdit, MdDelete } from 'react-icons/md';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FiInfo } from 'react-icons/fi';

function RoomTable() {
  const router = useRouter();
  const [rental, setRental] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(1);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const indexOfLastCar = currentPage * rentalPerPage;
  const indexOfFirstCar = indexOfLastCar - rentalPerPage;
  const currentRental = rental.slice(indexOfFirstCar, indexOfLastCar);
  const [rentalDelete, setRentalDelete] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const openModal = (rental) => {
    setSelectedRental(rental);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false); // Fermer la modal d'informations
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

  return (
    <div className="mb-24 mt-24">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="spinner"></div>
        </div>
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
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    End Date
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
                  <tr key={rental.id}>
                    <td className="text-left">{rental.car.brand}</td>
                    <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                    <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                    <td>{rental.total} DT</td>
                    <td className=" flex justify-center  space-x-2 px-6 py-4">
                      <button
                        //onClick={() => goEditReservations(rental.id)}
                        className="mx-1 rounded bg-blue-500 p-2 text-white"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        className="mx-1 rounded bg-green-500 p-2 text-white"
                        onClick={() => openModal(rental)}
                      >
                        <FiInfo size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteModalIsOpen(true); // Open the delete modal
                          setRentalDelete(rental);
                        }}
                        className="mx-1 rounded bg-red-500 p-2 text-white"
                      >
                        <MdDelete size={18} />
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
        </>
      )}
    </div>
  );
}

export default RoomTable;
