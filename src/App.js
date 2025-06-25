import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Pets from './pages/Pets';
import Adopt from './pages/Adopt';
import PetDetails from './pages/PetDetails';
import UserDashboard from './pages/UserDashboard';
import MyAdoptions from './pages/MyAdoptions';
import ConfirmationPage from './pages/ConfirmationPage';
import Footer from './components/Footer';
import { Container, CssBaseline, ThemeProvider, createTheme, Switch, FormControlLabel, Snackbar, Alert, CircularProgress, Backdrop, Box, AppBar, Toolbar, Button, Typography, Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import React, { useState, useEffect, createContext, useContext } from 'react';
import AdminPanel from './pages/AdminPanel';
import Auth from './pages/Auth';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import NotificationsBell from './components/NotificationsBell';
import ScrollToTop from './components/ScrollToTop';
import DashboardRedirect from './pages/DashboardRedirect';
import AdminDashboard from './pages/AdminDashboard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const FadeInWrapper = ({ children }) => (
  <div className="fade-in-page">{children}</div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <FadeInWrapper key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/my-adoptions" element={<MyAdoptions />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </FadeInWrapper>
  );
}

const SnackbarContext = createContext();
export const useSnackbar = () => useContext(SnackbarContext);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [navBarVisible, setNavBarVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/pets', label: 'Pets', icon: '🐾' },
    { to: '/adopt', label: 'Adopt', icon: '❤️' },
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/my-adoptions', label: 'My Adoptions', icon: '🏠' },
    { to: '/favorites', label: 'Favorites', icon: '❤️' },
    { to: '/contact', label: 'Contact', icon: '📞' },
  ];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user ? JSON.parse(user) : null);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let lastDirection = null;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const direction = currentScrollY > lastY ? 'down' : 'up';
          if (currentScrollY < 80 || direction === 'up') {
            setShowNavBar(true);
            setNavBarVisible(true);
          } else if (direction === 'down') {
            setShowNavBar(false);
            setTimeout(() => setNavBarVisible(false), 400);
          }
          lastY = currentScrollY;
          setLastScrollY(currentScrollY);
          lastDirection = direction;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.href = '/auth';
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#388e3c' },
      success: { main: '#4caf50' },
    },
  });

  const showSnackbar = (message, severity = 'success') => setSnackbar({ open: true, message, severity });
  const handleCloseSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

  const navButtonStyle = {
    color: darkMode ? '#fff' : '#333',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '20px',
    margin: '0 4px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: 600,
    fontSize: '0.85rem',
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent',
    border: '2px solid transparent',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(56, 142, 60, 0.1), rgba(76, 175, 80, 0.2))',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      border: `2px solid rgba(56, 142, 60, 0.3)`,
      color: darkMode ? '#4CAF50' : '#2E7D32'
    },
    '&:active': {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, setLoading, currentUser, darkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar 
            position="fixed"
            elevation={0}
            sx={{ 
              pointerEvents: navBarVisible ? 'auto' : 'none',
              opacity: showNavBar ? 1 : 0,
              transform: showNavBar ? 'translateY(0)' : 'translateY(-40px)',
              transition: 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)',
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(34, 34, 34, 0.95), rgba(50, 50, 50, 0.95))' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95))',
              backdropFilter: 'blur(15px)',
              borderBottom: `2px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              boxShadow: showNavBar ? '0 8px 32px 0 rgba(31, 38, 135, 0.13)' : 'none',
              zIndex: 1200
            }}
          >
            <Toolbar sx={{ 
              justifyContent: 'space-between', 
              px: { xs: 2, md: 4 },
              py: 2,
              minHeight: '80px'
            }}>
              {/* Logo and Brand */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Home" arrow>
                  <Button
                    component={Link}
                    to="/"
                    sx={{
                      p: 0,
                      minWidth: 0,
                      background: 'none',
                      boxShadow: 'none',
                      '&:hover': { background: 'none', boxShadow: 'none' },
                    }}
                    aria-label="Go to home page"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '2px',
                        fontFamily: '"Poppins", "Roboto", sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3))',
                          background: 'linear-gradient(45deg, #FFA500, #FFD700)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }
                      }}
                    >
                      🐾 Peddify
                    </Typography>
                  </Button>
                </Tooltip>
                {/* Hamburger menu for mobile */}
                <Box sx={{ display: { xs: 'block', md: 'none' }, ml: 1 }}>
                  <IconButton
                    color="inherit"
                    aria-label="Open navigation menu"
                    onClick={() => setMobileOpen(true)}
                    size="large"
                  >
                    <MenuIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                </Box>
              </Box>
              {/* Navigation Links (desktop only) */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                <Tooltip title="Home" arrow><Button component={Link} to="/" sx={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white', fontWeight: 700, fontSize: '0.85rem', padding: '6px 12px', borderRadius: '20px', margin: '0 4px', boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)', border: '2px solid transparent', textTransform: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { background: 'linear-gradient(135deg, #FFA500, #FFD700)', transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)', border: '2px solid rgba(255, 215, 0, 0.5)' }, '&:active': { transform: 'translateY(-1px)', boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)' } }}>🏠 Home</Button></Tooltip>
                <Tooltip title="Pets" arrow><Button component={Link} to="/pets" sx={{ background: 'linear-gradient(135deg, #4CAF50, #45a049)', color: 'white', fontWeight: 700, fontSize: '0.85rem', padding: '6px 12px', borderRadius: '20px', margin: '0 4px', boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)', border: '2px solid transparent', textTransform: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { background: 'linear-gradient(135deg, #45a049, #4CAF50)', transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)', border: '2px solid rgba(76, 175, 80, 0.5)' }, '&:active': { transform: 'translateY(-1px)', boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)' } }}>🐾 Pets</Button></Tooltip>
                <Tooltip title="Adopt" arrow><Button component={Link} to="/adopt" sx={{ background: 'linear-gradient(135deg, #9C27B0, #7B1FA2)', color: 'white', fontWeight: 700, fontSize: '0.85rem', padding: '6px 12px', borderRadius: '20px', margin: '0 4px', boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)', border: '2px solid transparent', textTransform: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { background: 'linear-gradient(135deg, #7B1FA2, #9C27B0)', transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(156, 39, 176, 0.4)', border: '2px solid rgba(156, 39, 176, 0.5)' }, '&:active': { transform: 'translateY(-1px)', boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)' } }}>❤️ Adopt</Button></Tooltip>
                <Tooltip title="Dashboard" arrow><Button component={Link} to="/dashboard" sx={{ background: 'linear-gradient(135deg, #2196F3, #1976D2)', color: 'white', fontWeight: 700, fontSize: '0.85rem', padding: '6px 12px', borderRadius: '20px', margin: '0 4px', boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)', border: '2px solid transparent', textTransform: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { background: 'linear-gradient(135deg, #1976D2, #2196F3)', transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)', border: '2px solid rgba(33, 150, 243, 0.5)' }, '&:active': { transform: 'translateY(-1px)', boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)' } }}>📊 Dashboard</Button></Tooltip>
                <Tooltip title="My Adoptions" arrow><Button component={Link} to="/my-adoptions" sx={{ background: 'linear-gradient(135deg, #FF9800, #F57C00)', color: 'white', fontWeight: 700, fontSize: '0.85rem', padding: '6px 12px', borderRadius: '20px', margin: '0 4px', boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)', border: '2px solid transparent', textTransform: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { background: 'linear-gradient(135deg, #F57C00, #FF9800)', transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(255, 152, 0, 0.4)', border: '2px solid rgba(255, 152, 0, 0.5)' }, '&:active': { transform: 'translateY(-1px)', boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)' } }}>🏠 My Adoptions</Button></Tooltip>
                <Tooltip title="Favorites" arrow><Button component={Link} to="/favorites" sx={{ background: 'linear-gradient(135deg, #F44336, #D32F2F)', color: 'white', fontWeight: 700, fontSize: '0.85rem', padding: '6px 12px', borderRadius: '20px', margin: '0 4px', boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)', border: '2px solid transparent', textTransform: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { background: 'linear-gradient(135deg, #D32F2F, #F44336)', transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(244, 67, 54, 0.4)', border: '2px solid rgba(244, 67, 54, 0.5)' }, '&:active': { transform: 'translateY(-1px)', boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)' } }}>❤️ Favorites</Button></Tooltip>
                <Tooltip title="Contact" arrow><Button component={Link} to="/contact" sx={{ background: 'linear-gradient(135deg, #009688, #00796B)', color: 'white', fontWeight: 700, fontSize: '0.85rem', padding: '6px 12px', borderRadius: '20px', margin: '0 4px', boxShadow: '0 4px 15px rgba(0, 150, 136, 0.3)', border: '2px solid transparent', textTransform: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', '&:hover': { background: 'linear-gradient(135deg, #00796B, #009688)', transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(0, 150, 136, 0.4)', border: '2px solid rgba(0, 150, 136, 0.5)' }, '&:active': { transform: 'translateY(-1px)', boxShadow: '0 4px 15px rgba(0, 150, 136, 0.3)' } }}>📞 Contact</Button></Tooltip>
              </Box>
              {/* Right side controls (desktop only) */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                <Tooltip title="Notifications" arrow>
                  <span>
                    <NotificationsBell 
                      sx={{
                        color: darkMode ? '#FFD700' : '#388e3c',
                        background: darkMode ? 'rgba(255, 215, 0, 0.08)' : 'rgba(56, 142, 60, 0.08)',
                        borderRadius: '50%',
                        boxShadow: darkMode ? '0 0 8px 2px #FFD70033' : '0 0 8px 2px #388e3c33',
                        transition: 'all 0.3s',
                        '&:hover': {
                          background: darkMode ? 'rgba(255, 215, 0, 0.18)' : 'rgba(56, 142, 60, 0.18)',
                          transform: 'scale(1.1) rotate(-10deg)',
                          boxShadow: darkMode ? '0 0 16px 4px #FFD70066' : '0 0 16px 4px #388e3c66',
                        },
                        outline: 'none',
                      }}
                    />
                  </span>
                </Tooltip>
                
                {/* Dark Mode Toggle */}
                <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} arrow>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={darkMode} 
                        onChange={() => setDarkMode(m => !m)} 
                        color="primary" 
                        icon={<WbSunnyIcon sx={{ color: '#FFD700', fontSize: 22 }} />}
                        checkedIcon={<DarkModeIcon sx={{ color: '#90caf9', fontSize: 22 }} />}
                        inputProps={{ 'aria-label': 'Toggle dark mode' }}
                        sx={{
                          width: 56,
                          height: 32,
                          p: 0.5,
                          '& .MuiSwitch-switchBase': {
                            top: 2,
                            left: 2,
                            '&.Mui-checked': {
                              transform: 'translateX(24px)',
                              color: '#fff',
                              '& + .MuiSwitch-track': {
                                background: 'linear-gradient(90deg, #232526 0%, #43cea2 100%)',
                                opacity: 1,
                              },
                            },
                          },
                          '& .MuiSwitch-thumb': {
                            background: darkMode ? '#232526' : '#FFD700',
                            boxShadow: darkMode ? '0 0 8px 2px #43cea2' : '0 0 8px 2px #FFD70066',
                          },
                          '& .MuiSwitch-track': {
                            borderRadius: 20,
                            background: darkMode ? 'linear-gradient(90deg, #232526 0%, #43cea2 100%)' : 'linear-gradient(90deg, #FFD700 0%, #fffde4 100%)',
                            opacity: 1,
                          },
                        }}
                      />
                    }
                    label={darkMode ? 'Dark' : 'Light'}
                    sx={{ 
                      color: darkMode ? '#fff' : '#333',
                      fontWeight: 700,
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        transition: 'color 0.3s ease',
                        letterSpacing: 1,
                      },
                      '&:hover': {
                        '& .MuiFormControlLabel-label': {
                          color: '#43cea2'
                        }
                      }
                    }}
                  />
                </Tooltip>

                {/* User Menu */}
                {currentUser ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      onClick={handleMenuOpen}
                      sx={{
                        color: darkMode ? '#fff' : '#333',
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: 'transparent',
                        border: '2px solid transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(56, 142, 60, 0.1), rgba(76, 175, 80, 0.2))',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          border: `2px solid rgba(56, 142, 60, 0.3)`,
                          color: darkMode ? '#4CAF50' : '#2E7D32'
                        },
                        '&:active': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          mr: 1,
                          background: currentUser.email === 'admin@petadopt.com' 
                            ? 'linear-gradient(45deg, #FF6B35, #F7931E)' 
                            : 'linear-gradient(45deg, #4CAF50, #45a049)',
                          fontSize: '0.9rem'
                        }}
                      >
                        {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                      </Avatar>
                      {currentUser.name}
                      {currentUser.email === 'admin@petadopt.com' && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            ml: 1, 
                            px: 1, 
                            py: 0.5, 
                            background: 'linear-gradient(45deg, #FF6B35, #F7931E)', 
                            color: 'white', 
                            borderRadius: '10px', 
                            fontSize: '0.7rem',
                            fontWeight: 600
                          }}
                        >
                          ADMIN
                        </Typography>
                      )}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          background: darkMode ? 'rgba(34, 34, 34, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          borderRadius: 2,
                          minWidth: 200
                        }
                      }}
                    >
                      {currentUser.email === 'admin@petadopt.com' ? (
                        // Admin Menu Items
                        <>
                          <MenuItem 
                            onClick={handleMenuClose} 
                            component={Link} 
                            to="/admin"
                            sx={{ 
                              fontWeight: 600,
                              color: '#FF6B35',
                              '&:hover': { background: 'rgba(255, 107, 53, 0.1)' }
                            }}
                          >
                            ➕ Add Pets
                          </MenuItem>
                          <MenuItem 
                            onClick={handleMenuClose} 
                            component={Link} 
                            to="/admin"
                            sx={{ 
                              '&:hover': { background: 'rgba(76, 175, 80, 0.1)' }
                            }}
                          >
                            🗑️ Delete Pets
                          </MenuItem>
                          <MenuItem 
                            onClick={handleMenuClose} 
                            component={Link} 
                            to="/profile"
                            sx={{ 
                              '&:hover': { background: 'rgba(76, 175, 80, 0.1)' }
                            }}
                          >
                            👤 Profile Info
                          </MenuItem>
                        </>
                      ) : (
                        // Regular User Menu Items
                        <>
                          <MenuItem 
                            onClick={handleMenuClose} 
                            component={Link} 
                            to="/profile"
                            sx={{ 
                              fontWeight: 600,
                              '&:hover': { background: 'rgba(76, 175, 80, 0.1)' }
                            }}
                          >
                            👤 Profile Info
                          </MenuItem>
                        </>
                      )}
                      <MenuItem 
                        onClick={handleLogout} 
                        sx={{ 
                          color: '#e53935',
                          fontWeight: 600,
                          borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          mt: 1,
                          '&:hover': { background: 'rgba(229, 57, 53, 0.1)' }
                        }}
                      >
                        🚪 Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    component={Link}
                    to="/auth"
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                      color: 'white',
                      borderRadius: '25px',
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                      border: '2px solid transparent',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #45a049, #4CAF50)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
                        border: '2px solid rgba(76, 175, 80, 0.5)'
                      },
                      '&:active': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
                      }
                    }}
                  >
                    Login / Sign Up
                  </Button>
                )}
              </Box>
            </Toolbar>
            {/* Mobile Drawer */}
            <Drawer
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              PaperProps={{
                sx: {
                  width: 260,
                  background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'linear-gradient(135deg, #fffde4 0%, #f8fafc 100%)',
                  color: darkMode ? '#f5f5f5' : '#333',
                  borderTopRightRadius: 24,
                  borderBottomRightRadius: 24,
                  boxShadow: 8,
                  pt: 2
                }
              }}
            >
              <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 1, background: 'linear-gradient(45deg, #FFD700, #FFA500)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🐾 Peddify</Typography>
                <Box flexGrow={1} />
                <IconButton onClick={() => setMobileOpen(false)} aria-label="Close menu" color="inherit">
                  <MenuIcon sx={{ transform: 'rotate(45deg)', fontSize: 28 }} />
                </IconButton>
              </Box>
              <Divider sx={{ my: 1, borderColor: darkMode ? '#333' : '#eee' }} />
              <List>
                {navLinks.map(link => (
                  <ListItem key={link.to} disablePadding>
                    <ListItemButton component={Link} to={link.to} onClick={() => setMobileOpen(false)}>
                      <ListItemIcon sx={{ minWidth: 36, color: 'inherit', fontSize: 22 }}>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 700 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1, borderColor: darkMode ? '#333' : '#eee' }} />
              <Box sx={{ px: 2, py: 1 }}>
                <Tooltip title="Notifications" arrow>
                  <span>
                    <NotificationsBell sx={{ color: darkMode ? '#FFD700' : '#388e3c', background: darkMode ? 'rgba(255, 215, 0, 0.08)' : 'rgba(56, 142, 60, 0.08)', borderRadius: '50%', boxShadow: darkMode ? '0 0 8px 2px #FFD70033' : '0 0 8px 2px #388e3c33', transition: 'all 0.3s', '&:hover': { background: darkMode ? 'rgba(255, 215, 0, 0.18)' : 'rgba(56, 142, 60, 0.18)', transform: 'scale(1.1) rotate(-10deg)', boxShadow: darkMode ? '0 0 16px 4px #FFD70066' : '0 0 16px 4px #388e3c66', }, outline: 'none', }} />
                  </span>
                </Tooltip>
                <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} arrow>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={darkMode} 
                        onChange={() => setDarkMode(m => !m)} 
                        color="primary" 
                        icon={<WbSunnyIcon sx={{ color: '#FFD700', fontSize: 22 }} />}
                        checkedIcon={<DarkModeIcon sx={{ color: '#90caf9', fontSize: 22 }} />}
                        inputProps={{ 'aria-label': 'Toggle dark mode' }}
                        sx={{ width: 56, height: 32, p: 0.5, '& .MuiSwitch-switchBase': { top: 2, left: 2, '&.Mui-checked': { transform: 'translateX(24px)', color: '#fff', '& + .MuiSwitch-track': { background: 'linear-gradient(90deg, #232526 0%, #43cea2 100%)', opacity: 1, }, }, }, '& .MuiSwitch-thumb': { background: darkMode ? '#232526' : '#FFD700', boxShadow: darkMode ? '0 0 8px 2px #43cea2' : '0 0 8px 2px #FFD70066', }, '& .MuiSwitch-track': { borderRadius: 20, background: darkMode ? 'linear-gradient(90deg, #232526 0%, #43cea2 100%)' : 'linear-gradient(90deg, #FFD700 0%, #fffde4 100%)', opacity: 1, }, }}
                      />
                    }
                    label={darkMode ? 'Dark' : 'Light'}
                    sx={{ color: darkMode ? '#fff' : '#333', fontWeight: 700, '& .MuiFormControlLabel-label': { fontSize: '0.85rem', fontWeight: 700, transition: 'color 0.3s ease', letterSpacing: 1, }, '&:hover': { '& .MuiFormControlLabel-label': { color: '#43cea2' } } }}
                  />
                </Tooltip>
              </Box>
            </Drawer>
          </AppBar>
          <Toolbar sx={{ minHeight: '80px', display: 'block' }} />
          <Container maxWidth="md" sx={{ minHeight: '80vh', py: 4 }}>
            <AnimatedRoutes />
          </Container>
          <Footer />
          <ScrollToTop />
          <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
          <Backdrop open={loading} sx={{ color: '#fff', zIndex: 2000 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Router>
      </ThemeProvider>
    </SnackbarContext.Provider>
  );
}

export default App;
