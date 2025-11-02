import Link from 'next/link';
import { Flight } from '@/types/flight';

interface FlightCardProps {
  flight: Flight;
  selectedClass: 'economy' | 'business' | 'first';
}

export default function FlightCard({ flight, selectedClass }: FlightCardProps) {
  const price = flight.price[selectedClass];
  const availableSeats = flight.availableSeats[selectedClass];

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{flight.airline}</h3>
              <p className="text-sm text-gray-500">{flight.flightNumber}</p>
            </div>
            {flight.stops === 0 && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Non-stop
              </span>
            )}
            {flight.stops > 0 && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                {flight.stops} {flight.stops === 1 ? 'Stop' : 'Stops'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{flight.departureTime}</p>
              <p className="text-sm text-gray-600">{flight.origin}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">{flight.duration}</p>
              <div className="relative">
                <div className="h-0.5 bg-gray-300"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{flight.arrivalTime}</p>
              <p className="text-sm text-gray-600">{flight.destination}</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {availableSeats} seats available in {selectedClass}
          </div>
        </div>

        <div className="md:border-l md:pl-6 flex flex-col items-center md:items-end gap-3">
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">${price}</p>
            <p className="text-sm text-gray-500">per person</p>
          </div>
          <Link
            href={`/booking/${flight.id}?class=${selectedClass}`}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Select Flight
          </Link>
        </div>
      </div>
    </div>
  );
}
