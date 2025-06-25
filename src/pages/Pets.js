import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import petsData from '../data/pets';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  IconButton,
  Box,
  Chip,
  Container,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Pagination,
  Badge,
  Tooltip,
  Paper,
  Collapse,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PetsIcon from '@mui/icons-material/Pets';
import StraightenIcon from '@mui/icons-material/Straighten';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CategoryIcon from '@mui/icons-material/Category';
import { useSnackbar } from '../App';

const getUniqueTypes = pets => [
  'All',
  ...Array.from(new Set(pets.map(pet => pet.type)))
];

const getUniqueBreeds = pets => [
  'All',
  ...Array.from(new Set(pets.map(pet => pet.breed).filter(Boolean)))
];

const getUniqueSizes = pets => [
  'All',
  ...Array.from(new Set(pets.map(pet => pet.size).filter(Boolean)))
];

const getUniqueAges = pets => [
  'All',
  'Puppy/Kitten',
  'Young Adult',
  'Adult',
  'Senior'
];

const getUniqueGenders = pets => [
  'All',
  'Male',
  'Female'
];

const getUniqueStatuses = pets => [
  'All',
  'Available',
  'Adopted'
];

const Pets = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [breed, setBreed] = useState('All');
  const [size, setSize] = useState('All');
  const [age, setAge] = useState('All');
  const [gender, setGender] = useState('All');
  const [status, setStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(12);
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem('favorites');
    return favs ? JSON.parse(favs) : [];
  });
  const [pets, setPets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { showSnackbar, darkMode } = useSnackbar();
  const [filterOpen, setFilterOpen] = useState(false);
  const [breedMulti, setBreedMulti] = useState([]);
  const [sizeMulti, setSizeMulti] = useState([]);

  useEffect(() => {
    // Clear any potentially corrupted localStorage data
    
    const stored = JSON.parse(localStorage.getItem('pets')) || petsData;
    console.log('Pets data loaded:', stored);
    console.log('Number of pets:', stored.length);
    console.log('petsData from import:', petsData);
    console.log('petsData length:', petsData.length);
    
    // Ensure we always have pets data
    if (!stored || stored.length === 0) {
      console.log('No stored pets, using petsData');
      setPets(petsData);
    } else {
      setPets(stored);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user ? JSON.parse(user) : null);
  }, []);

  const handleFavorite = id => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(fav => fav !== id);
      showSnackbar('Removed from favorites', 'info');
    } else {
      updated = [...favorites, id];
      showSnackbar('Added to favorites!', 'success');
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleDeletePet = (id) => {
    const updatedPets = pets.filter(pet => pet.id !== id);
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
    showSnackbar('Pet deleted!', 'info');
  };

  const clearAllFilters = () => {
    setSearch('');
    setType('All');
    setBreed('All');
    setSize('All');
    setAge('All');
    setGender('All');
    setStatus('All');
    setCurrentPage(1);
  };

  const getAgeCategory = (age) => {
    if (!age || typeof age !== 'string') return 'Unknown';
    if (age.includes('months') || age.includes('month')) {
      return 'Puppy/Kitten';
    } else if (age.includes('1 year') || age.includes('2 years')) {
      return 'Young Adult';
    } else if (age.includes('3 years') || age.includes('4 years') || age.includes('5 years')) {
      return 'Adult';
    } else {
      return 'Senior';
    }
  };

  const filteredPets = pets.filter(
    pet => {
      const ageCategory = getAgeCategory(pet.age);
      const petStatus = pet.adopted ? 'Adopted' : 'Available';
      
      return (
        (type === 'All' || pet.type === type) &&
        (breed === 'All' || breedMulti.length === 0 || breedMulti.includes(pet.breed) || pet.breed === breed) &&
        (size === 'All' || sizeMulti.length === 0 || sizeMulti.includes(pet.size) || pet.size === size) &&
        (age === 'All' || ageCategory === age) &&
        (gender === 'All' || pet.gender === gender) &&
        (status === 'All' || petStatus === status) &&
        (pet.name.toLowerCase().includes(search.toLowerCase()) ||
          pet.type.toLowerCase().includes(search.toLowerCase()) ||
          (pet.breed && pet.breed.toLowerCase().includes(search.toLowerCase())))
      );
    }
  );

  const getSizeColor = (size) => {
    switch (size) {
      case 'Small': return 'success';
      case 'Medium': return 'warning';
      case 'Large': return 'error';
      default: return 'default';
    }
  };

  // Pagination
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restoreAllPets = () => {
    // Set all pets to available (adopted: false) when restoring, but do NOT clear adoptions
    const resetPets = petsData.map(pet => ({ ...pet, adopted: false }));
    setPets(resetPets);
    localStorage.setItem('pets', JSON.stringify(resetPets));
    showSnackbar('All pets restored!', 'success');
  };

  const filterPanel = (
    <Paper 
      elevation={6}
      className="filter-fade-in"
      sx={{ 
        mb: 4, 
        p: { xs: 3, sm: 5 },
        borderRadius: 4,
        background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'linear-gradient(135deg, #e8f5e9 0%, #f3e5f5 100%)',
        border: darkMode ? '1.5px solid #333' : '1.5px solid #e0e0e0',
        maxWidth: 1200,
        mx: 'auto',
        boxShadow: darkMode ? '0 8px 32px 0 rgba(31, 38, 135, 0.13)' : '0 8px 32px 0 rgba(76,175,80,0.10)',
        position: { md: 'sticky' },
        top: { md: 100 },
        zIndex: 10,
        transition: 'box-shadow 0.3s, background 0.3s',
        animation: 'fadeInPanel 0.7s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{
              background: darkMode ? 'rgba(30,32,34,0.98)' : '#fff',
              borderRadius: 2,
              boxShadow: darkMode ? '0 2px 8px 0 #23252633' : '0 2px 8px 0 #4caf5033',
              transition: 'box-shadow 0.3s, transform 0.3s',
              '&:hover, &:focus-within': {
                boxShadow: darkMode ? '0 4px 16px 0 #43cea299' : '0 4px 16px 0 #4caf5099',
                transform: 'scale(1.03)',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <FormControl fullWidth sx={{ background: darkMode ? 'rgba(30,32,34,0.98)' : '#fff', borderRadius: 2, boxShadow: darkMode ? '0 2px 8px 0 #23252633' : '0 2px 8px 0 #4caf5033', transition: 'box-shadow 0.3s, transform 0.3s', '&:hover, &:focus-within': { boxShadow: darkMode ? '0 4px 16px 0 #43cea299' : '0 4px 16px 0 #4caf5099', transform: 'scale(1.03)' } }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={e => setType(e.target.value)} startAdornment={<InputAdornment position="start"><CategoryIcon fontSize="small" /></InputAdornment>}>
              {getUniqueTypes(pets).map(t => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <FormControl fullWidth sx={{ background: darkMode ? 'rgba(30,32,34,0.98)' : '#fff', borderRadius: 2, boxShadow: darkMode ? '0 2px 8px 0 #23252633' : '0 2px 8px 0 #4caf5033', transition: 'box-shadow 0.3s, transform 0.3s', '&:hover, &:focus-within': { boxShadow: darkMode ? '0 4px 16px 0 #43cea299' : '0 4px 16px 0 #4caf5099', transform: 'scale(1.03)' } }}>
            <InputLabel>Breed</InputLabel>
            <Select
              multiple
              value={breedMulti.length ? breedMulti : (breed === 'All' ? [] : [breed])}
              onChange={e => setBreedMulti(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              renderValue={selected => selected.length ? selected.join(', ') : 'All'}
              startAdornment={<InputAdornment position="start"><PetsIcon fontSize="small" /></InputAdornment>}
            >
              {getUniqueBreeds(pets).map(b => (
                <MenuItem key={b} value={b}>{b}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <FormControl fullWidth sx={{ background: darkMode ? 'rgba(30,32,34,0.98)' : '#fff', borderRadius: 2, boxShadow: darkMode ? '0 2px 8px 0 #23252633' : '0 2px 8px 0 #4caf5033', transition: 'box-shadow 0.3s, transform 0.3s', '&:hover, &:focus-within': { boxShadow: darkMode ? '0 4px 16px 0 #43cea299' : '0 4px 16px 0 #4caf5099', transform: 'scale(1.03)' } }}>
            <InputLabel>Size</InputLabel>
            <Select
              multiple
              value={sizeMulti.length ? sizeMulti : (size === 'All' ? [] : [size])}
              onChange={e => setSizeMulti(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              renderValue={selected => selected.length ? selected.join(', ') : 'All'}
              startAdornment={<InputAdornment position="start"><StraightenIcon fontSize="small" /></InputAdornment>}
            >
              {getUniqueSizes(pets).map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <FormControl fullWidth sx={{ background: darkMode ? 'rgba(30,32,34,0.98)' : '#fff', borderRadius: 2, boxShadow: darkMode ? '0 2px 8px 0 #23252633' : '0 2px 8px 0 #4caf5033', transition: 'box-shadow 0.3s, transform 0.3s', '&:hover, &:focus-within': { boxShadow: darkMode ? '0 4px 16px 0 #43cea299' : '0 4px 16px 0 #4caf5099', transform: 'scale(1.03)' } }}>
            <InputLabel>Age</InputLabel>
            <Select value={age} label="Age" onChange={e => setAge(e.target.value)} startAdornment={<InputAdornment position="start"><CakeIcon fontSize="small" /></InputAdornment>}>
              {getUniqueAges(pets).map(a => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <FormControl fullWidth sx={{ background: darkMode ? 'rgba(30,32,34,0.98)' : '#fff', borderRadius: 2, boxShadow: darkMode ? '0 2px 8px 0 #23252633' : '0 2px 8px 0 #4caf5033', transition: 'box-shadow 0.3s, transform 0.3s', '&:hover, &:focus-within': { boxShadow: darkMode ? '0 4px 16px 0 #43cea299' : '0 4px 16px 0 #4caf5099', transform: 'scale(1.03)' } }}>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={e => setGender(e.target.value)} startAdornment={<InputAdornment position="start"><WcIcon fontSize="small" /></InputAdornment>}>
              {getUniqueGenders(pets).map(g => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <FormControl fullWidth sx={{ background: darkMode ? 'rgba(30,32,34,0.98)' : '#fff', borderRadius: 2, boxShadow: darkMode ? '0 2px 8px 0 #23252633' : '0 2px 8px 0 #4caf5033', transition: 'box-shadow 0.3s, transform 0.3s', '&:hover, &:focus-within': { boxShadow: darkMode ? '0 4px 16px 0 #43cea299' : '0 4px 16px 0 #4caf5099', transform: 'scale(1.03)' } }}>
            <InputLabel>Status</InputLabel>
            <Select value={status} label="Status" onChange={e => setStatus(e.target.value)} startAdornment={<InputAdornment position="start"><CheckCircleIcon fontSize="small" /></InputAdornment>}>
              {getUniqueStatuses(pets).map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <Button onClick={clearAllFilters} variant="outlined" color="primary" fullWidth startIcon={<FilterAltIcon />} sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, boxShadow: darkMode ? '0 2px 8px 0 #23252633' : '0 2px 8px 0 #4caf5033', background: darkMode ? 'rgba(30,32,34,0.98)' : '#fff', letterSpacing: 1, transition: 'box-shadow 0.3s, transform 0.3s', '&:hover, &:focus': { boxShadow: darkMode ? '0 4px 16px 0 #43cea299' : '0 4px 16px 0 #4caf5099', transform: 'scale(1.03)' } }}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3, mb: 1, height: 3, border: 'none', background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', opacity: 0.18, borderRadius: 2 }} />
      {/* Active filter chips */}
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {search && <Chip label={`Search: ${search}`} onDelete={() => setSearch('')} color="primary" />}
        {type !== 'All' && <Chip label={`Type: ${type}`} onDelete={() => setType('All')} color="primary" />}
        {breedMulti.length > 0 && breedMulti.map(b => <Chip key={b} label={`Breed: ${b}`} onDelete={() => setBreedMulti(breedMulti.filter(x => x !== b))} color="primary" />)}
        {sizeMulti.length > 0 && sizeMulti.map(s => <Chip key={s} label={`Size: ${s}`} onDelete={() => setSizeMulti(sizeMulti.filter(x => x !== s))} color="primary" />)}
        {age !== 'All' && <Chip label={`Age: ${age}`} onDelete={() => setAge('All')} color="primary" />}
        {gender !== 'All' && <Chip label={`Gender: ${gender}`} onDelete={() => setGender('All')} color="primary" />}
        {status !== 'All' && <Chip label={`Status: ${status}`} onDelete={() => setStatus('All')} color="primary" />}
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ py: 4, px: 0, background: darkMode ? 'linear-gradient(135deg, #232526 0%, #414345 100%)' : 'none', minHeight: '100vh' }}>
      {currentUser && currentUser.email === 'admin@petadopt.com' && (
        <Button onClick={restoreAllPets} variant="outlined" color="primary" sx={{ mb: 2 }}>
          Restore All Pets
        </Button>
      )}
      {/* Filter Panel: Collapsible on mobile, sticky on desktop */}
      <Box sx={{ mb: 3, display: { xs: 'block', md: 'none' } }}>
        <Button onClick={() => setFilterOpen(o => !o)} variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
          {filterOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
          {filterPanel}
        </Collapse>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>{filterPanel}</Box>
      
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h1" 
          sx={{ 
            mb: 2,
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            background: darkMode ? 'linear-gradient(45deg, #43cea2, #185a9d)' : 'linear-gradient(45deg, #4CAF50, #45a049)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          🐾 Meet Our Adorable Pets
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: darkMode ? '#b0bec5' : 'text.secondary',
            fontWeight: 400,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Browse pets ready for adoption and find your perfect companion!
        </Typography>
      </Box>
      
      {/* Results Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Showing {filteredPets.length} of {pets.length} pets
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Page {currentPage} of {totalPages}
        </Typography>
      </Box>

      {/* Pets Grid */}
      <Container maxWidth="lg" sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Grid container spacing={2} justifyContent="center">
          {currentPets.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', mt: 6, py: 8 }}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/616/616408.png" 
                  alt="No pets" 
                  style={{ width: 120, opacity: 0.5 }} 
                />
                <Typography variant="h5" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
                  No pets found
                </Typography>
                <Typography color="text.secondary">
                  Try adjusting your search criteria or filters
                </Typography>
              </Box>
            </Grid>
          ) : (
            currentPets.map(pet => (
              <Grid item key={pet.id} xs={12} sm={6} md={6} lg={6} xl={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    height: 600,
                    width: 370,
                    maxWidth: 370,
                    minWidth: 260,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
                    borderRadius: 5,
                    overflow: 'hidden',
                    border: '2px solid #e0e0e0',
                    '&:hover': {
                      transform: 'scale(1.035)',
                      boxShadow: '0 12px 40px rgba(76,175,80,0.18)',
                      borderColor: '#4CAF50',
                    },
                  }}
                >
                  {/* Favorite Button */}
                  <IconButton
                    onClick={() => handleFavorite(pet.id)}
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      zIndex: 2, 
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)',
                      }
                    }}
                    aria-label={favorites.includes(pet.id) ? `Remove ${pet.name} from favorites` : `Add ${pet.name} to favorites`}
                  >
                    {favorites.includes(pet.id) ? 
                      <StarIcon sx={{ color: '#FFD700' }} /> : 
                      <StarBorderIcon sx={{ color: '#666' }} />
                    }
                  </IconButton>
                  
                  {/* Status Badge */}
                  {pet.adopted && (
                    <Chip 
                      label="Adopted" 
                      color="error" 
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        left: 8, 
                        zIndex: 2,
                        fontWeight: 600
                      }} 
                    />
                  )}
                  
                  {/* New Badge */}
                  {pet.id <= 5 && (
                    <Chip 
                      icon={<NewReleasesIcon />}
                      label="New" 
                      color="primary" 
                      sx={{ 
                        position: 'absolute', 
                        top: pet.adopted ? 50 : 8, 
                        left: 8, 
                        zIndex: 2,
                        fontWeight: 600
                      }} 
                    />
                  )}
                  
                  {/* Pet Image */}
                  <Link to={`/pets/${pet.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={pet.image}
                      alt={`Photo of ${pet.name}`}
                      sx={{ 
                        objectFit: 'cover', 
                        borderRadius: '0 0 18px 18px',
                        boxShadow: '0 4px 18px rgba(76,175,80,0.10)'
                      }}
                    />
                  </Link>
                  
                  {/* Pet Information */}
                  <CardContent sx={{ flexGrow: 1, p: 1 }}>
                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '1.1rem' }}>
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem', mb: 0.5 }}>
                      {pet.breed} • {pet.age}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.92rem', mb: 1, minHeight: 36 }}>
                      {pet.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/pets/${pet.id}`}
                      variant="contained"
                      fullWidth
                      disabled={pet.adopted}
                      sx={{
                        background: pet.adopted ? 
                          'linear-gradient(45deg, #ccc, #999)' : 
                          'linear-gradient(45deg, #4CAF50, #45a049)',
                        borderRadius: '20px',
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        mt: 1,
                        color: pet.adopted ? '#666' : '#fff',
                        '&:hover': {
                          background: pet.adopted ? 
                            'linear-gradient(45deg, #ccc, #999)' : 
                            'linear-gradient(45deg, #45a049, #4CAF50)',
                          transform: pet.adopted ? 'none' : 'translateY(-2px)'
                        }
                      }}
                    >
                      {pet.adopted ? 'Unavailable' : 'View Profile'}
                    </Button>
                    {currentUser && currentUser.email === 'admin@petadopt.com' && (
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => handleDeletePet(pet.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton 
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default Pets;

<style>{`
@keyframes fadeInPanel {
  from { opacity: 0; transform: translateY(24px) scale(0.98); }
  to { opacity: 1; transform: none; }
}
`}</style> 