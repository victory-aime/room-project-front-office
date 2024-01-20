'use client';

import Image from 'next/image'
import homeImage from '../../../public/bedroom.jpg'

export default function HeroSection() {


  return (
    <>
      <section className="py-28">
        <div className="mx-auto w-full items-center justify-between gap-x-12 overflow-hidden text-gray-600 md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h1 className="text-sm font-medium text-indigo-600">
              Over 200 successful deals
            </h1>
            <h2 className="text-4xl font-extrabold text-gray-800 md:text-5xl">
              We help startups to grow and make money
            </h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <a
                href="javascript:void(0)"
                className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white shadow-lg duration-150 hover:bg-indigo-500 hover:shadow-none active:bg-indigo-700"
              >
                Let's get started
              </a>
              <a
                href="javascript:void(0)"
                className="flex items-center justify-center gap-x-2 rounded-lg border px-4 py-2 font-medium text-gray-700 duration-150 hover:text-gray-500 active:bg-gray-100 md:inline-flex"
              >
                Get access
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-none md:mt-0 md:max-w-xl">
            <Image
              src={homeImage}
              className=" md:rounded-tl-[108px]"
              alt="bedroom"
            />
          </div>
        </div>
      </section>
    </>
  );
}
