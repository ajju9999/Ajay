'use client';

import { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { mockFlights } from '@/data/flights';
import { Passenger } from '@/types/flight';

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const flightId = params.flightId as string;
  const flightClass = (searchParams.get('class') || 'economy') as 'economy' | 'business' | 'first';

  const flight = mockFlights.find((f) => f.id === flightId);
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      passportNumber: '',
    },
  ]);

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Flight not found</h1>
          <p className="text-gray-600">The flight you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const price = flight.price[flightClass];
  const totalPrice = price * numPassengers;

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleNumPassengersChange = (num: number) => {
    setNumPassengers(num);
    const newPassengers = [...passengers];
    if (num > passengers.length) {
      for (let i = passengers.length; i < num; i++) {
        newPassengers.push({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          passportNumber: '',
        });
      }
    } else {
      newPassengers.splice(num);
    }
    setPassengers(newPassengers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingId = `BK${Date.now()}`;
    const booking = {
      id: bookingId,
      flight,
      passengers,
      totalPrice,
      bookingDate: new Date().toISOString(),
      class: flightClass,
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(`booking_${bookingId}`, JSON.stringify(booking));
    }
    
    router.push(`/confirmation/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Number of Passengers</h2>
                <select
                  value={numPassengers}
                  onChange={(e) => handleNumPassengersChange(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>

              {passengers.map((passenger, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Passenger {index + 1} Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={passenger.firstName}
                        onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={passenger.lastName}
                        onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={passenger.email}
                        onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={passenger.phone}
                        onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        value={passenger.dateOfBirth}
                        onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passport Number *
                      </label>
                      <input
                        type="text"
                        value={passenger.passportNumber}
                        onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Confirm Booking - ${totalPrice}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Flight</p>
                  <p className="font-semibold text-gray-900">
                    {flight.airline} {flight.flightNumber}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Route</p>
                  <p className="font-semibold text-gray-900">
                    {flight.origin} → {flight.destination}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Departure</p>
                  <p className="font-semibold text-gray-900">{flight.departureTime}</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Arrival</p>
                  <p className="font-semibold text-gray-900">{flight.arrivalTime}</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">{flight.duration}</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-semibold text-gray-900 capitalize">{flightClass}</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Passengers</p>
                  <p className="font-semibold text-gray-900">{numPassengers}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Price per person</p>
                    <p className="font-semibold text-gray-900">${price}</p>
                  </div>
                </div>

                <div className="border-t pt-4 bg-blue-50 -mx-6 px-6 py-4 rounded-b-xl">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900">Total</p>
                    <p className="text-2xl font-bold text-blue-600">${totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
