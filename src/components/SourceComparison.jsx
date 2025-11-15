import { useState, useEffect } from 'react'
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Box,
} from '@mui/material'
import { weatherAPI } from '../services/api'

function SourceComparison({ city }) {
    const [comparison, setComparison] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!city) return

            setLoading(true)
            try {
                const res = await weatherAPI.compareSources(city, 24)
                setComparison(res.data.source_comparison)
            } catch (error) {
                console.error('Error fetching comparison:', error)
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

    if (!comparison || Object.keys(comparison).length === 0) {
        return (
            <Paper sx={{ p: 3 }}>
                <Typography>No comparison data available yet.</Typography>
            </Paper>
        )
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Data Source Comparison
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Source</strong></TableCell>
                            <TableCell align="right"><strong>Observations</strong></TableCell>
                            <TableCell align="right"><strong>Avg Temp (°C)</strong></TableCell>
                            <TableCell align="right"><strong>Min Temp (°C)</strong></TableCell>
                            <TableCell align="right"><strong>Max Temp (°C)</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(comparison).map(([source, data]) => (
                            <TableRow key={source}>
                                <TableCell>{source}</TableCell>
                                <TableCell align="right">{data.count}</TableCell>
                                <TableCell align="right">{data.avg_temperature}</TableCell>
                                <TableCell align="right">{data.min_temperature}</TableCell>
                                <TableCell align="right">{data.max_temperature}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default SourceComparison