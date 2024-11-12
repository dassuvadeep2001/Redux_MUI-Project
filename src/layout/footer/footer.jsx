import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import PaletteIcon from '@mui/icons-material/Palette';

function Footer() {
  return (
    <>
    <Box sx={{ height: '0.5px', backgroundColor: '#024CAA' }} />
      {/* First Footer Section: Logo, Social Media, and Navigation Links */}
      <Box sx={{ backgroundColor: 'white', p: 4 }}>
        <Grid container justifyContent="center" spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      height: 50, // Adjust size based on screen
      width: 'auto',
    }}
  />
</Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton aria-label="Facebook" href="https://facebook.com" target="_blank" sx={{ color: '#024CAA' }}>
              <Facebook />
            </IconButton>
            <IconButton aria-label="Twitter" href="https://twitter.com" target="_blank" sx={{ color: '#024CAA' }}>
              <Twitter />
            </IconButton>
            <IconButton aria-label="Instagram" href="https://instagram.com" target="_blank" sx={{ color: '#024CAA' }}>
              <Instagram />
            </IconButton>
            <IconButton aria-label="LinkedIn" href="https://linkedin.com" target="_blank" sx={{ color: '#024CAA' }}>
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>

        {/* Navigation Links */}
        <Grid container justifyContent="center" spacing={3}>
          <Grid item>
            <Link href="#" underline="none" sx={{ color: '#024CAA' }}>
              DISCLAIMER
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" underline="none" sx={{ color: '#024CAA' }}>
              PRIVACY POLICY
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" underline="none" sx={{ color: '#024CAA' }}>
              TERMS & CONDITIONS
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" underline="none" sx={{ color: '#024CAA' }}>
              OFFERS & DISCOUNTS
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" underline="none" sx={{ color: '#024CAA' }}>
              GET COUPON
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* Second Footer Section: Copyright */}
      <Box sx={{ backgroundColor: '#024CAA', py: 2 }}>
        <Typography variant="body2" align="center" sx={{ color: 'white' }}>
          © {new Date().getFullYear()} GALLERIST. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

export default Footer;
