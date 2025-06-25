import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Fade, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Confetti from 'react-confetti';
import { useSnackbar } from '../App';

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
    {[...Array(8)].map((_, i) => (
      <EmailIcon
        key={`email-${i}`}
        sx={{
          position: 'absolute',
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          fontSize: `${24 + Math.random() * 24}px`,
          color: alpha('#2196f3', 0.06 + Math.random() * 0.08),
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `float${i} 10s ease-in-out infinite alternate`,
          '@keyframes float0': { '0%': { transform: 'translateY(0) rotate(0deg)' }, '100%': { transform: 'translateY(-25px) rotate(10deg)' } },
        }}
      />
    ))}
    {[...Array(6)].map((_, i) => (
      <PhoneIcon
        key={`phone-${i}`}
        sx={{
          position: 'absolute',
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          fontSize: `${28 + Math.random() * 20}px`,
          color: alpha('#4caf50', 0.05 + Math.random() * 0.08),
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `float${i + 8} 12s ease-in-out infinite alternate`,
          '@keyframes float8': { '0%': { transform: 'translateY(0) rotate(0deg)' }, '100%': { transform: 'translateY(-30px) rotate(-15deg)' } },
        }}
      />
    ))}
  </Box>
);

const ContactInfoCard = ({ icon: Icon, title, content, color }) => (
  <Card
    sx={{
      p: 2,
      textAlign: 'center',
      background: alpha(color, 0.08),
      border: `2px solid ${alpha(color, 0.2)}`,
      borderRadius: 3,
      transition: 'all 0.3s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4,
        background: alpha(color, 0.12),
      },
    }}
  >
    <Icon sx={{ fontSize: 40, color: color, mb: 1 }} />
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{title}</Typography>
    <Typography variant="body2" color="text.secondary">{content}</Typography>
  </Card>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { darkMode } = useSnackbar();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setShowConfetti(true);
    toast.success('Message sent successfully! We will get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  if (submitted) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)', position: 'relative' }}>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            recycle={false}
            colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']}
            drawShape={ctx => {
              const shapes = ['heart', 'star'];
              const shape = shapes[Math.floor(Math.random() * shapes.length)];
              if (shape === 'heart') {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-2, -2, -4, 2, 0, 4);
                ctx.bezierCurveTo(4, 2, 2, -2, 0, 0);
                ctx.fill();
              } else {
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                  ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * 2, -Math.sin((18 + i * 72) * Math.PI / 180) * 2);
                  ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 1, -Math.sin((54 + i * 72) * Math.PI / 180) * 1);
                }
                ctx.closePath();
                ctx.fill();
              }
            }}
          />
        )}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', zIndex: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" color="success.main" gutterBottom sx={{ fontWeight: 800 }}>
              Message Sent!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for reaching out. We'll get back to you within 24 hours.
            </Typography>
            <Button
              onClick={() => window.location.reload()}
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 3, fontWeight: 700, px: 4 }}
            >
              Send Another Message
            </Button>
          </Box>
        </Fade>
        <ToastContainer position="top-center" autoClose={2000} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, Roboto, sans-serif', position: 'relative', py: 4 }}>
      <AnimatedBackground />
      <Box sx={{ maxWidth: 800, width: '100%', mx: 'auto', px: 2 }}>
        <Typography variant="h3" color={darkMode ? 'primary' : 'primary'} gutterBottom component="h1" sx={{ textAlign: 'center', fontWeight: 800, letterSpacing: 1, mb: 4, zIndex: 2, position: 'relative', color: darkMode ? '#f5f5f5' : 'primary' }}>
          Contact & Support
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
          <Grid item xs={12} md={4}>
            <ContactInfoCard
              icon={EmailIcon}
              title="Email Us"
              content="support@petadoption.com"
              color="#2196f3"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactInfoCard
              icon={PhoneIcon}
              title="Call Us"
              content="+1 (555) 123-4567"
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactInfoCard
              icon={LocationOnIcon}
              title="Visit Us"
              content="123 Pet Street, City, State"
              color="#ff9800"
            />
          </Grid>
        </Grid>

        <Card
          sx={{
            maxWidth: 600,
            mx: 'auto',
            boxShadow: 8,
            borderRadius: 5,
            p: 2,
            border: '2px solid',
            borderColor: theme => alpha(theme.palette.primary.main, 0.08),
            transition: 'box-shadow 0.3s, transform 0.3s',
            '&:hover': {
              boxShadow: 16,
              transform: 'translateY(-6px) scale(1.02)',
              borderColor: theme => alpha(theme.palette.primary.main, 0.18),
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" color="primary" gutterBottom component="h2" sx={{ textAlign: 'center', fontWeight: 700, mb: 3 }}>
              Send us a Message
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Have a question or need help? Fill out the form below and we'll get back to you within 24 hours!
            </Typography>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.7rem' }} aria-label="Contact form">
              <TextField
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                inputProps={{ 'aria-label': 'Your Name' }}
                sx={{ 
                  borderRadius: 2, 
                  background: '#f7fafc', 
                  transition: 'box-shadow 0.2s', 
                  '& .MuiInputBase-root': { fontWeight: 600 }, 
                  '&:focus-within': { boxShadow: '0 0 0 2px #2196f3' } 
                }}
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                inputProps={{ 'aria-label': 'Email Address' }}
                sx={{ 
                  borderRadius: 2, 
                  background: '#f7fafc', 
                  transition: 'box-shadow 0.2s', 
                  '& .MuiInputBase-root': { fontWeight: 600 }, 
                  '&:focus-within': { boxShadow: '0 0 0 2px #2196f3' } 
                }}
              />
              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                multiline
                rows={5}
                required
                inputProps={{ 'aria-label': 'Message' }}
                sx={{ 
                  borderRadius: 2, 
                  background: '#f7fafc', 
                  transition: 'box-shadow 0.2s', 
                  '& .MuiInputBase-root': { fontWeight: 600 }, 
                  '&:focus-within': { boxShadow: '0 0 0 2px #2196f3' } 
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                aria-label="Send Message"
                sx={{
                  background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)',
                  color: '#fff',
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
                    background: 'linear-gradient(90deg, #21cbf3 0%, #2196f3 100%)',
                    border: '2px solid #2196f3',
                    color: '#fff',
                    transform: 'translateY(-2px) scale(1.03)',
                    boxShadow: 8,
                  },
                  '&:active::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(33,150,243,0.15)',
                    borderRadius: '30px',
                    animation: 'ripple 0.4s',
                    zIndex: 1,
                  },
                }}
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer position="top-center" autoClose={2000} />
    </Box>
  );
};

export default Contact; 