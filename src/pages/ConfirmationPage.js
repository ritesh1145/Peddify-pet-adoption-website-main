import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const ConfirmationPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h3" color="primary" gutterBottom>
      Thank You!
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Your adoption request has been submitted. We will contact you soon.
    </Typography>
    <Button component={Link} to="/my-adoptions" variant="contained" color="success" size="large" sx={{ mr: 2 }}>
      My Adoptions
    </Button>
    <Button component={Link} to="/" variant="outlined" color="primary" size="large">
      Home
    </Button>
  </Box>
);

export default ConfirmationPage; 