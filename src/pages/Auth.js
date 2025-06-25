import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Tabs, Tab, Card, CardContent, Fade, Chip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../App';
import { alpha } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
const setUsers = users => localStorage.setItem('users', JSON.stringify(users));
const setCurrentUser = user => localStorage.setItem('currentUser', JSON.stringify(user));

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
      <LockIcon
        key={i}
        sx={{
          position: 'absolute',
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          fontSize: `${24 + Math.random() * 24}px`,
          color: alpha('#ff6b6b', 0.06 + Math.random() * 0.08),
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `float${i} 10s ease-in-out infinite alternate`,
          '@keyframes float0': { '0%': { transform: 'translateY(0) rotate(0deg)' }, '100%': { transform: 'translateY(-30px) rotate(180deg)' } },
        }}
      />
    ))}
    {[...Array(6)].map((_, i) => (
      <PetsIcon
        key={`pet-${i}`}
        sx={{
          position: 'absolute',
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          fontSize: `${20 + Math.random() * 20}px`,
          color: alpha('#4ecdc4', 0.08 + Math.random() * 0.06),
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `floatPet${i} 12s ease-in-out infinite alternate`,
          '@keyframes floatPet0': { '0%': { transform: 'translateY(0) rotate(0deg)' }, '100%': { transform: 'translateY(-25px) rotate(-180deg)' } },
        }}
      />
    ))}
  </Box>
);

