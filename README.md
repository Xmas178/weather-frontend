# Weather Dashboard - React Frontend

Modern, responsive weather dashboard built with React, Material-UI, and Recharts. Displays real-time weather data, historical trends, and source comparisons.

## Features

- **Real-time weather data** from multiple sources (FMI, Yr.no)
- **Interactive dashboard** with colorful weather cards
- **Temperature trends** - warming, cooling, or stable
- **Historical statistics** - min, max, average temperatures
- **Data source comparison** - compare FMI vs Yr.no accuracy
- **Hourly charts** - visualize temperature patterns
- **Worldwide support** - search any city globally
- **Responsive design** - works on desktop and mobile

## Screenshots

![Weather Dashboard](https://via.placeholder.com/800x400?text=Weather+Dashboard)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool (fast dev server)
- **Material-UI (MUI)** - Component library
- **Recharts** - Data visualization
- **Axios** - API requests

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:8000`

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Xmas178/weather-frontend.git
cd weather-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Project Structure
```
src/
├── App.jsx                 # Main dashboard component
├── components/
│   ├── WeatherStats.jsx    # Statistics and trends
│   └── SourceComparison.jsx # Data source comparison table
├── services/
│   └── api.js              # API client configuration
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## Components

### App.jsx
Main dashboard with:
- Search bar for city input
- Current weather cards (temperature, humidity, wind, pressure)
- Weather statistics
- Source comparison

### WeatherStats.jsx
Displays:
- 24-hour statistics (min, max, avg)
- Temperature trend (warming/cooling/stable)
- Hourly temperature chart

### SourceComparison.jsx
Comparison table showing:
- Number of observations per source
- Average, min, max temperatures
- Data accuracy comparison

## API Integration

The frontend connects to the Weather API backend:
```javascript
// API endpoints used:
GET /weather?city={city}           // Current weather
GET /weather/stats/{city}          // Statistics
GET /weather/trend/{city}          // Trend analysis
GET /weather/compare/{city}        // Source comparison
GET /weather/hourly/{city}         // Hourly data
```

Backend must be running on `http://localhost:8000`

See backend repository: [weather-api-aggregator](https://github.com/Xmas178/weather-api-aggregator)

## Customization

### Change Colors

Edit `App.jsx` to customize card colors:
```jsx
// Temperature card - orange
<Card sx={{ bgcolor: '#fff3e0' }}>

// Humidity card - blue
<Card sx={{ bgcolor: '#e3f2fd' }}>

// Wind card - purple
<Card sx={{ bgcolor: '#f3e5f5' }}>

// Pressure card - green
<Card sx={{ bgcolor: '#e8f5e9' }}>
```

### Change Header Gradient
```jsx
<Paper sx={{
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}}>
```

## Build for Production
```bash
npm run build
```

Creates optimized build in `dist/` directory.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] **Weather forecast** - 5-7 day forecast view
- [ ] **Favorite cities** - Save and quick-access favorite locations
- [ ] **Dark mode** - Toggle between light/dark themes
- [ ] **Weather alerts** - Show severe weather warnings
- [ ] **Map view** - Interactive weather map
- [ ] **Mobile app** - React Native version
- [ ] **Offline mode** - Cache data for offline viewing
- [ ] **Comparison charts** - Visual comparison between sources

## Known Issues

- First load may be slow due to geocoding
- Chart may not render if less than 2 data points
- Mobile layout needs improvement for small screens

## Contributing

This is a portfolio project. Suggestions and feedback welcome!

## License

MIT License

## Author

**Xmas178**
- GitHub: [@Xmas178](https://github.com/Xmas178)
- Backend: [weather-api-aggregator](https://github.com/Xmas178/weather-api-aggregator)

## Acknowledgments

- **Material-UI** - Beautiful React components
- **Recharts** - Simple and elegant charts
- **Vite** - Lightning-fast build tool