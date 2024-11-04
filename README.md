# NYC Taxi Dashboard

Interactive dashboard for visualizing NYC Yellow Taxi trip data.

## Project Structure
```
nyc-taxi-dashboard/
├── client/          # Frontend React application
└── server/          # Backend Node.js application
```

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Installation & Setup

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=5000
SOCRATA_APP_TOKEN=your_token_here
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Features
- Interactive map visualization of taxi trips
- Real-time filtering by:
  - Date range
  - Fare amount
  - Trip distance
  - Payment type
- Trip statistics and analytics
- Responsive design

## Tech Stack
- Frontend:
  - React
  - Vite
  - React Query
  - Leaflet Maps
  - Recharts
  - TailwindCSS
- Backend:
  - Node.js
  - Express
  - Axios
  - Socrata API Integration

## API Endpoints
- `GET /api/trips` - Get trip data with filters
  - Query Parameters:
    - startDate
    - endDate
    - minFare
    - maxFare
    - minDistance
    - maxDistance
    - paymentType

## Development
To run both frontend and backend in development mode:

1. Start the backend:
```bash
cd server
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deployment
Instructions for deploying to production environment:

1. Build the frontend:
```bash
cd client
npm run build
```

2. Deploy backend to your preferred hosting service (e.g., Heroku, Digital Ocean)
3. Set environment variables on your hosting platform
4. Update frontend API URL to point to your production backend

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request