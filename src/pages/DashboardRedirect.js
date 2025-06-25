import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../App';
import { Box, Paper } from '@mui/material';

const DashboardRedirect = () => {
  const navigate = useNavigate();
  const { darkMode } = useSnackbar();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.email === 'admin@petadopt.com') {
      navigate('/admindashboard');
    } else {
      navigate('/userdashboard');
    }
  }, [navigate]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: darkMode ? 'linear-gradient(120deg, #232526 0%, #414345 100%)' : 'linear-gradient(120deg, #f8fafc 0%, #e3f2fd 100%)' }}>
      <Paper elevation={8} sx={{
        p: 4,
        borderRadius: 5,
        background: darkMode ? 'rgba(30,32,34,0.98)' : 'white',
        color: darkMode ? '#f5f5f5' : 'inherit',
        boxShadow: darkMode ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : undefined,
        border: darkMode ? '1.5px solid #333' : '1.5px solid #eee',
        textAlign: 'center',
        maxWidth: 400,
        mx: 'auto',
      }}>
      </Paper>
    </Box>
  );
};

export default DashboardRedirect; 