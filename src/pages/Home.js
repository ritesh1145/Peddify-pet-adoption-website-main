import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Rating, 
  Avatar
} from '@mui/material';
import { Link } from 'react-router-dom';
import petImage from '../images/image.png';
import { 
  Favorite, 
  Star, 
  Pets, 
  Home as HomeIcon
} from '@mui/icons-material';
import { useSnackbar } from '../App';

const Home = () => {
  const { darkMode } = useSnackbar();

  // Sample featured pets data
  const featuredPets = [
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2 years",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop",
      description: "Friendly and energetic dog who loves to play fetch"
    },
    {
      id: 2,
      name: "Luna",
      breed: "Persian Cat",
      age: "1 year",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop",
      description: "Calm and affectionate cat perfect for families"
    },
    {
      id: 3,
      name: "Max",
      breed: "Labrador",
      age: "3 years",
      image: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=300&h=200&fit=crop",
      description: "Loyal and intelligent companion"
    }
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      pet: "Buddy",
      rating: 5,
      comment: "Adopting Buddy was the best decision we ever made. He brings so much joy to our family!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mike Chen",
      pet: "Luna",
      rating: 5,
      comment: "Luna is the perfect addition to our home. She's so loving and playful!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Davis",
      pet: "Max",
      rating: 5,
      comment: "Max has changed our lives for the better. He's our best friend!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'none' }}>
      {/* Hero Section */}
      <Box sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: darkMode ? '#f5f5f5' : 'white',
        py: 8,
        overflow: 'hidden',
        zIndex: 0
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Find Your New Best Friend 🐶🐱
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 300,
                  opacity: 0.9,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
              >
                Adopt a pet and give them a forever home.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button
                  component={Link}
                  to="/pets"
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                    color: 'white',
                    px: 4,
                    py: 2,
                    fontSize: '1.2rem',
                    borderRadius: '25px',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #45a049, #4CAF50)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Start Adopting
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 2,
                    fontSize: '1.2rem',
                    borderRadius: '25px',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper 
                elevation={8} 
                sx={{ 
                  p: 2, 
                  borderRadius: 4, 
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  maxWidth: 500,
                  width: '100%'
                }}
              >
                <img
                  src={petImage}
                  alt="Happy pets together"
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    borderRadius: '12px'
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Us Section */}
      <Box sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: darkMode ? '#232526' : '#f8f9fa',
        py: 8,
        zIndex: 0
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ mb: 6, fontWeight: 700, color: '#2c3e50' }}
          >
            About Us
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              lineHeight: 1.6,
              color: '#34495e',
              fontWeight: 400
            }}
          >
            We connect loving homes with adorable pets in need of adoption. 
            Our mission is to ensure every pet finds their perfect family and every family finds their perfect companion.
          </Typography>
        </Container>
      </Box>

      {/* Featured Pets Section */}
      <Box sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: darkMode ? '#18191a' : '#fff',
        py: 8,
        zIndex: 0
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ mb: 6, fontWeight: 700, color: '#2c3e50' }}
          >
            Featured Pets
          </Typography>
          <Grid container spacing={4}>
            {featuredPets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet.id}>
                <Card 
                  elevation={4}
                  sx={{ 
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={pet.image}
                    alt={pet.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {pet.breed} • {pet.age}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {pet.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/pets/${pet.id}`}
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                        borderRadius: '20px',
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #45a049, #4CAF50)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: darkMode ? '#232526' : '#f8f9fa',
        py: 8,
        zIndex: 0
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ mb: 6, fontWeight: 700, color: '#2c3e50' }}
          >
            Happy Stories
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <Card 
                  elevation={3}
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Avatar
                    src={testimonial.avatar}
                    sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                  />
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                    "{testimonial.comment}"
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Adopted {testimonial.pet}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Adopt Section */}
      <Box sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: darkMode ? '#18191a' : '#fff',
        py: 8,
        zIndex: 0
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ mb: 6, fontWeight: 700, color: '#2c3e50' }}
          >
            Why Adopt?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Favorite sx={{ fontSize: 60, color: '#e74c3c', mb: 2 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Unconditional Love
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience the purest form of love and companionship
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <HomeIcon sx={{ fontSize: 60, color: '#3498db', mb: 2 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Save Lives
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Give a second chance to pets in need of a home
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Pets sx={{ fontSize: 60, color: '#2ecc71', mb: 2 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Health Benefits
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Improve your physical and mental well-being
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Star sx={{ fontSize: 60, color: '#f39c12', mb: 2 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Family Bonding
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create lasting memories with your new family member
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Banner */}
      <Box sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'linear-gradient(135deg, #4CAF50, #45a049)',
        color: darkMode ? '#f5f5f5' : 'white',
        py: 8,
        zIndex: 0
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              sx={{ mb: 3, fontWeight: 800 }}
            >
              Over 1,000 pets adopted! 🎉
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ mb: 4, fontWeight: 300, opacity: 0.9 }}
            >
              Join our growing family of happy pet parents
            </Typography>
            <Button
              component={Link}
              to="/pets"
              variant="contained"
              size="large"
              sx={{
                background: 'white',
                color: '#4CAF50',
                px: 6,
                py: 2,
                fontSize: '1.3rem',
                borderRadius: '30px',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: '#f8f9fa',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start Adopting Today
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 