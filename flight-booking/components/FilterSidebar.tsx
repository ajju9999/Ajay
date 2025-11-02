'use client';

interface Filters {
  maxPrice: number;
  stops: string;
  airlines: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const airlines = ['SkyWings', 'AeroConnect', 'CloudJet', 'BudgetAir'];

  const handleAirlineToggle = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    onFilterChange({ ...filters, airlines: newAirlines });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>$0</span>
            <span className="font-semibold text-blue-600">${filters.maxPrice}</span>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Stops</h3>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="stops"
                value="all"
                checked={filters.stops === 'all'}
                onChange={(e) => onFilterChange({ ...filters, stops: e.target.value })}
                className="mr-3"
              />
              <span className="text-gray-700">All</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="stops"
                value="0"
                checked={filters.stops === '0'}
                onChange={(e) => onFilterChange({ ...filters, stops: e.target.value })}
                className="mr-3"
              />
              <span className="text-gray-700">Non-stop</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="stops"
                value="1"
                checked={filters.stops === '1'}
                onChange={(e) => onFilterChange({ ...filters, stops: e.target.value })}
                className="mr-3"
              />
              <span className="text-gray-700">1 Stop</span>
            </label>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Airlines</h3>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <label key={airline} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={() => handleAirlineToggle(airline)}
                  className="mr-3"
                />
                <span className="text-gray-700">{airline}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            onFilterChange({
              maxPrice: 2000,
              stops: 'all',
              airlines: [],
            })
          }
          className="w-full py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
