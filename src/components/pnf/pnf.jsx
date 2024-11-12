import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function PageNotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="auto"
        textAlign="center"
        my="50px"
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: '#FF1744', mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 3, color: '#555' }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#777' }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to="/"
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default PageNotFound;
