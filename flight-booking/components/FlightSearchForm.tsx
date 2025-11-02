'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FlightSearchForm() {
  const router = useRouter();
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  const [formData, setFormData] = useState({
    from: 'New York (JFK)',
    to: 'Los Angeles (LAX)',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      from: formData.from,
      to: formData.to,
      departDate: formData.departDate,
      returnDate: tripType === 'round-trip' ? formData.returnDate : '',
      passengers: formData.passengers.toString(),
      class: formData.class,
      tripType,
    });
    router.push(`/flights?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          onClick={() => setTripType('round-trip')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            tripType === 'round-trip'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Round Trip
        </button>
        <button
          type="button"
          onClick={() => setTripType('one-way')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            tripType === 'one-way'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          One Way
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              id="from"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="New York (JFK)">New York (JFK)</option>
              <option value="Los Angeles (LAX)">Los Angeles (LAX)</option>
              <option value="London (LHR)">London (LHR)</option>
              <option value="Dubai (DXB)">Dubai (DXB)</option>
              <option value="Singapore (SIN)">Singapore (SIN)</option>
              <option value="Paris (CDG)">Paris (CDG)</option>
              <option value="Tokyo (NRT)">Tokyo (NRT)</option>
              <option value="Sydney (SYD)">Sydney (SYD)</option>
            </select>
          </div>

          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Los Angeles (LAX)">Los Angeles (LAX)</option>
              <option value="New York (JFK)">New York (JFK)</option>
              <option value="London (LHR)">London (LHR)</option>
              <option value="Dubai (DXB)">Dubai (DXB)</option>
              <option value="Singapore (SIN)">Singapore (SIN)</option>
              <option value="Paris (CDG)">Paris (CDG)</option>
              <option value="Tokyo (NRT)">Tokyo (NRT)</option>
              <option value="Sydney (SYD)">Sydney (SYD)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="departDate" className="block text-sm font-medium text-gray-700 mb-2">
              Departure Date
            </label>
            <input
              type="date"
              id="departDate"
              name="departDate"
              value={formData.departDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {tripType === 'round-trip' && (
            <div>
              <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                min={formData.departDate || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={tripType === 'round-trip'}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
              Passengers
            </label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              min="1"
              max="9"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
}
