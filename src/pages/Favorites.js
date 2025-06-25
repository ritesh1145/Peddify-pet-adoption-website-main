import React, { useState, useEffect } from 'react';
import petsData from '../data/pets';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const favs = localStorage.getItem('favorites');
    setFavorites(favs ? JSON.parse(favs) : []);
    const stored = JSON.parse(localStorage.getItem('pets')) || petsData;
    setPets(stored);
  }, []);

  const favoritePets = pets.filter(pet => favorites.includes(pet.id));

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" color="primary" gutterBottom component="h1">
        My Favorite Pets
      </Typography>
      {favoritePets.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="No favorites" style={{ width: 120, opacity: 0.5 }} />
          <Typography color="text.secondary" align="center" sx={{ mt: 2 }}>
            You have not starred any pets yet.
          </Typography>
          <Button component={Link} to="/pets" variant="contained" color="primary" sx={{ mt: 2 }}>
            Browse Pets
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favoritePets.map(pet => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 3, position: 'relative' }}>
                {pet.adopted && (
                  <Chip label="Adopted" color="error" sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }} aria-label="Adopted badge" />
                )}
                <CardMedia component="img" height="180" image={pet.image} alt={`Photo of ${pet.name}`} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="primary">
                    {pet.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {pet.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.description}
                  </Typography>
                  <Button component={Link} to={`/pets/${pet.id}`} variant="contained" color="success" sx={{ mt: 2 }} disabled={pet.adopted} aria-label={pet.adopted ? `${pet.name} already adopted` : `View details for ${pet.name}`}>
                    {pet.adopted ? 'Adopted' : 'View Details'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites; 