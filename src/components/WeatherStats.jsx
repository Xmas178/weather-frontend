import { useState, useEffect } from 'react'
import {
    Paper,
    Typography,
    Stack,
    CircularProgress,
    Box,
} from '@mui/material'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { weatherAPI } from '../services/api'

function WeatherStats({ city }) {
    const [stats, setStats] = useState(null)
    const [trend, setTrend] = useState(null)
    const [hourlyData, setHourlyData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!city) return

            setLoading(true)
            try {
                // Fetch statistics
                const statsRes = await weatherAPI.getStats(city, 24)
                setStats(statsRes.data.statistics)

                // Fetch trend analysis
                const trendRes = await weatherAPI.getTrend(city, 24)
                setTrend(trendRes.data.trend_analysis)

                // Fetch hourly data for chart
                const hourlyRes = await weatherAPI.getHourly(city, 24)
                setHourlyData(hourlyRes.data.hourly_data)
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [city])

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        )
    }

    if (!stats) {
        return (
            <Paper sx={{ p: 3 }}>
                <Typography>No statistics available yet. Search for weather first!</Typography>
            </Paper>
        )
    }

    return (
        <Stack spacing={3}>
            {/* Statistics Card */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    24-Hour Statistics
                </Typography>
                <Stack spacing={1}>
                    <Typography>
                        <strong>Min Temperature:</strong> {stats.min_temperature}°C
                    </Typography>
                    <Typography>
                        <strong>Max Temperature:</strong> {stats.max_temperature}°C
                    </Typography>
                    <Typography>
                        <strong>Average Temperature:</strong> {stats.avg_temperature}°C
                    </Typography>
                    <Typography>
                        <strong>Observations:</strong> {stats.observation_count}
                    </Typography>
                </Stack>
            </Paper>

            {/* Trend Card */}
            {trend && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Temperature Trend
                    </Typography>
                    <Stack spacing={1}>
                        <Typography>
                            <strong>Trend:</strong>{' '}
                            {trend.trend === 'warming' && '🔥 Warming'}
                            {trend.trend === 'cooling' && '❄️ Cooling'}
                            {trend.trend === 'stable' && '➡️ Stable'}
                        </Typography>
                        <Typography>
                            <strong>Change:</strong> {trend.change > 0 ? '+' : ''}{trend.change}°C
                        </Typography>
                    </Stack>
                </Paper>
            )}

            {/* Hourly Chart */}
            {hourlyData.length > 0 && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Hourly Temperature
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={hourlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" label={{ value: 'Hour', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="avg_temperature"
                                stroke="#8884d8"
                                name="Temperature"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            )}
        </Stack>
    )
}

export default WeatherStats