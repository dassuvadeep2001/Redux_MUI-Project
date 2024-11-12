import React from 'react';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';

const ServicePage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Container maxWidth="xl">
      {/* Artwork Sales and Purchasing Section */}
      <Typography variant="h4" sx={{ my: 4, color: '#006064', textAlign: 'center' }}>
            Service We Provide..
          </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          p: 4,
          mt: 2,
        }}
      >
        <Box
          component="img"
          src="image/servicepage1.jpg" // Replace with actual image URL
          alt="Artwork Sales and Purchasing"
          sx={{
            width: isMobile ? '90%' : '40%',
            height: 'auto',
            borderRadius: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            m: isMobile ? 2 : 0,
          }}
        />
        <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left', ml: isMobile ? 0 : 7 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#006064' }}>
            Artwork Sales and Purchasing
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          At Gallerist, we provide a seamless platform for art enthusiasts and collectors to buy original artworks directly from talented artists and reputable galleries. Our service prioritizes secure transactions, ensuring that both buyers and sellers can engage in trades with confidence. With a diverse range of unique pieces spanning various styles and mediums, our marketplace caters to all tastes and preferences. Gallerist is committed to fostering a vibrant community of artists and art lovers, bridging the gap between creators and collectors. We offer detailed listings for each artwork, including artist bios, dimensions, and pricing information, helping buyers make informed decisions. Additionally, our user-friendly interface allows for easy navigation, enabling users to discover new arrivals and hidden gems effortlessly. Whether you are looking to expand your collection or find the perfect piece for your home, Gallerist is your trusted destination for all things art.
          </Typography>
        </Box>
      </Box>

      {/* Virtual Art Exhibitions Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row-reverse',
          alignItems: 'center',
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          p: 4,
        }}
      >
        <Box
          component="img"
          src="image/servicepage2.jpg" // Replace with actual image URL
          alt="Virtual Art Exhibitions"
          sx={{
            width: isMobile ? '90%' : '40%',
            height: 'auto',
            borderRadius: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            m: isMobile ? 2 : 0,
          }}
        />
        <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left', mr: isMobile ? 0 : 7 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>
            Virtual Art Exhibitions
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'white' }}>
          At Gallerist, we bring the immersive experience of art exhibitions directly to you through our Virtual Art Exhibitions service. This unique feature allows art enthusiasts to explore curated collections from renowned artists and emerging talents, all from the comfort of their own space. Each virtual exhibition is meticulously crafted to replicate a gallery-like atmosphere, with high-definition visuals and interactive layouts that allow viewers to engage deeply with each piece. Accessible on any device, these exhibitions cater to both casual art lovers and serious collectors, making it easy to explore and appreciate art from anywhere in the world.
          The virtual exhibitions at Gallerist are updated frequently to showcase the latest trends and themes, as well as exclusive collections and seasonal highlights. Each exhibit is accompanied by artist insights, details on the pieces, and information on purchasing or viewing the works in person if desired. Our Virtual Art Exhibitions bridge the gap between artists and audiences, providing an innovative, accessible, and inspiring way to experience art.
          </Typography>
        </Box>
      </Box>

      {/* Artist Profiles and Portfolios Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          p: 4,
        }}
      >
        <Box
          component="img"
          src="image/servicepage3.png" // Replace with actual image URL
          alt="Artist Profiles and Portfolios"
          sx={{
            width: isMobile ? '90%' : '40%',
            height: 'auto',
            borderRadius: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            m: isMobile ? 2 : 0,
          }}
        />
        <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left', ml: isMobile ? 0 : 7 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#006064' }}>
            Artist Profiles and Portfolios
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          At Gallerist, our Drawing and Photography Artist Profiles and Portfolios service offers art enthusiasts an in-depth exploration of talented creators behind captivating works. Each profile showcases the unique style, artistic journey, and inspiration of artists specializing in drawing and photography. Visitors can browse through high-resolution images of their artworks, along with insightful descriptions that highlight techniques, themes, and personal stories. By connecting with artists on a more personal level, collectors and art lovers gain a deeper appreciation for the creativity and effort that goes into each piece. Additionally, artists can leverage this platform to build their brand and reach a wider audience, fostering meaningful relationships with potential buyers. With Gallerist, discover a diverse array of artists and immerse yourself in the vibrant world of drawing and photography, enhancing your collection with original pieces that resonate with your aesthetic sensibilities.
          </Typography>
        </Box>
      </Box>

      {/* Art Valuation and Appraisal Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row-reverse',
          alignItems: 'center',
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          p: 4,
          mb: 4,
        }}
      >
        <Box
          component="img"
          src="image/servicepage4.jpg" // Replace with actual image URL
          alt="Art Valuation and Appraisal"
          sx={{
            width: isMobile ? '90%' : '40%',
            height: 'auto',
            borderRadius: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            m: isMobile ? 2 : 0,
          }}
        />
        <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left', mr: isMobile ? 0 : 7 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>
            Art Valuation and Appraisal
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: 'white' }}>
          At Gallerist, our Art Valuation and Appraisal service is dedicated to helping both buyers and sellers navigate the complex world of art investment. We provide expert assessments that evaluate the worth of artworks based on various factors, including provenance, condition, market trends, and artistic significance. Our team of experienced appraisers understands the nuances of the art market, ensuring accurate valuations that reflect current demand and potential future appreciation. Whether you're a collector looking to sell your pieces or a buyer seeking to understand the investment potential of a work, our comprehensive appraisals equip you with the knowledge needed to make informed decisions. With Gallerist, you can trust that your art is valued fairly and transparently, empowering you to engage confidently in the art marketplace. Explore the possibilities of art investment with our professional appraisal services, and let us help you unlock the true value of your collection.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ServicePage;

