import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, MenuItem, Menu, IconButton } from '@mui/material';
import { fetchArtCategories } from '../../../slice/artworkslice/categoryslice/categoryslice';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const ArtCategoryList = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchArtCategories());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ padding: 2 }}>
      <IconButton
        sx={{ display: 'block' }} // Show on all screens
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} onClick={handleMenuClose}>
            <Link to={`/artwork/${category.type}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {category.type}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default ArtCategoryList;

