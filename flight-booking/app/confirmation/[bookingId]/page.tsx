'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Booking } from '@/types/flight';

export default function ConfirmationPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooking = () => {
      if (typeof window !== 'undefined') {
        const storedBooking = localStorage.getItem(`booking_${bookingId}`);
        if (storedBooking) {
          const parsedBooking = JSON.parse(storedBooking);
          setBooking(parsedBooking);
        }
        setLoading(false);
      }
    };
    
    loadBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking not found</h1>
          <p className="text-gray-600 mb-4">The booking you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Your flight has been successfully booked
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90 mb-1">Booking Reference</p>
                <p className="text-2xl font-bold">{booking.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">Booking Date</p>
                <p className="font-semibold">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Flight Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-600 mb-1">Airline</p>
                <p className="text-lg font-semibold text-gray-900">
                  {booking.flight.airline}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Flight Number</p>
                <p className="text-lg font-semibold text-gray-900">
                  {booking.flight.flightNumber}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">From</p>
                <p className="text-lg font-semibold text-gray-900">
                  {booking.flight.origin}
                </p>
                <p className="text-sm text-gray-600">{booking.flight.departureTime}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">To</p>
                <p className="text-lg font-semibold text-gray-900">
                  {booking.flight.destination}
                </p>
                <p className="text-sm text-gray-600">{booking.flight.arrivalTime}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="text-lg font-semibold text-gray-900">
                  {booking.flight.duration}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Class</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {booking.class}
                </p>
              </div>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Passenger Information</h3>
              <div className="space-y-4">
                {booking.passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <p className="text-sm text-gray-600">Passenger {index + 1}</p>
                      <p className="font-semibold text-gray-900">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{passenger.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{passenger.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Passport</p>
                      <p className="font-semibold text-gray-900">{passenger.passportNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t mt-8 pt-8">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">
                  {booking.passengers.length} × ${booking.flight.price[booking.class]}
                </p>
                <p className="font-semibold text-gray-900">
                  ${booking.passengers.length * booking.flight.price[booking.class]}
                </p>
              </div>
              <div className="flex justify-between items-center text-xl font-bold">
                <p className="text-gray-900">Total Paid</p>
                <p className="text-blue-600">${booking.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">What&apos;s Next?</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">📧</span>
              <span>A confirmation email has been sent to your registered email address</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📱</span>
              <span>Check in online 24 hours before your flight departure</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🎫</span>
              <span>Arrive at the airport at least 2 hours before departure</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🆔</span>
              <span>Bring a valid ID and passport for international flights</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Print Confirmation
          </button>
          <Link
            href="/"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Book Another Flight
          </Link>
        </div>
      </div>
    </div>
  );
}
