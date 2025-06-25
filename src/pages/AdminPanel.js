import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import petsData from '../data/pets';
import { useSnackbar } from '../App';

const PET_TYPES = ['Dog', 'Cat', 'Rabbit', 'Parrot', 'Guinea Pig', 'Other'];
const PET_SIZES = ['Small', 'Medium', 'Large'];
const PET_GENDERS = ['Male', 'Female'];
const PET_STATUSES = ['Available', 'Adopted'];

const getInitialPets = () => {
  const stored = localStorage.getItem('adminPets');
  if (stored) {
    const arr = JSON.parse(stored);
    if (Array.isArray(arr) && arr.length > 0) return arr;
  }
  // If no adminPets, use default petsData
  return petsData;
};

const AdminPanel = () => {
  const [pets, setPets] = useState(getInitialPets());
  const [form, setForm] = useState({
    name: 'Max',
    type: 'Dog',
    breed: 'German Shepherd',
    age: '4 years',
    size: 'Large',
    gender: 'Male',
    status: 'Available',
    description: 'A loyal and protective German Shepherd. Excellent guard dog who is also great with children when properly trained.',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editPet, setEditPet] = useState(null);
  const [adoptions, setAdoptions] = useState([]);
  const { darkMode } = useSnackbar();

  useEffect(() => {
    localStorage.setItem('adminPets', JSON.stringify(pets));
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user ? JSON.parse(user) : null);
    setAdoptions(JSON.parse(localStorage.getItem('adoptions') || '[]'));
  }, []);

  if (!currentUser || currentUser.email !== 'admin@petadopt.com') {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Admin access only. Please log in as admin@petadopt.com.
        </Typography>
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Login as Admin
        </Button>
      </Box>
    );
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.type || !form.description || !form.image || !form.age || !form.size || !form.gender || !form.status) return;
    setPets([...pets, {
      ...form,
      id: Date.now(),
      adopted: form.status === 'Adopted',
    }]);
    setForm({
      name: '',
      type: '',
      breed: '',
      age: '',
      size: '',
      gender: '',
      status: 'Available',
      description: '',
      image: ''
    });
    setImagePreview('');
  };

  const handleEditOpen = pet => {
    setEditPet(pet);
    setEditDialog(true);
  };

  const handleEditChange = e => {
    setEditPet({ ...editPet, [e.target.name]: e.target.value });
  };

  const handleEditImage = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPet(f => ({ ...f, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = () => {
    setPets(pets.map(p => p.id === editPet.id ? editPet : p));
    setEditDialog(false);
    setEditPet(null);
  };

  const handleEditClose = () => {
    setEditDialog(false);
    setEditPet(null);
  };

  const handleDelete = id => {
    setPets(pets.filter(p => p.id !== id));
  };

  // Approve adoption request
  const handleApproveAdoption = (adoption, idx) => {
    // Mark pet as adopted
    let petsList = JSON.parse(localStorage.getItem('pets')) || [];
    petsList = petsList.map(p => p.name === adoption.pet ? { ...p, adopted: true } : p);
    localStorage.setItem('pets', JSON.stringify(petsList));
    setPets(petsList);
    // Update adoption status
    const updatedAdoptions = adoptions.map((a, i) => i === idx ? { ...a, status: 'approved' } : a);
    setAdoptions(updatedAdoptions);
    localStorage.setItem('adoptions', JSON.stringify(updatedAdoptions));
  };

  // Reject adoption request
  const handleRejectAdoption = (idx) => {
    const updatedAdoptions = adoptions.map((a, i) => i === idx ? { ...a, status: 'rejected' } : a);
    setAdoptions(updatedAdoptions);
    localStorage.setItem('adoptions', JSON.stringify(updatedAdoptions));
  };

  return (
    <Box sx={{ p: 4, background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'none', minHeight: '100vh' }}>
      <Typography variant="h3" color={darkMode ? 'primary' : 'primary'} gutterBottom component="h1" sx={{ color: darkMode ? '#f5f5f5' : 'primary' }}>
        Admin Panel
      </Typography>
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }} component="h2">
        Pending Adoption Requests
      </Typography>
      {adoptions.filter(a => a.status === 'pending').length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          No pending adoption requests.
        </Typography>
      )}
      {adoptions.filter(a => a.status === 'pending').map((adoption, idx) => (
        <Card key={idx} sx={{ mb: 2, p: 2, background: '#f9f9f9', borderRadius: 2, boxShadow: 1 }}>
          <Typography><b>Pet:</b> {adoption.pet}</Typography>
          <Typography><b>Name:</b> {adoption.name}</Typography>
          <Typography><b>Email:</b> {adoption.email}</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<CheckIcon />}
              onClick={() => handleApproveAdoption(adoption, idx)}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<CloseIcon />}
              onClick={() => handleRejectAdoption(idx)}
            >
              Reject
            </Button>
          </Box>
        </Card>
      ))}
      <Typography variant="h6" sx={{ mt: 5, mb: 2 }} component="h2">
        Add a New Pet
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }} aria-label="Add Pet Form">
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required inputProps={{ 'aria-label': 'Pet Name' }} />
        <TextField select label="Type" name="type" value={form.type} onChange={handleChange} required inputProps={{ 'aria-label': 'Pet Type' }}>
          {PET_TYPES.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>
        <TextField label="Breed" name="breed" value={form.breed} onChange={handleChange} inputProps={{ 'aria-label': 'Pet Breed' }} />
        <TextField label="Age" name="age" value={form.age} onChange={handleChange} required inputProps={{ 'aria-label': 'Pet Age' }} />
        <TextField select label="Size" name="size" value={form.size} onChange={handleChange} required inputProps={{ 'aria-label': 'Pet Size' }}>
          {PET_SIZES.map(size => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Gender" name="gender" value={form.gender} onChange={handleChange} required inputProps={{ 'aria-label': 'Pet Gender' }}>
          {PET_GENDERS.map(gender => (
            <MenuItem key={gender} value={gender}>{gender}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Status" name="status" value={form.status} onChange={handleChange} required inputProps={{ 'aria-label': 'Pet Status' }}>
          {PET_STATUSES.map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={3} required inputProps={{ 'aria-label': 'Pet Description' }} />
        <Button variant="contained" component="label" aria-label="Upload Pet Image">
          Upload Image
          <input type="file" accept="image/*" hidden onChange={handleImage} />
        </Button>
        {imagePreview && <img src={imagePreview} alt="Preview of new pet" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8 }} />}
        <Button type="submit" variant="contained" color="success" size="large" aria-label="Add Pet">Add Pet</Button>
      </form>
      <Typography variant="h6" sx={{ mt: 5, mb: 2 }} component="h2">
        All Pets
      </Typography>
      <Grid container spacing={3}>
        {pets.map(pet => (
          <Grid item xs={12} sm={6} md={4} key={pet.id}>
            <Card sx={{ background: '#fafafa', borderRadius: 2, boxShadow: 2, position: 'relative' }}>
              {pet.image && <CardMedia component="img" height="160" image={pet.image} alt={`Photo of ${pet.name}`} />}
              <CardContent>
                <Typography variant="h6" color="primary">{pet.name}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{pet.type}</Typography>
                <Typography variant="body2" color="text.secondary">{pet.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <IconButton color="primary" onClick={() => handleEditOpen(pet)} aria-label={`Edit ${pet.name}`}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(pet.id)} aria-label={`Delete ${pet.name}`}><DeleteIcon /></IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={editDialog} onClose={handleEditClose} maxWidth="sm" fullWidth aria-label="Edit Pet Dialog">
        <DialogTitle>Edit Pet</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Name" name="name" value={editPet?.name || ''} onChange={handleEditChange} required inputProps={{ 'aria-label': 'Pet Name' }} />
          <TextField select label="Type" name="type" value={editPet?.type || ''} onChange={handleEditChange} required inputProps={{ 'aria-label': 'Pet Type' }}>
            {PET_TYPES.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField label="Description" name="description" value={editPet?.description || ''} onChange={handleEditChange} multiline rows={3} required inputProps={{ 'aria-label': 'Pet Description' }} />
          <Button variant="contained" component="label" aria-label="Upload Pet Image">
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleEditImage} />
          </Button>
          {editPet?.image && <img src={editPet.image} alt="Preview of pet" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8 }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} aria-label="Cancel Edit">Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="success" aria-label="Save Pet">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel; 