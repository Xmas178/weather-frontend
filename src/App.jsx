import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material'
import {
  WbSunny,
  Thermostat,
  WaterDrop,
  Air,
  Compress
} from '@mui/icons-material'
import { weatherAPI } from './services/api'
import WeatherStats from './components/WeatherStats'
import SourceComparison from './components/SourceComparison'

function App() {
  const [city, setCity] = useState('Oulu')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Enter city name')
      return
    }
    const formattedCity = city.trim().charAt(0).toUpperCase() + city.trim().slice(1).toLowerCase()

    setLoading(true)
    setError(null)
    try {
      const response = await weatherAPI.getWeather(formattedCity)  // Käytä formattedCity
      setWeather(response.data)
    } catch (err) {
      setError('Error loading weather')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ bgcolor: '#a09af0ff', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h3" align="center" gutterBottom>
              🌤️ Weather Dashboard
            </Typography>
            <Typography variant="subtitle1" align="center">
              Real-time weather data from multiple sources
            </Typography>
          </Paper>

          {/* Search Bar */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="City name"
                placeholder="e.g., London, Helsinki, Tokyo..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                variant="outlined"
              />
              <Button
                variant="contained"
                size="large"
                onClick={fetchWeather}
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? 'Loading...' : 'Search'}
              </Button>
            </Stack>
          </Paper>

          {/* Error Message */}
          {error && (
            <Paper sx={{ p: 3, bgcolor: '#ffebee', border: '1px solid #ef5350' }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          )}

          {/* Current Weather Card */}
          {weather && weather.data && (
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WbSunny /> {weather.city}
              </Typography>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Data source: {weather.source}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ bgcolor: '#fff3e0', height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Thermostat color="error" />
                        <Typography variant="subtitle2" color="text.secondary">
                          Temperature
                        </Typography>
                      </Box>
                      <Typography variant="h4">
                        {weather.data.temperature || 'N/A'}°C
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <WaterDrop color="primary" />
                        <Typography variant="subtitle2" color="text.secondary">
                          Humidity
                        </Typography>
                      </Box>
                      <Typography variant="h4">
                        {weather.data.humidity || 'N/A'}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ bgcolor: '#f3e5f5', height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Air color="info" />
                        <Typography variant="subtitle2" color="text.secondary">
                          Wind Speed
                        </Typography>
                      </Box>
                      <Typography variant="h4">
                        {weather.data.wind_speed || 'N/A'} m/s
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Compress color="success" />
                        <Typography variant="subtitle2" color="text.secondary">
                          Pressure
                        </Typography>
                      </Box>
                      <Typography variant="h4">
                        {weather.data.pressure || 'N/A'} hPa
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card sx={{ bgcolor: '#fafafa' }}>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Weather Condition
                      </Typography>
                      <Typography variant="h5">
                        {weather.data.weather || 'N/A'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Statistics and Charts */}
          {weather && weather.data && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <WeatherStats city={weather.city} />
              </Grid>
              <Grid item xs={12}>
                <SourceComparison city={weather.city} />
              </Grid>
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default App