const Auth = () => {
  const [tab, setTab] = useState(0);
  const [signup, setSignup] = useState({ name: '', email: '', password: '' });
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showSnackbar, setLoading, darkMode } = useSnackbar();

  const handleTab = (_, newValue) => {
    setTab(newValue);
    setError('');
  };

  const handleSignup = async e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const users = getUsers();
      if (users.find(u => u.email === signup.email)) {
        setError('Email already registered.');
        showSnackbar('Email already registered.', 'error');
        toast.error('Email already registered.');
        setLoading(false);
        return;
      }
      users.push(signup);
      setUsers(users);
      setCurrentUser(signup);
      showSnackbar('Sign up successful!', 'success');
      toast.success('Sign up successful! Welcome to our pet adoption family! 🐾');
      setLoading(false);
      // Auto refresh after signup
      setTimeout(() => window.location.reload(), 1500);
    }, 900);
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === login.email && u.password === login.password);
      if (!user) {
        setError('Invalid email or password.');
        showSnackbar('Invalid email or password.', 'error');
        toast.error('Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }
      setCurrentUser(
        user.email === 'admin@petadopt.com'
          ? { ...user, name: 'Sahil' }
          : user
      );
      showSnackbar('Login successful!', 'success');
      toast.success(`Welcome back, ${user.name}! 🐕`);
      setLoading(false);
      // Redirect to dashboard
      setTimeout(() => {
      if (user.email === 'admin@petadopt.com') {
        window.location.href = '/admindashboard';
      } else {
        window.location.href = '/userdashboard';
      }
      }, 1500);
    }, 900);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'Poppins, Roboto, sans-serif', 
      position: 'relative',
      p: 2
    }}>
      <AnimatedBackground />
      <Card
        sx={{
          maxWidth: 480,
          width: '100%',
          mx: 'auto',
          boxShadow: 12,
          borderRadius: 4,
          p: 3,
          border: '2px solid',
          borderColor: theme => darkMode ? 'rgba(255,255,255,0.1)' : alpha(theme.palette.primary.main, 0.1),
          background: darkMode ? 'rgba(30,32,34,0.98)' : 'rgba(255, 255, 255, 0.95)',
          color: darkMode ? '#f5f5f5' : 'inherit',
          transition: 'box-shadow 0.3s, transform 0.3s',
          '&:hover': {
            boxShadow: 20,
            transform: 'translateY(-8px) scale(1.02)',
            borderColor: theme => darkMode ? 'rgba(255,255,255,0.2)' : alpha(theme.palette.primary.main, 0.2),
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Button
              component="a"
              href="/"
              variant="outlined"
              color="primary"
              sx={{ 
                borderRadius: 3, 
                fontWeight: 700, 
                px: 2, 
                mr: 2, 
                minWidth: 0,
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#764ba2',
                  backgroundColor: alpha('#667eea', 0.1),
                }
              }}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Typography 
              variant="h4" 
              color="primary" 
              gutterBottom 
              component="h1" 
              sx={{ 
                textAlign: 'center', 
                fontWeight: 800, 
                letterSpacing: 1, 
                flex: 1,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                display: 'inline-block',
                borderRadius: '50%',
                p: 2,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                boxShadow: 4,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                  boxShadow: 8,
                },
              }}
            >
              <PetsIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, color: '#667eea' }}>
              Pet Adoption Portal
            </Typography>
            <Chip
              icon={<LockIcon />}
              label="Secure Authentication"
              color="secondary"
              sx={{ 
                fontWeight: 600, 
                mt: 1, 
                letterSpacing: 0.5, 
                px: 1.5, 
                fontSize: '0.9rem', 
                background: 'linear-gradient(45deg, #ff6b6b, #ffa726)',
                color: 'white'
              }}
            />
          </Box>

          <Tabs 
            value={tab} 
            onChange={handleTab} 
            centered 
            sx={{ 
              mb: 4,
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#667eea',
                '&.Mui-selected': {
                  color: '#764ba2',
                }
              },
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                height: 3,
                borderRadius: 2,
              }
            }} 
            aria-label="Login and Sign Up Tabs"
          >
            <Tab 
              label="Login" 
              id="login-tab" 
              aria-controls="login-panel"
              icon={<LoginIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Sign Up" 
              id="signup-tab" 
              aria-controls="signup-panel"
              icon={<PersonAddIcon />}
              iconPosition="start"
            />
      </Tabs>

          <Fade in={true} timeout={600}>
            <Box>
      {tab === 1 ? (
                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }} aria-label="Sign Up Form" id="signup-panel" aria-labelledby="signup-tab">
                  <TextField 
                    label="Full Name" 
                    name="name" 
                    value={signup.name} 
                    onChange={e => setSignup({ ...signup, name: e.target.value })} 
                    required 
                    inputProps={{ 'aria-label': 'Full Name' }}
                    sx={{ 
                      borderRadius: 2, 
                      background: '#f8f9ff', 
                      transition: 'box-shadow 0.2s', 
                      '& .MuiInputBase-root': { fontWeight: 600 }, 
                      '&:focus-within': { boxShadow: '0 0 0 2px #667eea' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: alpha('#667eea', 0.3),
                        },
                        '&:hover fieldset': {
                          borderColor: alpha('#667eea', 0.5),
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                  <TextField 
                    label="Email Address" 
                    name="email" 
                    type="email" 
                    value={signup.email} 
                    onChange={e => setSignup({ ...signup, email: e.target.value })} 
                    required 
                    inputProps={{ 'aria-label': 'Email Address' }}
                    sx={{ 
                      borderRadius: 2, 
                      background: '#f8f9ff', 
                      transition: 'box-shadow 0.2s', 
                      '& .MuiInputBase-root': { fontWeight: 600 }, 
                      '&:focus-within': { boxShadow: '0 0 0 2px #667eea' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: alpha('#667eea', 0.3),
                        },
                        '&:hover fieldset': {
                          borderColor: alpha('#667eea', 0.5),
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                  <TextField 
                    label="Password" 
                    name="password" 
                    type="password" 
                    value={signup.password} 
                    onChange={e => setSignup({ ...signup, password: e.target.value })} 
                    required 
                    inputProps={{ 'aria-label': 'Password' }}
                    sx={{ 
                      borderRadius: 2, 
                      background: '#f8f9ff', 
                      transition: 'box-shadow 0.2s', 
                      '& .MuiInputBase-root': { fontWeight: 600 }, 
                      '&:focus-within': { boxShadow: '0 0 0 2px #667eea' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: alpha('#667eea', 0.3),
                        },
                        '&:hover fieldset': {
                          borderColor: alpha('#667eea', 0.5),
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                  {error && <Typography color="error" sx={{ textAlign: 'center', fontWeight: 600 }}>{error}</Typography>}
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    aria-label="Sign Up"
                    startIcon={<PersonAddIcon />}
                    sx={{
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      fontWeight: 800,
                      borderRadius: '30px',
                      py: 1.8,
                      fontSize: '1.1rem',
                      boxShadow: 6,
                      letterSpacing: 1,
                      transition: 'all 0.25s',
                      border: '2px solid transparent',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                        border: '2px solid #667eea',
                        transform: 'translateY(-3px) scale(1.02)',
                        boxShadow: 12,
                      },
                    }}
                  >
                    Create Account
                  </Button>
        </form>
      ) : (
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }} aria-label="Login Form" id="login-panel" aria-labelledby="login-tab">
                  <TextField 
                    label="Email Address" 
                    name="email" 
                    type="email" 
                    value={login.email} 
                    onChange={e => setLogin({ ...login, email: e.target.value })} 
                    required 
                    inputProps={{ 'aria-label': 'Email Address' }}
                    sx={{ 
                      borderRadius: 2, 
                      background: '#f8f9ff', 
                      transition: 'box-shadow 0.2s', 
                      '& .MuiInputBase-root': { fontWeight: 600 }, 
                      '&:focus-within': { boxShadow: '0 0 0 2px #667eea' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: alpha('#667eea', 0.3),
                        },
                        '&:hover fieldset': {
                          borderColor: alpha('#667eea', 0.5),
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                  <TextField 
                    label="Password" 
                    name="password" 
                    type="password" 
                    value={login.password} 
                    onChange={e => setLogin({ ...login, password: e.target.value })} 
                    required 
                    inputProps={{ 'aria-label': 'Password' }}
                    sx={{ 
                      borderRadius: 2, 
                      background: '#f8f9ff', 
                      transition: 'box-shadow 0.2s', 
                      '& .MuiInputBase-root': { fontWeight: 600 }, 
                      '&:focus-within': { boxShadow: '0 0 0 2px #667eea' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: alpha('#667eea', 0.3),
                        },
                        '&:hover fieldset': {
                          borderColor: alpha('#667eea', 0.5),
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                    }}
                  />
                  {error && <Typography color="error" sx={{ textAlign: 'center', fontWeight: 600 }}>{error}</Typography>}
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    aria-label="Login"
                    startIcon={<LoginIcon />}
                    sx={{
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      fontWeight: 800,
                      borderRadius: '30px',
                      py: 1.8,
                      fontSize: '1.1rem',
                      boxShadow: 6,
                      letterSpacing: 1,
                      transition: 'all 0.25s',
                      border: '2px solid transparent',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                        border: '2px solid #667eea',
                        transform: 'translateY(-3px) scale(1.02)',
                        boxShadow: 12,
                      },
                    }}
                  >
                    Sign In
                  </Button>
        </form>
      )}
            </Box>
          </Fade>
        </CardContent>
      </Card>
      <ToastContainer position="top-center" autoClose={2000} />
    </Box>
  );
};

export default Auth; 