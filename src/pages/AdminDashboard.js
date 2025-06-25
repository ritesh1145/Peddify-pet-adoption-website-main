import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CardMedia, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import petsData from '../data/pets';
import { useSnackbar } from '../App';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import PetsIcon from '@mui/icons-material/Pets';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [adoptions, setAdoptions] = useState([]);
  const [pets, setPets] = useState([]);
  const { darkMode } = useSnackbar();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user ? JSON.parse(user) : null);
    setAdoptions(JSON.parse(localStorage.getItem('adoptions') || '[]'));
    setPets(JSON.parse(localStorage.getItem('pets')) || petsData);
  }, []);

  if (!currentUser || currentUser.email !== 'admin@petadopt.com') {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Admin access only. Please log in as admin@petadopt.com.
        </Typography>
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Login as Admin
        </Button>
      </Box>
    );
  }

  // Approve adoption request
  const handleApproveAdoption = (adoption, idx) => {
    let petsList = JSON.parse(localStorage.getItem('pets')) || [];
    petsList = petsList.map(p => p.name === adoption.pet ? { ...p, adopted: true } : p);
    localStorage.setItem('pets', JSON.stringify(petsList));
    setPets(petsList);
    const updatedAdoptions = adoptions.map((a, i) => i === idx ? { ...a, status: 'approved' } : a);
    setAdoptions(updatedAdoptions);
    localStorage.setItem('adoptions', JSON.stringify(updatedAdoptions));
  };

  // Reject adoption request
  const handleRejectAdoption = (idx) => {
    // Set pet.adopted to false if rejected
    const rejectedAdoption = adoptions[idx];
    let petsList = JSON.parse(localStorage.getItem('pets')) || [];
    petsList = petsList.map(p => p.name === rejectedAdoption.pet ? { ...p, adopted: false } : p);
    localStorage.setItem('pets', JSON.stringify(petsList));
    setPets(petsList);
    const updatedAdoptions = adoptions.map((a, i) => i === idx ? { ...a, status: 'rejected' } : a);
    setAdoptions(updatedAdoptions);
    localStorage.setItem('adoptions', JSON.stringify(updatedAdoptions));
  };

  // Remove adoption request
  const handleRemoveAdoption = (idx) => {
    const updatedAdoptions = adoptions.filter((_, i) => i !== idx);
    setAdoptions(updatedAdoptions);
    localStorage.setItem('adoptions', JSON.stringify(updatedAdoptions));
  };

  // All adopted pets (approved requests)
  const adoptedPets = adoptions
    .filter(a => a.status === 'approved')
    .map(a => {
      const pet = pets.find(p => p.name === a.pet);
      return pet ? { ...pet, adoptionDate: a.date, adoptedBy: a.name, adoptedByEmail: a.email } : null;
    })
    .filter(Boolean);

  // Analytics data
  const totalPets = pets.length;
  const totalAdoptions = adoptions.filter(a => a.status === 'approved').length;
  const pendingRequests = adoptions.filter(a => a.status === 'pending').length;
  const users = Array.from(new Set(adoptions.map(a => a.email))).length;

  // Adoptions over time (by date)
  const adoptionsByDate = adoptions
    .filter(a => a.status === 'approved')
    .reduce((acc, a) => {
      const date = new Date(a.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  const adoptionsByDateData = Object.entries(adoptionsByDate).map(([date, count]) => ({ date, count }));

  // Most recently adopted breed
  const mostRecentAdoption = adoptions
    .filter(a => a.status === 'approved')
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const mostRecentBreed = mostRecentAdoption
    ? (pets.find(p => p.name === mostRecentAdoption.pet)?.breed || 'Unknown')
    : null;

  // Request status
  const statusCounts = adoptions.reduce((acc, a) => {
    acc[a.status || 'pending'] = (acc[a.status || 'pending'] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  const statusColors = ['#43cea2', '#FFD700', '#F44336'];

  return (
    <Box sx={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(120deg, #232526 0%, #232526 60%, #414345 100%)' : 'linear-gradient(120deg, #f8fafc 0%, #e3f2fd 100%)', py: 6, px: 2 }}>
      <Container maxWidth="lg">
        <Paper elevation={8} sx={{
          p: 4,
          borderRadius: 5,
          background: darkMode ? 'rgba(30,32,34,0.98)' : 'white',
          color: darkMode ? '#f5f5f5' : 'inherit',
          boxShadow: darkMode ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : undefined,
          border: darkMode ? '1.5px solid #333' : '1.5px solid #eee',
        }}>
          {/* Welcome Section */}
          <Typography variant="h4" color="primary" gutterBottom>
            Welcome, {currentUser.name || 'Admin'}! 👑
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Here you can review and manage all adoption requests.
          </Typography>

          {/* Analytics Section */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4, justifyContent: 'center' }}>
            <Box sx={{ flex: '1 1 180px', minWidth: 180, p: 2, borderRadius: 3, background: 'linear-gradient(135deg, #43cea2, #185a9d)', color: '#fff', boxShadow: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <PetsIcon sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Pets</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{totalPets}</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 180px', minWidth: 180, p: 2, borderRadius: 3, background: 'linear-gradient(135deg, #FFD700, #FF9800)', color: '#333', boxShadow: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <AssignmentTurnedInIcon sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Adoptions</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{totalAdoptions}</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 180px', minWidth: 180, p: 2, borderRadius: 3, background: 'linear-gradient(135deg, #F44336, #FF9800)', color: '#fff', boxShadow: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <HourglassEmptyIcon sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Pending</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{pendingRequests}</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 180px', minWidth: 180, p: 2, borderRadius: 3, background: 'linear-gradient(135deg, #2196F3, #185a9d)', color: '#fff', boxShadow: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <GroupIcon sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Users</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{users}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Charts Section */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 6, justifyContent: 'center' }}>
            <Box sx={{ flex: '1 1 320px', minWidth: 320, height: 260, background: darkMode ? 'rgba(67,206,162,0.08)' : '#f1f8e9', borderRadius: 3, p: 2, boxShadow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Adoptions Over Time</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={adoptionsByDateData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#43cea2" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            {/* Most Recently Adopted Breed Card */}
            <Box sx={{ flex: '1 1 320px', minWidth: 320, height: 260, background: darkMode ? 'rgba(33,150,243,0.10)' : '#e3f2fd', borderRadius: 3, p: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Most Recently Adopted Breed</Typography>
              {mostRecentBreed ? (
                <Box sx={{ mt: 2, p: 3, borderRadius: 2, background: darkMode ? 'linear-gradient(90deg, #43cea2, #185a9d)' : 'linear-gradient(90deg, #43cea2, #2196F3)', color: '#fff', fontWeight: 900, fontSize: 28, boxShadow: 2, textAlign: 'center', minWidth: 180 }}>
                  {mostRecentBreed}
                </Box>
              ) : (
                <Typography color="text.secondary" sx={{ mt: 4 }}>No adoptions yet.</Typography>
              )}
            </Box>
            <Box sx={{ flex: '1 1 320px', minWidth: 320, height: 260, background: darkMode ? 'rgba(67,206,162,0.08)' : '#f1f8e9', borderRadius: 3, p: 2, boxShadow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Request Status</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {statusData.map((entry, idx) => (
                      <Cell key={`cell-status-${idx}`} fill={statusColors[idx % statusColors.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          {/* All Adoption Requests */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            Adoption Requests
          </Typography>
          {adoptions.length === 0 ? (
            <Typography color="text.secondary">No adoption requests yet.</Typography>
          ) : (
            <TableContainer component={Paper} sx={{ mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pet</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adoptions.map((a, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{a.pet}</TableCell>
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{a.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={a.status ? a.status.charAt(0).toUpperCase() + a.status.slice(1) : 'Pending'}
                          color={a.status === 'approved' ? 'success' : a.status === 'pending' || !a.status ? 'warning' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{a.date ? new Date(a.date).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                        {a.status === 'pending' && (
                          <Box sx={{ display: 'inline-flex', gap: 1 }}>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              startIcon={<CheckIcon />}
                              onClick={() => handleApproveAdoption(a, idx)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<CloseIcon />}
                              onClick={() => handleRejectAdoption(idx)}
                            >
                              Reject
                            </Button>
                          </Box>
                        )}
                        {/* Remove button for all requests */}
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => handleRemoveAdoption(idx)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard; 