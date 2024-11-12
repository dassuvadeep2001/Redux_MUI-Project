import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PaletteIcon from '@mui/icons-material/Palette';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from '../../user/login/login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchArtCategories } from '../../slice/artworkslice/categoryslice/categoryslice';
import SearchIcon from '@mui/icons-material/Search';

const primaryPages = [
  { name: "The Creator's Market", path: '/sell' },
  { name: 'Blogs', path: '/blogs' },
];

const secondaryPages = [
  { name: 'About Us', path: '/about' },
  { name: 'Service', path: '/service' },
  { name: 'Artist', path: '/artist' },
  { name: 'Artwork', path: '/artwork' },
  { name: 'Testimonials', path: '/review' },
  { name: 'Contact Us', path: '/contact' },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const isLargeScreen = useMediaQuery('(min-width:900px)'); 
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user); // Access user info from Redux

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true); 
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false); 
  };

    const storedUserId = localStorage.getItem('userId');
    console.log(storedUserId);
    const storedUserImage = localStorage.getItem('userImage');
    console.log(storedUserImage);

  const handleOpenProfile = () => {
    if (storedUserId===null) {
      // Navigate to the home page if userId is not present
      navigate('/');
    } else {
       // Navigate to the profile page if userId is present
       navigate(`/profile/${storedUserId}`);
    }
  };

  const { categories } = useSelector((state) => state.category);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArtCategories());
  }, [dispatch]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.type); // Set selected category in the search field
    setAnchorEl(null);
  };

  const handleSearch = () => {
    if (selectedCategory) {
      navigate(`/artwork/${selectedCategory}`);
    }
  };

  return (
    <>
      {/* First Navbar */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#024CAA', 
          color: 'white',
          textAlign: 'center',
          py: 1,
          top: 0,
          zIndex: 1000, 
        }}
      >
        <Typography variant="body1" sx={{
          fontSize: { xs: '0.5rem', sm: '0.75rem', md: '1rem', lg: '1.05rem' },
        }}>
          7% off on min purchase of ₹5,000. Use coupon code: ArtFestival
        </Typography>
      </Box>

      {/* Second Navbar */}
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box
  component="a"
  href="/"
  sx={{
    display: 'flex',
    alignItems: 'center',
    mr: 2,
    my: 1,
    textDecoration: 'none',
  }}
>
  <Box
    component="img"
    src="image/2.png" // Replace with your logo image path
    alt="Gallerist Logo"
    sx={{
      height: { xs: '15px', sm: '30px', md: '45px', lg: '50px' }, // Adjust size based on screen
      width: 'auto',
    }}
  />
</Box>

             {/* Search Field */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search by category"
              size="small"
              value={selectedCategory}
              onClick={handleMenuClick}
              sx={{
                mr: 1,
                width: { xs: '80px', sm: '200px', md: '300px', lg: '500px' },
              }}
            />
            <IconButton onClick={handleSearch} color="primary">
              <SearchIcon sx={{fontSize:{ xs: '0.75rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' }}} />
            </IconButton>
          </Box>

          {/* Dropdown Menu for Categories */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} onClick={() => handleCategorySelect(category)}>
                {category.type}
              </MenuItem>
            ))}
          </Menu>


            {/* Primary Navigation Links (desktop only) */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {primaryPages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  sx={{ my: 2, color: '#024CAA', mr: 3 }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Conditional Rendering for Login/Signup or Avatar */}
            {storedUserId && storedUserImage ? (
              <>
               <Button
      component={Link}
      to="/cart"
      endIcon={<ShoppingCartIcon />}
      sx={{
        color: '#024CAA',
        mr: {sm: 0, md: 2},
      }}
    >
      {isLargeScreen ? 'Cart' : null} {/* Show text only on larger screens */}
    </Button>
              <Tooltip title="Account settings">
                <IconButton onClick={handleOpenProfile} sx={{ p: 0 }}>
                  <Avatar alt="User Profile" src={storedUserImage} />
                </IconButton>
              </Tooltip>
              </>
            ) : isLargeScreen ? (
              <Box>
                <Button onClick={handleOpenLoginModal} sx={{ color: '#024CAA', mr: 1 }}>
                  Sign In
                </Button>
                <Button component={Link} to="/signup" sx={{ color: 'white', backgroundColor: '#024CAA' }}>
                  Sign Up
                </Button>
              </Box>
            ) : (
              // Mobile Avatar Icon
              <Box sx={{ flexGrow: 0 }}>
  {storedUserImage ? (
    // Show the user image (avatar) if logged in
    <>
    <Button
      component={Link}
      to="/cart"
      endIcon={<ShoppingCartIcon />}
      sx={{
        color: '#024CAA',
      }}
    >
      {isLargeScreen ? 'Cart' : null} {/* Show text only on larger screens */}
    </Button>
    <Tooltip title="Account settings">
      <IconButton onClick={handleOpenProfile} sx={{ p: 0 }}>
        <Avatar alt="User Profile" src={storedUserImage} />
      </IconButton>
    </Tooltip>
    </>
  ) : (
    // Show the menu icon for login/signup options if not logged in
    <Tooltip title="Account settings">
      <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
        <AccountCircleIcon />
      </IconButton>
    </Tooltip>
  )}
  <Menu
    anchorEl={anchorElUser}
    open={Boolean(anchorElUser)}
    onClose={handleCloseUserMenu}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    {storedUserId ? (
      <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
    ) : (
      <Box>
        <MenuItem onClick={handleOpenLoginModal}>Sign In</MenuItem>
        <MenuItem component={Link} to="/signup" onClick={handleCloseUserMenu}>
          Sign Up
        </MenuItem>
      </Box>
    )}
  </Menu>
</Box>
            )}

            {/* Mobile Menu Icon for Combined Navigation Links */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="open menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: '#024CAA' }} />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {[...primaryPages, ...secondaryPages].map((page) => (
                  <MenuItem key={page.name} component={Link} to={page.path} onClick={handleCloseNavMenu}>
                    {page.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>

        {/* Secondary Navbar */}
        <Container maxWidth="xl" sx={{ backgroundColor: 'white', display: { xs: 'none', md: 'flex' } }}>
          <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
            {secondaryPages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: '#024CAA', mx: 1 }}
              >
                {page.name}
              </Button>
            ))}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Login Modal */}
      <LoginPage open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </>
  );
}

export default Header;









