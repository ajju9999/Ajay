# FlightBook - Flight Booking Website

A modern, responsive flight booking website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Flight Search**: Search for flights with flexible options (one-way, round-trip)
- 🎯 **Smart Filters**: Filter flights by price, stops, and airlines
- 📊 **Sort Options**: Sort results by price, duration, or departure time
- 👥 **Multi-Passenger Booking**: Book flights for multiple passengers
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Booking Confirmation**: Instant booking confirmation with detailed information
- 💾 **Local Storage**: Booking data persisted in browser storage

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd flight-booking
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
flight-booking/
├── app/
│   ├── booking/[flightId]/     # Booking page for specific flight
│   ├── confirmation/[bookingId]/ # Confirmation page
│   ├── flights/                # Flight search results
│   ├── layout.tsx              # Root layout with header/footer
│   ├── page.tsx                # Homepage with search form
│   └── globals.css             # Global styles
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer component
│   ├── FlightSearchForm.tsx    # Search form component
│   ├── FlightCard.tsx          # Individual flight display
│   └── FilterSidebar.tsx       # Filter controls
├── data/
│   └── flights.ts              # Mock flight data
├── types/
│   └── flight.ts               # TypeScript type definitions
└── public/                     # Static assets
```

## Features Overview

### Homepage
- Beautiful hero section with gradient background
- Flight search form with date pickers
- Trip type selection (one-way/round-trip)
- Popular destinations showcase
- Feature highlights

### Flight Results
- Comprehensive flight listings
- Real-time filtering by price, stops, and airlines
- Sort by price, duration, or departure time
- Responsive grid layout
- Clear pricing and availability information

### Booking Flow
1. Select number of passengers
2. Enter passenger details (name, email, phone, passport)
3. Review booking summary
4. Confirm and complete booking

### Confirmation
- Booking reference number
- Complete flight and passenger details
- Next steps and travel tips
- Print confirmation option

## Mock Data

The application uses mock flight data for demonstration purposes. In a production environment, this would be replaced with real API calls to a flight booking service.

## Customization

### Adding More Flights
Edit `data/flights.ts` to add more flight options.

### Styling
The application uses Tailwind CSS. Modify `app/globals.css` or component classes to customize the design.

### Adding Real API
Replace mock data in `data/flights.ts` with actual API calls to a flight booking service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.

## Author

Built with Next.js and Tailwind CSS
