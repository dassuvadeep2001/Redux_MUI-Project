import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Avatar, Typography, ListItemText, Button, Grid, Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { fetchArtists } from '../../slice/artistslice/artistslice';
import { additem } from '../../slice/cartSlice/cartslice';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../../user/login/login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ArtistGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artists } = useSelector((state) => state.artist);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true); 
  };
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false); 
  };
  const handleAddToCart = (painting) => {
    if (painting && userId) {
      dispatch(additem(painting)); // Add the selected painting to the cart
      navigate(`/cart`); // Navigate to the cart page
    }
    else{
      handleOpenLoginModal();
    }
  };

  const userId = localStorage.getItem('userId');
    console.log(userId);


  return (
    <Container maxWidth="xl" sx={{ my: 6 }}>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, color: "#006064" }}>
          Masters & Masterpieces: A Curated Tribute to Timeless Artistry
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          Step into the world of "Gallerist," where we celebrate the visionaries who have shaped the art world as we know it. Our "Top 10 Artists & Their Iconic Works" feature offers an immersive journey through history's most celebrated painters and their masterpieces.
        </Typography>
      </Box>

      <Carousel autoPlay animation="fade">
        {artists.map((artist, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: 2,
              p: 4,
              mb: 4,
              textAlign: 'center',
            }}
          >
            {/* Top Section - Artist Image, Name, and Bio */}
            <Avatar
              src={artist.image}
              alt={artist.name}
              sx={{
                width: 150,
                height: 150,
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography variant="h5" color="primary" gutterBottom>
              {artist.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, px: { xs: 2, md: 6 } }}>
              {artist.bio}
            </Typography>

            {/* Paintings Section */}
            <Typography variant="subtitle1" fontWeight="bold" color="secondary" gutterBottom sx={{mb:3}}>
              Top Paintings:
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {artist.topPaintings && artist.topPaintings.map((painting, i) => (
                <Grid item xs={12} sm={6} md={2.4} key={i}>
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: "#5FBDFF",
                      borderRadius: 1
                    }}
                  >
                    <Box
                      component="img"
                      src={painting.image}
                      alt={painting.title}
                      sx={{
                        width: '100%',
                        height: "300px",
                        objectFit: 'cover',
                        borderRadius: 1,
                        mb: 1,
                        transition: 'transform 0.8s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <ListItemText
                      primary={painting.title}
                      primaryTypographyProps={{ variant: 'body1', textAlign: 'center' }}
                      secondary={`Price: $${painting.price}`}
                      secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary', textAlign: 'center' }}
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        onClick={() => handleAddToCart(painting)}
                        variant="contained" 
                        size="small" 
                        sx={{
                          fontSize: '0.8rem',
                          padding: '5px 10px',
                          bgcolor: "#121481", 
                        }}
                        endIcon={<ShoppingCartIcon />}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Carousel>
      <LoginPage open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Container>
  );
};

export default ArtistGallery;






