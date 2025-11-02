import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">FlightBook</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/flights" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Flights
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              My Bookings
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Support
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Sign In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
