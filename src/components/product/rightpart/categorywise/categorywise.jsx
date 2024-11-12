// components/ArtByCategory.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Grid, Paper, Typography, Box, Modal } from '@mui/material';
import { deleteArt, fetchArtByType } from '../../../../slice/artworkslice/artslice/artslice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { additem } from '../../../../slice/cartSlice/cartslice';
import LoginPage from '../../../../user/login/login';
import DeleteIcon from '@mui/icons-material/Delete';

const ArtByCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { type } = useParams(); // Get the category type from URL
    const { art, artpageStatus, artpageError } = useSelector((state) => state.art);

      // State to control modal visibility and selected artwork
  const [open, setOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 

    useEffect(() => {
        if (type) {
            dispatch(fetchArtByType(type));
        }
    }, [dispatch, type]);

    // Handle modal open
  const handleOpen = (artItem) => {
    setSelectedArt(artItem);
    setOpen(true);
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
    setSelectedArt(null);
  };

    if (artpageStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (artpageStatus === 'failed') {
        return <div>Error: {artpageError}</div>;
    }

    const handleOpenLoginModal = () => {
      setIsLoginModalOpen(true); 
    };
    const handleCloseLoginModal = () => {
      setIsLoginModalOpen(false); 
    };

    const handleAddToCart = () => {
      if (selectedArt && userId) {
        dispatch(additem(selectedArt)); // Add the selected art to the cart
        navigate(`/cart`); // Navigate to the cart page
      }
      else{
        handleOpenLoginModal();
      }
    };
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('Username');
    // Define the delete function
  const handleDelete = (artId) => {
    dispatch(deleteArt(artId))
      .then((res) => {
        if (res.payload.status === 200) {
          console.log("Artwork deleted successfully");
        } else {
          console.warn("Failed to delete artwork");
        }
      })
      .catch((err) => console.error("Error deleting artwork:", err));
  };
    return (
        <Container maxWidth="lg" sx={{mb: 5}}>
        <Link to="/artwork" style={{ textDecoration: 'underline', color: "#006064", mx: "auto", display: "flex", justifyContent: "center" }}>
          See All Artworks
        </Link>
        <Typography variant="h4" sx={{ my: 4, color: "#006064", textAlign: "center" }}>{type}</Typography>
        <Grid container spacing={2}>
          {art.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper elevation={3} sx={{ padding: 2, boxShadow: "3px 3px 8px grey", backgroundColor: "#87A2FF" }}>
                <Typography variant="h6"  sx={{ mb: 2, color: "white" }}>{item.name}</Typography>
                <img src={item.image} alt={item.name} style={{  width: '100%', height: '300px' }} />
                <Box sx={{display: "flex", justifyContent:"space-between", flexDirection: "row", alignItems:"center"}}>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2, color: "white", border:"2px solid white" }}
                                    onClick={() => handleOpen(item)}
                                >
                                    See Details
                                </Button>
                                {username === item.username && (
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleDelete(item.id)} // Pass the art item ID to delete function
                  startIcon={<DeleteIcon />}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              )}
              </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/* Modal for artwork details */}
      <Modal open={open} onClose={handleClose} aria-labelledby="art-details-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 100,
            p: 4,
          }}
        >
          {selectedArt && (
            <>
              <Typography id="art-details-title" variant="h6" sx={{ mb: 1, color: "#006064" }}>
                {selectedArt.name} 
              </Typography>
              <img src={selectedArt.image} alt={selectedArt.name} style={{ width: '100%', height: '100%', marginBottom: '15px', border: "2px solid black", borderRadius: "10px" }} />
              <Typography variant="body1" sx={{ mb: 1, color: "#006064" }}>
                Painting Category: {selectedArt.type} 
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {selectedArt.about}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Price: ${selectedArt.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Painting by {selectedArt.username}
              </Typography>
              <span style={{display: "flex", justifyContent: "space-between"}}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                endIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{ mt: 2 }}
                endIcon={<CloseIcon />}
              >
                Close
              </Button>
              </span>
            </>
          )}
        </Box>
      </Modal>
      <LoginPage open={isLoginModalOpen} onClose={handleCloseLoginModal} />
      </Container>
    );
};

export default ArtByCategory;
