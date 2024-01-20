'use client';

import { FiUser, FiPhone, FiHome, FiMap } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function Profile() {
  //const { data: session } = useSession();
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [images, setImages] = useState([]);
  const [drivingLicense, setDrivingLicense] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const validateInput = (input) => input.trim() !== '';

  /*useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
            "/api/client/profile?id=" + session.user.id
        );
        const { name, firstname, telephone, numPermis, address, city, image } =
            response.data.user;
        setName(name);
        setFirstname(firstname);
        setDrivingLicense(numPermis);
        setTelephone(telephone);
        setCity(city);
        setAddress(address);
        setImages(image ? [image] : []);
      } catch (error) {
        if (error.response) {
          toast.warning("An error occurred while loading data");
        }
      }
    };
    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Convert telephone to a string
    const telephoneString = String(telephone);

    // Validate the phone number using the country code for Tunisia (TN)
    const phoneNumber = parsePhoneNumberFromString(telephoneString, "TN");

    // Additional validation for the phone number
    const phoneNumberRegex = /^\+216\d{8}$/; // Matches "+216" followed by 8 digits
    const isPhoneNumberValid =
        phoneNumber &&
        phoneNumber.isValid() &&
        phoneNumberRegex.test(telephoneString);

    if (!isPhoneNumberValid) {
      toast.error("Please enter a valid Tunisian phone number");
      return;
    }
    const data = {
      name,
      firstname,
      telephone,
      drivingLicense,
      address,
      city,
      image: images?.length > 0 ? images[0] : null,
    };
    try {
      const response = await axios.put(
          "/api/client/profile?id=" + session.user.id,
          { ...data }
      );
      toast.success("Successfully updated");
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    }
  };



  */

  return (
    <div className="m-6 mb-24 mt-24 flex items-start justify-center rounded-2xl bg-white p-6 shadow">
      <form onSubmit={() => {}} className="mr-6">
        <p className="mb-5">
          We invite you to modify your personal information in the event of an
          error or a change of situation.
        </p>
        <div className="relative mb-4">
          <FiUser className="absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Name"
            className={`w-72 rounded border py-2 pl-10 pr-3 ${
              validateInput(name) ? 'border-green-500' : 'border-red-500'
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <FiUser className="absolute left-3 top-3" />
          <input
            type="text"
            placeholder="First Name"
            className={`w-72 rounded border py-2 pl-10 pr-3 ${
              validateInput(firstname) ? 'border-green-500' : 'border-red-500'
            }`}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className="relative mb-1">
          <FiMap className="absolute left-3 top-3" />
          <input
            type="text"
            placeholder="City"
            className={`w-72 rounded border py-2 pl-10 pr-3 ${
              validateInput(city) ? 'border-green-500' : 'border-red-500'
            }`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <p className="mb-4 mt-2 text-xs text-gray-500">
          Remember to check that your mobile phone number is up to date. It will
          be used to contact you during the delivery and collection of the
          vehicle.
        </p>
        <div className="relative mb-4">
          <FiHome className="absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Address"
            className={`w-72 rounded border py-2 pl-10 pr-3 ${
              validateInput(address) ? 'border-green-500' : 'border-red-500'
            }`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <p className="mb-4 mt-2 text-xs text-gray-500">
          The personal address is necessary information for the creation of the
          rental contract.
        </p>
        <button
          type="submit"
          className="w-72 rounded-xl bg-blue-500 px-4 py-2 font-bold uppercase text-white hover:bg-blue-700"
        >
          {isLoading ? 'Wait...' : 'confirm'}
        </button>
      </form>
    </div>
  );
}

export default Profile;
