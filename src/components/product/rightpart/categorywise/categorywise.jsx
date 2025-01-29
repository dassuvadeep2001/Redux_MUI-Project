// components/ArtByCategory.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Grid, Paper, Typography, Box, Modal, IconButton, Menu, MenuItem } from '@mui/material';
import { deleteArt, fetchArtByType } from '../../../../slice/artworkslice/artslice/artslice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import DeleteIcon from '@mui/icons-material/Delete';
import { additem } from '../../../../slice/cartSlice/cartslice';
import LoginPage from '../../../../user/login/login';

const ArtByCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { type } = useParams();
    const { art, artpageStatus, artpageError } = useSelector((state) => state.art);
    const { cart } = useSelector((state) => state.cart); // Access cart items from Redux store

    const [open, setOpen] = useState(false);
    const [selectedArt, setSelectedArt] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortedArt, setSortedArt] = useState([]);
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('Username');

    useEffect(() => {
        if (type) {
            dispatch(fetchArtByType(type));
        }
    }, [dispatch, type]);

    useEffect(() => {
        setSortedArt([...art]);
    }, [art]);

    const handleOpen = (artItem) => {
        setSelectedArt(artItem);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedArt(null);
    };

    const handleOpenLoginModal = () => setIsLoginModalOpen(true);
    const handleCloseLoginModal = () => setIsLoginModalOpen(false);

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

    const handleSortClick = (event) => setAnchorEl(event.currentTarget);
    const handleSortClose = () => setAnchorEl(null);

    const sortTimeout = useRef(null); // Ref for debouncing sorting
    const handleSort = (type) => {
        if (sortTimeout.current) {
            clearTimeout(sortTimeout.current); // Clear the previous timeout if it exists
        }

        sortTimeout.current = setTimeout(() => {
            let sorted = [];
            if (type === 'az') {
                sorted = [...art].sort((a, b) => a.name.localeCompare(b.name));
            } else if (type === 'lowToHigh') {
                sorted = [...art].sort((a, b) => a.price - b.price);
            } else if (type === 'highToLow') {
                sorted = [...art].sort((a, b) => b.price - a.price);
            }
            setSortedArt(sorted);
            handleSortClose();
        }, 1000); // Delay execution by 300ms
    };

    if (artpageStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (artpageStatus === 'failed') {
        return <div>Error: {artpageError}</div>;
    }

    const isItemInCart = selectedArt && cart.some((item) => item.id === selectedArt.id); // Check if item is in the cart

    return (
        <Container maxWidth="lg" sx={{ mb: 5, mt:6 }}>
          <Link to="/artwork" style={{ textDecoration: 'underline', color: "#006064", mx: "auto", display: "flex", justifyContent: "center" }}>
          See All Artworks
        </Link>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ my: 4, color: "#006064", textAlign: "center" }}>{type}</Typography>
            <Button
          variant="text"
          color="primary"
          onClick={handleSortClick}
          endIcon={<SortIcon />}
        >
          Filter
        </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleSortClose}
                >
                    <MenuItem onClick={() => handleSort('az')}>A-Z wise</MenuItem>
                    <MenuItem onClick={() => handleSort('lowToHigh')}>Price low-high</MenuItem>
                    <MenuItem onClick={() => handleSort('highToLow')}>Price high-low</MenuItem>
                </Menu>
            </Box>
            <Grid container spacing={2}>
                {sortedArt.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Paper elevation={3} sx={{ padding: 2, boxShadow: "3px 3px 8px grey", backgroundColor: "#87A2FF" }}>
                            <Typography variant="h6" sx={{ mb: 2, color: "white" }}>{item.name}</Typography>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '300px' }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
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
                            {isItemInCart ? (
                  <>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body2" sx={{ mt: 2, color: "red" }}>
                      This product is already in your cart.
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/cart')}
                      endIcon={<ShoppingCartIcon />}
                    >
                      Go to Cart
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
                </Box>
                  </>
                ) : (
                 <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
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
                )}
                        </>
                    )}
                </Box>
            </Modal>
            <LoginPage open={isLoginModalOpen} onClose={handleCloseLoginModal} />
        </Container>
    );
};

export default ArtByCategory;
