import React from 'react';
import { Box, Typography, useMediaQuery, Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import StarIcon from '@mui/icons-material/Star';
import FacebookIcon from '@mui/icons-material/Facebook';
import TrustpilotIcon from '@mui/icons-material/VerifiedUser'; // Replace with appropriate icon
import GoogleIcon from '@mui/icons-material/Google'; // Replace with appropriate icon

const AboutPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const whyChooseGallerist = [
    {
      title: "Expert Appraisals",
      description: "At Gallerist, we offer professional art valuation and appraisal services to help you understand the true worth of your artwork. Our experienced appraisers provide detailed assessments, ensuring accurate pricing for sellers and valuable insights for buyers. Trust us to guide you in making informed art investment decisions.",
      image: "image/about1.png", // Replace with actual image URL
    },
    {
      title: "Wide Selection",
      description: "Gallerist boasts a vast collection of original artworks, ranging from contemporary pieces to classic masterpieces. Our platform features various styles, mediums, and themes, ensuring that every art lover can find something unique that resonates with their personal taste. Explore our extensive inventory and discover your next favorite piece!",
      image: "image/about2.png", // Replace with actual image URL
    },
    {
      title: "Secure Transactions",
      description: "At Gallerist, we prioritize your peace of mind with secure transactions. Our platform uses advanced encryption and payment processing to ensure that every purchase is safe and confidential. Enjoy a seamless buying experience, knowing that your financial information is protected while you explore and acquire original artworks.",
      image: "image/about3.png", // Replace with actual image URL
    },
    {
      title: "Dedicated Support",
      description: "At Gallerist, we pride ourselves on providing dedicated support to our customers. Our knowledgeable team is always ready to assist you with any inquiries or concerns, ensuring a smooth art-buying experience. Whether you need help with transactions or have questions about our artists, we're here for you.",
      image: "image/about4.png", // Replace with actual image URL
    },
  ];

  return (
    
    <Container maxWidth="xl" sx={{px: 5, py: 2}}>
      {/* Heading Section */}
      <Box sx={{ textAlign: 'center', mt: 4, mb:7 }}>
        <Typography variant="h4" sx={{ mb: 2, color: "#006064" }}>
         Gallerist
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          At Gallerist, we connect art enthusiasts with a vast selection of original artwork. Our platform empowers artists and galleries to showcase their work directly to buyers, creating a vibrant community for art lovers. We believe that everyone should have access to unique, high-quality art that inspires and enriches their lives.
        </Typography>
      </Box>

      {/* About Gallerist Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', my: 4 }}>
        <Box sx={{ flex: 1, textAlign: isMobile ? 'center' : 'left', ml: isMobile ? 0 : 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#006064' }}>
            Why Choose Gallerist?
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, pr: isMobile ? 0 : 4 }}>
          At Gallerist, we prioritize connecting art enthusiasts with original artworks directly from talented artists and galleries. Our platform offers a curated selection of diverse styles, ensuring that every visitor finds something that resonates with their taste. With a commitment to secure transactions, you can shop with confidence, knowing your investment is protected. Our immersive virtual exhibitions allow you to explore art from the comfort of your home. Choose Gallerist for a seamless, enriching art-buying experience that celebrates creativity.
          </Typography>
        </Box>
        <Box
  component="video"
  src="video/about.mp4" // Replace with actual video URL
  alt="Gallerist"
  autoPlay // Automatically plays the video on load
  loop // Loops the video continuously
  muted // Starts the video muted
  
  sx={{
    width: isMobile ? '100%' : 'auto',
    height: isMobile ? 'auto' : '250px', // Adjust height; set 'auto' for mobile
    borderRadius: '5px',
    boxShadow: '4px 4px 8px rgba(0,0,0,0.8)',
    mt: isMobile ? 2 : 0,
    mr: isMobile ? 0 : 4,
  }}
/>
      </Box>

      {/* Carousel for Why Choose Gallerist Section */}
      <Carousel autoPlay animation="slide" indicators={false} >
        {whyChooseGallerist.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              p: 4,
              mb:4,
              background: "linear-gradient(to right, rgba(72, 149, 239, 0.8), rgba(61, 217, 245, 0.8))",
              borderRadius: "10px"
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: isMobile ? '70%' : '150px', // Set a fixed width for larger screens
                height: isMobile ? '70%' : '150px', // Maintain aspect ratio 
                borderRadius: '8px',
                mb: isMobile ? 2 : 0,
                pl: isMobile ? 0 : 5
              }}
            />
            <Box sx={{ flex: 1, textAlign: 'center', px: isMobile ? 3 : 6 }}>
              <Typography variant="h5" sx={{ mb: 1, color: "#006064" }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>

      {/* Thank You Section */}
      <Box sx={{ textAlign: 'center', my: 5 }}>
        <Typography variant="h4" sx={{ mb: 2, color: "#4E31AA" }}>
          Thank You for Choosing Gallerist!
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          We appreciate your trust in us and look forward to helping you discover your next masterpiece!
        </Typography>
      </Box>

      {/* Reviews Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', my: 4, gap: 2 }}>
      {/* Facebook Review Card */}
      <Card sx={{ minWidth: 275, mx: 1, backgroundColor:"#87A2FF", boxShadow: '4px 4px 8px rgba(0,0,0,0.5)' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <img src="image/facebook.png" alt="Facebook" width="60" height="60" />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ color: "orange" }} />
            ))}
          </Box>
          <Typography variant="h6" sx={{ mt: 1 }}>4.9</Typography>
          <Typography variant="body2">Facebook Reviews</Typography>
        </CardContent>
      </Card>

      {/* Trustpilot Review Card */}
      <Card sx={{ minWidth: 275, mx: 1, backgroundColor:"#87A2FF", boxShadow: '4px 4px 8px rgba(0,0,0,0.5)' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <img src="image/trustpilot.png" alt="Trustpilot" width="70" height="70" />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ color: "orange" }} />
            ))}
          </Box>
          <Typography variant="h6" sx={{ mt: 1 }}>4.8</Typography>
          <Typography variant="body2">Trustpilot Reviews</Typography>
        </CardContent>
      </Card>

      {/* Google Review Card */}
      <Card sx={{ minWidth: 275, mx: 1, backgroundColor:"#87A2FF", boxShadow: '4px 4px 8px rgba(0,0,0,0.5)' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <img src="image/google.png" alt="Google" width="80" height="80" />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ color: "orange" }} />
            ))}
          </Box>
          <Typography variant="h6" sx={{ mt: 1 }}>4.7</Typography>
          <Typography variant="body2">Google Reviews</Typography>
        </CardContent>
      </Card>
    </Box>
      </Container>
  );
};

export default AboutPage;
