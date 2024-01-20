'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ClipLoader, MoonLoader } from 'react-spinners';
import { Center } from '@chakra-ui/react';
import NFt2 from '/public/bedroom.jpg';
import Image from 'next/image';

export const RoomProducts = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const buttonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
    }, 1000);
    fetchRooms();
  }, []);

  function goBook() {
    setIsFetching(true);
    router.push('/home/book');
  }

  return (
    <section className="py-32">
      {isLoading && (
        <Center minHeight="100vh">
          <MoonLoader size={50} color="blue" />
        </Center>
      )}
      <div className="mx-auto w-full px-4 md:px-8">
        <div className="space-y-5 sm:mx-auto sm:max-w-md sm:text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            Latest Room
          </h1>
        </div>
        <ul className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((items, key) => (
            <li className="group mx-auto w-full sm:max-w-sm" key={key}>
              <Image
                width={300}
                height={300}
                src={NFt2}
                loading="lazy"
                alt={'img'}
                className="w-full rounded-lg"
              />
              <div className="mt-3 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 duration-150 group-hover:text-indigo-600">
                  {items.roomType}
                </h3>
                <p className="text-sm text-gray-600 duration-150 group-hover:text-gray-800">
                  {items.description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexDirection: 'row-reverse',
                  marginTop: 25,
                }}
              >
                {isFetching ? (
                  <div className="flex items-center">
                    <p className="mr-2">.</p>
                    <ClipLoader
                      color="#36D7B7"
                      loading={isFetching}
                      size={20}
                      speedMultiplier={3}
                    />
                  </div>
                ) : (
                  <button
                    ref={buttonRef}
                    onClick={() => {
                      goBook();
                    }}
                    className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white shadow-lg duration-150 hover:bg-indigo-500 hover:shadow-none active:bg-indigo-700"
                  >
                    explore more
                  </button>
                )}
                <button className="mr-5 block rounded-lg bg-green-600 px-4 py-2 text-center font-medium text-white shadow-lg duration-150 hover:bg-green-500 hover:shadow-none active:bg-green-300">
                  info
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
