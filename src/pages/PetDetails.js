import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import petsData from '../data/pets';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Container,
  Grid,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSnackbar } from '../App';

const PetDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem('favorites');
    return favs ? JSON.parse(favs) : [];
  });
  const [adoptionStatus, setAdoptionStatus] = useState('available'); // 'available', 'requested', 'adopted'
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    let pets = JSON.parse(localStorage.getItem('pets')) || petsData;
    if (!Array.isArray(pets)) pets = [];
    let found = pets.find(p => String(p.id) === String(id));
    // Fallback: try to find by name from query param if not found by id
    if (!found) {
      const params = new URLSearchParams(location.search);
      const petName = params.get('pet');
      if (petName) {
        found = pets.find(p => p.name === petName);
      }
    }
    setPet(found);

    // Check adoption status for this pet
    if (found) {
      const adoptions = JSON.parse(localStorage.getItem('adoptions') || '[]');
      const petAdoptions = adoptions.filter(a => a.pet === found.name);
      // Only block adoption if there is a pending request for this pet
      if (petAdoptions.some(a => a.status === 'pending')) {
        setAdoptionStatus('requested');
      } else if (found.adopted) {
        // If pet is marked as adopted, show as adopted
        setAdoptionStatus('adopted');
      } else {
        // Pet is available for new adoption
        setAdoptionStatus('available');
      }
    }
  }, [id, location.search]);

  const handleFavorite = () => {
    let updated;
    if (favorites.includes(pet.id)) {
      updated = favorites.filter(fav => fav !== pet.id);
      showSnackbar('Removed from favorites', 'info');
    } else {
      updated = [...favorites, pet.id];
      showSnackbar('Added to favorites!', 'success');
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const getSizeColor = (size) => {
    switch (size) {
      case 'Small': return 'success';
      case 'Medium': return 'warning';
      case 'Large': return 'error';
      default: return 'default';
    }
  };

  if (!pet) {
    // Check if pets array is empty
    const pets = JSON.parse(localStorage.getItem('pets')) || petsData;
    if (!pets || pets.length === 0) {
      return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              No pets available. The pet list may have been reset or cleared.
            </Typography>
            <Button component={Link} to="/pets" variant="contained" sx={{ mt: 2 }}>
              Back to Pets
            </Button>
          </Box>
        </Container>
      );
    }
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Pet not found
          </Typography>
          <Button component={Link} to="/pets" variant="contained" sx={{ mt: 2 }}>
            Back to Pets
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Pet Image */}
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              position: 'relative',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <IconButton
              onClick={handleFavorite}
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                zIndex: 2, 
                backgroundColor: 'rgba(255,255,255,0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                }
              }}
              aria-label={favorites.includes(pet.id) ? `Remove ${pet.name} from favorites` : `Add ${pet.name} to favorites`}
            >
              {favorites.includes(pet.id) ? 
                <StarIcon sx={{ color: '#FFD700' }} /> : 
                <StarBorderIcon sx={{ color: '#666' }} />
              }
            </IconButton>
            
            {/* Status Chip */}
            {adoptionStatus === 'adopted' && (
              <Chip 
                label="Adopted" 
                color="error" 
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  left: 16, 
                  zIndex: 2,
                  fontWeight: 600
                }} 
              />
            )}
            {adoptionStatus === 'requested' && (
              <Chip 
                label="Requested" 
                color="warning" 
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  left: 16, 
                  zIndex: 2,
                  fontWeight: 600
                }} 
              />
            )}
            
            <CardMedia
              component="img"
              height="400"
              image={pet.image}
              alt={`Photo of ${pet.name}`}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Pet Information */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                mb: 2, 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {pet.name}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <Chip 
                label={pet.type} 
                color="primary" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              {pet.breed && (
                <Chip 
                  label={pet.breed} 
                  color="secondary" 
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Stack>

            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Age
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {pet.age}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Size
                  </Typography>
                  <Chip 
                    label={pet.size} 
                    color={getSizeColor(pet.size)}
                    sx={{ fontWeight: 600 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Gender
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {pet.gender}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Status
                  </Typography>
                  <Chip 
                    label={adoptionStatus === 'adopted' ? 'Adopted' : adoptionStatus === 'requested' ? 'Requested' : 'Available'} 
                    color={adoptionStatus === 'adopted' ? 'error' : adoptionStatus === 'requested' ? 'warning' : 'success'}
                    sx={{ fontWeight: 600 }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              About {pet.name}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                lineHeight: 1.7,
                color: 'text.secondary',
                fontSize: '1.1rem'
              }}
            >
              {pet.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                component={Link}
                to={`/adopt?pet=${encodeURIComponent(pet.name)}`}
                variant="contained"
                size="large"
                disabled={adoptionStatus !== 'available'}
                sx={{
                  background: adoptionStatus !== 'available' ? 
                    'linear-gradient(45deg, #ccc, #999)' : 
                    'linear-gradient(45deg, #4CAF50, #45a049)',
                  borderRadius: '25px',
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  flex: 1,
                  '&:hover': {
                    background: adoptionStatus !== 'available' ? 
                      'linear-gradient(45deg, #ccc, #999)' : 
                      'linear-gradient(45deg, #45a049, #4CAF50)',
                    transform: adoptionStatus !== 'available' ? 'none' : 'translateY(-2px)'
                  }
                }}
              >
                {adoptionStatus === 'adopted' ? 'Already Adopted' : adoptionStatus === 'requested' ? 'Requested' : `Adopt ${pet.name}`}
              </Button>
              
              <Button
                component={Link}
                to="/pets"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: '25px',
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: '#4CAF50',
                  color: '#4CAF50',
                  '&:hover': {
                    borderColor: '#45a049',
                    background: 'rgba(76, 175, 80, 0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                ← Back to Pets
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PetDetails; 