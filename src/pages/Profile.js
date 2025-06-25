import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Container } from '@mui/material';
import { useSnackbar } from '../App';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
const setUsers = users => localStorage.setItem('users', JSON.stringify(users));
const setCurrentUser = user => localStorage.setItem('currentUser', JSON.stringify(user));

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { showSnackbar, darkMode } = useSnackbar();
  const [avatar, setAvatar] = useState('');
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const current = localStorage.getItem('currentUser');
    if (current) {
      const parsed = JSON.parse(current);
      setUser(parsed);
      setForm(parsed);
      setAvatar(parsed.avatar || '');
    }
    // Load user's adoptions
    const allAdoptions = JSON.parse(localStorage.getItem('adoptions') || '[]');
    if (current) {
      const parsed = JSON.parse(current);
      setAdoptions(allAdoptions.filter(a => a.email === parsed.email));
    }
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setAvatar(ev.target.result);
      setForm(f => ({ ...f, avatar: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    let users = getUsers();
    users = users.map(u => u.email === user.email ? { ...form, avatar } : u);
    setUsers(users);
    setCurrentUser({ ...form, avatar });
    setUser({ ...form, avatar });
    showSnackbar('Profile updated!', 'success');
  };

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Please log in to view your profile.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: darkMode ? 'radial-gradient(circle at 60% 40%, #232526 60%, #414345 100%)' : 'radial-gradient(circle at 60% 40%, #e3f2fd 60%, #f8fafc 100%)', py: 6, px: 2, position: 'relative' }}>
      <Container maxWidth="md">
        <Paper elevation={12} className="profile-fade-in" sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 6,
          background: darkMode ? 'rgba(30,32,34,0.92)' : 'rgba(255,255,255,0.95)',
          color: darkMode ? '#f5f5f5' : 'inherit',
          boxShadow: darkMode ? '0 12px 48px 0 rgba(67,206,162,0.13)' : '0 12px 48px 0 rgba(76,175,80,0.10)',
          border: darkMode ? '1.5px solid #43cea2' : '1.5px solid #4caf50',
          backdropFilter: 'blur(8px)',
          animation: 'fadeInPanel 0.7s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <Box sx={{ display: { xs: 'block', md: 'flex' }, alignItems: 'flex-start', gap: 5 }}>
            {/* Left: Avatar and greeting */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 3, md: 0 }, flex: '0 0 220px', minWidth: 0 }}>
              <Box sx={{
                position: 'relative',
                width: 120,
                height: 120,
                mb: 1,
                background: 'linear-gradient(135deg, #43cea2, #185a9d)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: darkMode ? '0 0 0 6px #232526' : '0 0 0 6px #fff',
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: '0 0 0 10px #43cea288' },
              }}>
                <Avatar src={avatar} sx={{ width: 104, height: 104, border: '4px solid #fff', boxShadow: 4, zIndex: 1 }} />
                <label htmlFor="avatar-upload">
                  <input accept="image/*" id="avatar-upload" type="file" hidden onChange={handleAvatarChange} />
                  <IconButton color="primary" component="span" sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    background: darkMode ? '#232526' : '#e8f5e9',
                    boxShadow: 2,
                    border: '2px solid #fff',
                    zIndex: 2,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.15)', background: '#43cea2' },
                  }} aria-label="Upload Avatar">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 2, mb: 1, letterSpacing: 1, textAlign: 'center', background: 'linear-gradient(45deg, #43cea2, #185a9d)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Hello, {form.name.split(' ')[0] || 'Friend'}!
              </Typography>
              <Typography variant="body1" sx={{ color: darkMode ? '#b0bec5' : '#666', textAlign: 'center', mb: 2 }}>
                Welcome to your profile. Update your info and see your adoption journey!
              </Typography>
            </Box>
            {/* Right: Profile form and history */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} aria-label="Profile Form">
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} required inputProps={{ 'aria-label': 'Name' }} />
                <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required inputProps={{ 'aria-label': 'Email' }} />
                <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required inputProps={{ 'aria-label': 'Password' }} />
                <Button type="submit" variant="contained" color="success" size="large" aria-label="Save Profile" sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, letterSpacing: 1, boxShadow: 3, transition: 'box-shadow 0.3s, transform 0.3s', '&:hover': { boxShadow: 6, transform: 'scale(1.04)' } }}>Save</Button>
              </form>
              <Divider sx={{ my: 4, borderColor: darkMode ? '#333' : '#eee' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }} align="center">Adoption History</Typography>
              {adoptions.length === 0 ? (
                <Typography align="center" color="text.secondary">No adoption requests yet.</Typography>
              ) : (
                <List sx={{ width: '100%', maxHeight: 260, overflow: 'auto', animation: 'fadeInPanel 0.7s cubic-bezier(0.4,0,0.2,1)' }}>
                  {adoptions.map((a, i) => (
                    <ListItem key={i} sx={{ mb: 1, borderRadius: 2, background: darkMode ? 'rgba(67,206,162,0.08)' : '#f1f8e9', boxShadow: 1, opacity: 0, animation: `fadeInItem 0.5s ${0.15 * i + 0.2}s forwards` }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: a.status === 'approved' ? 'success.main' : a.status === 'pending' ? 'warning.main' : 'error.main' }}>
                          {a.pet?.charAt(0) || '?'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<span style={{ fontWeight: 600 }}>{a.pet}</span>}
                        secondary={<>
                          <Chip label={a.status.charAt(0).toUpperCase() + a.status.slice(1)} color={a.status === 'approved' ? 'success' : a.status === 'pending' ? 'warning' : 'error'} size="small" sx={{ mr: 1 }} />
                          <span style={{ color: '#888' }}>{new Date(a.date).toLocaleDateString()}</span>
                        </>}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
      <style>{`
      @keyframes fadeInPanel {
        from { opacity: 0; transform: translateY(24px) scale(0.98); }
        to { opacity: 1; transform: none; }
      }
      @keyframes fadeInItem {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: none; }
      }
      `}</style>
    </Box>
  );
};

export default Profile; 