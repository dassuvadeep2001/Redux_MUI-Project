import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Grid, Paper, Button, Modal, Box, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';
import { fetchArt, deleteArt } from '../../../slice/artworkslice/artslice/artslice';
import { useNavigate } from 'react-router-dom';
import { additem } from '../../../slice/cartSlice/cartslice';
import LoginPage from '../../../user/login/login';

const ArtworkGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { art, artpageStatus, artpageError } = useSelector((state) => state.art);

  const [open, setOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortedArt, setSortedArt] = useState([]);
  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(art.length / itemsPerPage);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('Username');

  useEffect(() => {
    dispatch(fetchArt());
  }, [dispatch]);

  useEffect(() => {
    setSortedArt([...art]); // Initialize sorted art list
  }, [art]);

  const handleOpen = (artItem) => {
    setSelectedArt(artItem);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArt(null);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true); 
  };
  
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false); 
  };

  const handleAddToCart = () => {
    if (selectedArt && userId) {
      dispatch(additem(selectedArt));
      navigate(`/cart`);
    } else {
      handleOpenLoginModal();
    }
  };

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

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const sortByAZ = () => {
    const sorted = [...sortedArt].sort((a, b) => a.name.localeCompare(b.name));
    setSortedArt(sorted);
    handleSortClose();
  };

  const sortByPriceLowHigh = () => {
    const sorted = [...sortedArt].sort((a, b) => a.price - b.price);
    setSortedArt(sorted);
    handleSortClose();
  };

  const sortByPriceHighLow = () => {
    const sorted = [...sortedArt].sort((a, b) => b.price - a.price);
    setSortedArt(sorted);
    handleSortClose();
  };

  if (artpageStatus === 'loading') {
    return <Typography variant="h6">Loading artwork...</Typography>;
  }

  if (artpageStatus === 'failed') {
    return <Typography variant="h6" color="error">{artpageError}</Typography>;
  }

  const currentArtworks = sortedArt.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 5, mt:6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Typography variant="h4" sx={{ color: "#006064", textAlign: "center" }}>Artwork Gallery</Typography>
        <Button
          variant="text"
          color="primary"
          onClick={handleSortClick}
          endIcon={<SortIcon />}
        >
          Filter
        </Button>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem onClick={sortByAZ}>A-Z</MenuItem>
          <MenuItem onClick={sortByPriceLowHigh}>Price: Low to High</MenuItem>
          <MenuItem onClick={sortByPriceHighLow}>Price: High to Low</MenuItem>
        </Menu>
      </Box>
      <Grid container spacing={2}>
        {currentArtworks.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper elevation={3} sx={{ padding: 2, boxShadow: "3px 3px 8px grey", backgroundColor: "#87A2FF" }}>
              <Typography variant="h6" sx={{ mb: 2, color: "white" }}>{item.name}</Typography>
              <Typography variant="body1">{item.description}</Typography>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '300px' }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  sx={{ mt: 2, color: "white", border: "2px solid white" }}
                  onClick={() => handleOpen(item)}
                >
                  See Details
                </Button>
                
                {username === item.username && (
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(item.id)} 
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography variant="h6" sx={{ mx: 2, textAlign: "center" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>

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
            boxShadow: 24,
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <LoginPage open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Container>
  );
};

export default ArtworkGallery;
