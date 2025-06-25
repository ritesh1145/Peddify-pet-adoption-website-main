import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardContent, CardMedia, Fade, Chip, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import petsData from '../data/pets';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { alpha } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Confetti from 'react-confetti';
import { useSnackbar } from '../App';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AnimatedBackground = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >
    {[...Array(12)].map((_, i) => (
      <PetsIcon
        key={i}
        sx={{
          position: 'absolute',
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          fontSize: `${32 + Math.random() * 32}px`,
          color: alpha('#4caf50', 0.08 + Math.random() * 0.12),
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `float 8s ease-in-out infinite alternate`,
        }}
      />
    ))}
    <style>{`
      @keyframes float {
        0% { transform: translateY(0); }
        100% { transform: translateY(-20px); }
      }
    `}</style>
  </Box>
);

const Adopt = () => {
  const query = useQuery();
  const petName = query.get('pet') || '';
  const [form, setForm] = useState({ name: '', email: '', pet: petName });
  const [submitted, setSubmitted] = useState(false);
  const [adopted, setAdopted] = useState(false);
  const [pet, setPet] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useSnackbar();

  useEffect(() => {
    // Check if the pet is already adopted
    const pets = JSON.parse(localStorage.getItem('pets')) || petsData;
    const found = pets.find(p => p.name === petName);
    setPet(found);
    setAdopted(found && found.adopted);
  }, [petName]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Save to localStorage
    const adoptions = JSON.parse(localStorage.getItem('adoptions') || '[]');
    adoptions.push({ ...form, status: 'pending', date: new Date().toISOString() });
    localStorage.setItem('adoptions', JSON.stringify(adoptions));

    // Do NOT mark pet as adopted here
    // let pets = JSON.parse(localStorage.getItem('pets')) || petsData;
    // pets = pets.map(p => p.name === petName ? { ...p, adopted: true } : p);
    // localStorage.setItem('pets', JSON.stringify(pets));

    setSubmitted(true);
    setForm({ name: '', email: '', pet: petName });
    setShowConfetti(true);
    toast.success('Adoption request submitted!');
    setTimeout(() => navigate('/confirmation'), 1800);
  };

  if (submitted) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)', position: 'relative' }}>
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={180} recycle={false} />}
        <Fade in={true} timeout={600}>
          <Box sx={{ textAlign: 'center', zIndex: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" color="success.main" gutterBottom>
              Request Submitted!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Thank you for your interest in adopting. We will contact you soon.
            </Typography>
            <Button
              component={Link}
              to="/pets"
              variant="outlined"
              color="primary"
              sx={{ mt: 3, borderRadius: 3, fontWeight: 700, px: 4 }}
              startIcon={<ArrowBackIcon />}
            >
              Back to Pets
            </Button>
          </Box>
        </Fade>
        <ToastContainer position="top-center" autoClose={1500} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, Roboto, sans-serif', position: 'relative' }}>
      <AnimatedBackground />
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          mx: 'auto',
          boxShadow: 8,
          borderRadius: 5,
          p: 2,
          border: '2px solid',
          borderColor: theme => darkMode ? 'rgba(255,255,255,0.08)' : alpha(theme.palette.primary.main, 0.08),
          background: darkMode ? 'rgba(30,32,34,0.98)' : 'white',
          color: darkMode ? '#f5f5f5' : 'inherit',
          transition: 'box-shadow 0.3s, transform 0.3s',
          '&:hover': {
            boxShadow: 16,
            transform: 'translateY(-6px) scale(1.025)',
            borderColor: theme => darkMode ? 'rgba(255,255,255,0.18)' : alpha(theme.palette.primary.main, 0.18),
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button
              component={Link}
              to="/pets"
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 3, fontWeight: 700, px: 2, mr: 1, minWidth: 0 }}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Typography variant="h4" color="primary" gutterBottom component="h1" sx={{ textAlign: 'center', fontWeight: 800, letterSpacing: 1, flex: 1 }}>
              Adoption Form
            </Typography>
          </Box>
          {pet && (
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Box
                sx={{
                  display: 'inline-block',
                  borderRadius: '50%',
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.08) rotate(-2deg)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={pet.image}
                  alt={pet.name}
                  sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%' }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>{pet.name}</Typography>
              <Chip
                icon={<PetsIcon />}
                label={pet.breed}
                color="secondary"
                sx={{ fontWeight: 600, mt: 1, letterSpacing: 0.5, px: 1.5, fontSize: '1rem', background: '#f3e5f5' }}
              />
            </Box>
          )}
          {adopted && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
              This pet has already been adopted.
            </Typography>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.7rem', marginTop: 8 }} aria-label="Adoption form">
            <TextField
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              inputProps={{ 'aria-label': 'Your Name' }}
              sx={{ borderRadius: 2, background: '#f7fafc', transition: 'box-shadow 0.2s', '& .MuiInputBase-root': { fontWeight: 600 }, '&:focus-within': { boxShadow: '0 0 0 2px #43e97b' } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              inputProps={{ 'aria-label': 'Email' }}
              sx={{ borderRadius: 2, background: '#f7fafc', transition: 'box-shadow 0.2s', '& .MuiInputBase-root': { fontWeight: 600 }, '&:focus-within': { boxShadow: '0 0 0 2px #43e97b' } }}
            />
            <TextField
              label="Pet Name"
              name="pet"
              value={form.pet}
              InputProps={{ readOnly: !!petName, 'aria-label': 'Pet Name' }}
              onChange={handleChange}
              sx={{ borderRadius: 2, background: '#f7fafc', transition: 'box-shadow 0.2s', '& .MuiInputBase-root': { fontWeight: 600 }, '&:focus-within': { boxShadow: '0 0 0 2px #43e97b' } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              disabled={adopted}
              aria-label={adopted ? 'Already Adopted' : 'Submit Adoption Form'}
              sx={{
                background: adopted
                  ? 'linear-gradient(45deg, #ccc, #999)'
                  : 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                color: adopted ? '#666' : '#fff',
                fontWeight: 800,
                borderRadius: '30px',
                py: 1.7,
                fontSize: '1.15rem',
                boxShadow: 4,
                letterSpacing: 1,
                transition: 'all 0.25s',
                border: '2px solid transparent',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  background: adopted
                    ? 'linear-gradient(45deg, #ccc, #999)'
                    : 'linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)',
                  border: adopted ? '2px solid #bbb' : '2px solid #43e97b',
                  color: adopted ? '#666' : '#222',
                  transform: adopted ? 'none' : 'translateY(-2px) scale(1.03)',
                  boxShadow: adopted ? 4 : 8,
                },
                '&:active::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(67,233,123,0.15)',
                  borderRadius: '30px',
                  animation: 'ripple 0.4s',
                  zIndex: 1,
                },
              }}
            >
              {adopted ? 'Already Adopted' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer position="top-center" autoClose={1500} />
    </Box>
  );
};

export default Adopt; 