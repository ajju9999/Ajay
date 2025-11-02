'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FlightCard from '@/components/FlightCard';
import FilterSidebar from '@/components/FilterSidebar';
import { mockFlights } from '@/data/flights';
import { Flight } from '@/types/flight';

function FlightsContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    maxPrice: 2000,
    stops: 'all',
    airlines: [] as string[],
  });
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');

  const from = searchParams.get('from') || 'New York (JFK)';
  const to = searchParams.get('to') || 'Los Angeles (LAX)';
  const departDate = searchParams.get('departDate') || '';
  const passengers = searchParams.get('passengers') || '1';
  const flightClass = (searchParams.get('class') || 'economy') as 'economy' | 'business' | 'first';

  const filterFlights = (flights: Flight[]) => {
    return flights.filter((flight) => {
      const price = flight.price[flightClass];
      
      if (price > filters.maxPrice) return false;
      
      if (filters.stops !== 'all' && flight.stops !== parseInt(filters.stops)) {
        return false;
      }
      
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
        return false;
      }
      
      return true;
    });
  };

  const sortFlights = (flights: Flight[]) => {
    const sorted = [...flights];
    
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => a.price[flightClass] - b.price[flightClass]);
      case 'duration':
        return sorted.sort((a, b) => {
          const aDuration = parseInt(a.duration.split('h')[0]);
          const bDuration = parseInt(b.duration.split('h')[0]);
          return aDuration - bDuration;
        });
      case 'departure':
        return sorted.sort((a, b) => {
          const aTime = parseInt(a.departureTime.split(':')[0]);
          const bTime = parseInt(b.departureTime.split(':')[0]);
          return aTime - bTime;
        });
      default:
        return sorted;
    }
  };

  const filteredFlights = sortFlights(filterFlights(mockFlights));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {from} → {to}
              </h1>
              <p className="text-gray-600 mt-1">
                {departDate} • {passengers} {parseInt(passengers) === 1 ? 'Passenger' : 'Passengers'} • {flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'departure')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="price">Price</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'} found
              </p>
            </div>

            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 mb-2">No flights found</p>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} selectedClass={flightClass} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flights...</p>
        </div>
      </div>
    }>
      <FlightsContent />
    </Suspense>
  );
}
