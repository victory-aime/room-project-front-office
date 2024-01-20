'use client';

import { useState } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { Avatar, Box } from '@chakra-ui/react';
import Dropdown from '../../dropdown';

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: 'GET' });
  } catch (err) {
    console.error(err);
  }
}

const Navbar = () => {
  const { data: session } = useSession(); // Get the session information

  const navigation = [{ title: 'Rooms-Book', path: '/home/book' }];

  const [state, setState] = useState(true);

  return (
    <nav className="relative mx-auto w-full items-center px-4 pt-5 sm:px-8 md:flex md:space-x-6">
      <div className="flex justify-between">
        <a href="/home/page">
          <img
            src="https://www.floatui.com/logo.svg"
            width={120}
            height={50}
            alt="Float UI logo"
          />
        </a>
        <button
          className="text-gray-500 outline-none md:hidden"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      <ul
        className={`mt-12 flex-1 justify-between md:mt-0 md:flex md:text-sm md:font-medium ${
          state
            ? 'absolute inset-x-0 border-b bg-white px-4 md:static md:border-none'
            : 'hidden'
        }`}
      >
        <div className="items-center space-y-5 md:ml-12 md:flex md:space-x-6 md:space-y-0">
          {navigation.map((item, idx) => (
            <li className="text-gray-500 hover:text-indigo-600" key={idx}>
              <a href={item.path}>{item.title}</a>
            </li>
          ))}
        </div>
        {session ? (
          <li className="group relative order-2 py-5 md:py-0">
            <div className="flex items-center focus:outline-none">
              <span className="ml-2 mr-4 text-gray-500">
                {session?.user?.name}
              </span>

              <Dropdown
                button={
                  <Box width={24} height={24} boxShadow={'lg'}>
                    <Avatar
                      src="https://bit.ly/broken-link"
                      borderRadius={50}
                      bgColor={'#333'}
                      onClick={() => {}}
                    />
                  </Box>
                }
                classNames={'py-2 top-8 -left-[180px] w-max'}
              >
                <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                  <div className="ml-4 mt-3">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        👋 Hey, {session.user.name}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

                  <div className="ml-4 mt-3 flex flex-col">
                    <a
                      href="/home/profile"
                      className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                    >
                      Profile Settings
                    </a>
                    <button
                      onClick={() => {
                        keycloakSessionLogOut().then(() =>
                          signOut({ callbackUrl: '/' }),
                        );
                      }}
                      className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </Dropdown>
            </div>
          </li>
        ) : (
          <li className="order-2 py-5 md:py-0">
            <button
              onClick={() => signIn('keycloak')}
              className="block rounded-lg bg-indigo-600 px-5 py-2 text-center font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-700 md:inline md:py-3"
            >
              Get started
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
