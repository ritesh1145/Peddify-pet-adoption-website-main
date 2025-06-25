import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CardMedia, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import petsData from '../data/pets';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from '../App';

const UserDashboard = () => {
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

  if (!currentUser) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Please log in to view your dashboard.
        </Typography>
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Login
        </Button>
      </Box>
    );
  }

  const isAdmin = currentUser.email === 'admin@petadopt.com';

  // Filter adoptions for this user (unless admin)
  const myAdoptions = isAdmin
    ? adoptions
    : adoptions.filter(a => a.email === currentUser.email);

  // Get adopted pets for this user (approved only)
  const myAdoptedPets = myAdoptions
    .filter(a => a.status === 'approved')
    .map(a => {
      const pet = pets.find(p => p.name === a.pet);
      return pet ? { ...pet, adoptionDate: a.date, status: a.status } : null;
    })
    .filter(Boolean);

  // Welcome Section
  const adoptedCount = myAdoptedPets.length;

  // Approve adoption request (admin only)
  const handleApproveAdoption = (adoption, idx) => {
    // Mark pet as adopted
    let petsList = JSON.parse(localStorage.getItem('pets')) || [];
    petsList = petsList.map(p => p.name === adoption.pet ? { ...p, adopted: true } : p);
    localStorage.setItem('pets', JSON.stringify(petsList));
    setPets(petsList);
    // Update adoption status
    const updatedAdoptions = adoptions.map((a, i) => i === idx ? { ...a, status: 'approved' } : a);
    setAdoptions(updatedAdoptions);
    localStorage.setItem('adoptions', JSON.stringify(updatedAdoptions));
  };

  // Reject adoption request (admin only)
  const handleRejectAdoption = (idx) => {
    const updatedAdoptions = adoptions.map((a, i) => i === idx ? { ...a, status: 'rejected' } : a);
    setAdoptions(updatedAdoptions);
    localStorage.setItem('adoptions', JSON.stringify(updatedAdoptions));
  };

  return (
    <Box sx={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(120deg, #232526 0%, #414345 100%)' : 'linear-gradient(120deg, #f8fafc 0%, #e3f2fd 100%)', py: 6, px: 2 }}>
      <Container maxWidth="md">
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
            Welcome back, {currentUser.name || currentUser.email.split('@')[0]}! 🐾
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            You've adopted {adoptedCount} pet{adoptedCount !== 1 ? 's' : ''} so far!
          </Typography>

          {/* My Adopted Pets */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            My Adopted Pets
          </Typography>
          {myAdoptedPets.length === 0 ? (
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              You haven't adopted any pets yet.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              {myAdoptedPets.map((pet, idx) => (
                <Card key={idx} sx={{ width: 300, borderRadius: 3, boxShadow: 2 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={pet.image}
                    alt={pet.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{pet.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{pet.breed}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Adopted on: {pet.adoptionDate ? new Date(pet.adoptionDate).toLocaleDateString() : 'N/A'}
                    </Typography>
                    <Chip label={pet.status === 'approved' ? 'Approved' : 'Pending'} color={pet.status === 'approved' ? 'success' : 'warning'} size="small" sx={{ mb: 1 }} />
                    <Button
                      component={Link}
                      to={`/pets/${pet.id}`}
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* My Applications / Requests */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            My Applications / Requests
          </Typography>
          {myAdoptions.length === 0 ? (
            <Typography color="text.secondary">No adoption requests yet.</Typography>
          ) : (
            <TableContainer component={Paper} sx={{ mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pet</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myAdoptions.map((a, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{a.pet}</TableCell>
                      <TableCell>
                        <Chip
                          label={a.status ? a.status.charAt(0).toUpperCase() + a.status.slice(1) : 'Pending'}
                          color={a.status === 'approved' ? 'success' : a.status === 'pending' || !a.status ? 'warning' : 'error'}
                          size="small"
                        />
                        {isAdmin && a.status === 'pending' && (
                          <Box sx={{ display: 'inline-flex', gap: 1, ml: 2 }}>
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
                      </TableCell>
                      <TableCell>{a.date ? new Date(a.date).toLocaleDateString() : 'N/A'}</TableCell>
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

export default UserDashboard; 