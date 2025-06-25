import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MyAdoptions = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user ? JSON.parse(user) : null);
    const stored = localStorage.getItem('adoptions');
    setAdoptions(stored ? JSON.parse(stored) : []);
  }, []);

  if (!currentUser) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Please log in to view your adoptions.
        </Typography>
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Login / Sign Up
        </Button>
      </Box>
    );
  }

  const userAdoptions = adoptions.filter(a => a.email === currentUser.email);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" color="primary" gutterBottom>
        My Adoptions
      </Typography>
      {userAdoptions.length === 0 ? (
        <Typography color="text.secondary">You have not adopted any pets yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {userAdoptions.map((pet, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ background: '#fafafa', borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {pet.pet}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Adopted by {pet.name} ({pet.email})
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyAdoptions; 