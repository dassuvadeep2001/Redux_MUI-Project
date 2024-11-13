import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Typography, Button, useMediaQuery, Collapse, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// --------------------------------banner data------------------------------------------------------
const questionsAndAnswers = [
  { question: 'What is Gallerist?', answer: 'Gallerist is an online platform for buying and selling art, connecting artists and buyers globally.' },
  { question: 'How do I purchase art on Gallerist?', answer: 'Browse the art listings, add your chosen piece to the cart, and proceed to checkout to make a secure purchase.' },
  { question: 'How can I sell my art on Gallerist?', answer: 'Register as an artist, upload your artwork, set prices, and start selling directly to interested buyers.' },
  { question: 'What payment methods are available on Gallerist?', answer: 'Gallerist supports multiple payment methods, including credit cards, PayPal, and bank transfers for secure transactions.' },
  { question: 'How does Gallerist ensure the authenticity of the artwork?', answer: 'Gallerist requires artists to verify their work’s authenticity and provides documentation for buyers where possible.' }
];

const bannerData = [
  {
    image: 'image/banner1.png', // Replace with your image URL
    title: 'Discover Masterpieces',
    description: 'Explore an exclusive collection of world-renowned and emerging artists. Dive into a curated world of creativity and inspiration.',
  },
  {
    image: 'image/banner2.png', // Replace with your image URL
    title: 'Art for Every Soul',
    description: 'From modern abstracts to classic portraits, find art that resonates with you. Gallerist brings the finest works to inspire your space and spirit.',
  },
  {
    image: 'image/banner3.png', // Replace with your image URL
    title: 'Uncover Unique Stories',
    description: 'Each piece holds a story. Journey through an array of artworks and connect with the narratives behind the canvas.',
  },
];
// ---------------------------------------------------artist data------------------------------------------------------------------
const artistData = [
  {
    image: 'image/artist1.jpg', // Replace with actual image URL
    name: 'Vincent van Gogh',
    bio: 'A Dutch post-impressionist painter known for his bold, dramatic brush strokes and vibrant colors.',
  },
  {
    image: 'image/artist2.jpg', // Replace with actual image URL
    name: 'Frida Kahlo',
    bio: 'A Mexican painter celebrated for her self-portraits and work inspired by nature and Mexican culture.',
  },
  {
    image: 'image/artist3.jpg', // Replace with actual image URL
    name: 'Claude Monet',
    bio: 'A founder of French Impressionist painting, known for his landscape paintings and water lilies series.',
  },
  {
    image: 'image/artist4.jpg', // Replace with actual image URL
    name: 'Pablo Picasso',
    bio: 'A Spanish painter and sculptor, co-founder of Cubism and creator of iconic modern art works.',
  },
  {
    image: 'image/artist5.jpg', // Replace with actual image URL
    name: 'Salvador Dalí',
    bio: 'A Spanish surrealist artist known for his dreamlike paintings, such as "The Persistence of Memory".',
  },
  {
    image: 'image/artist6.jpg', // Replace with actual image URL
    name: 'Leonardo da Vinci',
    bio: 'An Italian Renaissance polymath renowned for his masterpieces like "Mona Lisa" and "The Last Supper".',
  },
  {
    image: 'image/artist7.jpg', // Replace with actual image URL
    name: 'Georgia O’Keeffe',
    bio: 'An American modernist artist known for her large-scale paintings of flowers and southwestern landscapes.',
  },
];

// ----------------------------------------------------------artwork----------------------------------------------------------------


const artworkData = [
  [
    {
      image: 'image/cooltoned1.jpg', // Replace with actual artwork images
      title: 'Cool-Toned Artwork-1A',
    },
    {
      image: 'image/cooltoned2.jpg',
      title: 'Cool-Toned Artwork-1B',
    },
    {
      image: 'image/cooltoned3.jpg',
      title: 'Cool-Toned Artwork-1C',
    },
    {
      image: 'image/cooltoned4.jpg',
      title: 'Cool-Toned Artwork-1D',
    }
  ],
  [
    {
      image: 'image/warmtoned1.jpg',
      title: 'Warm-Toned Artwork-2A',
    },
    {
      image: 'image/warmtoned2.jpg',
      title: 'Warm-Toned Artwork-2B',
    },
    {
      image: 'image/warmtoned3.jpg',
      title: 'Warm-Toned Artwork-2C',
    },
    {
      image: 'image/warmtoned4.jpg',
      title: 'Warm-Toned Artwork-2D',
    }
  ],
  [
    {
      image: 'image/bw1.jpg',
      title: 'Black&White Artwork-3A',
    },
    {
      image: 'image/bw2.jpg',
      title: 'Black&White Artwork-3B',
    },
    {
      image: 'image/bw3.jpg',
      title: 'Black&White Artwork-3C',
    },
    {
      image: 'image/bw4.jpg',
      title: 'Black&White Artwork-3D',
    },
  ],
  [
    {
      image: 'image/pop1.jpg',
      title: 'Pop Artwork-4A',
    },
    {
      image: 'image/pop2.jpg',
      title: 'Pop Artwork-4B',
    },
    {
      image: 'image/pop3.jpg',
      title: 'Pop Artwork-4C',
    },
    {
      image: 'image/pop4.jpg',
      title: 'Pop Artwork-4D',
    },
  ],
  [
    {
      image: 'image/textile1.jpg',
      title: 'Textile Artwork-5A',
    },
    {
      image: 'image/textile2.jpg',
      title: 'Textile Artwork-5B',
    },
    {
      image: 'image/textile3.jpg',
      title: 'Textile Artwork-5C',
    },
    {
      image: 'image/textile4.jpg',
      title: 'Textile Artwork-5D',
    },
  ],
  [
    {
      image: 'image/sculpture1.jpg',
      title: 'Sculpture Artwork-6A',
    },
    {
      image: 'image/sculpture2.jpg',
      title: 'Sculpture Artwork-6B',
    },
    {
      image: 'image/sculpture3.jpg',
      title: 'Sculpture Artwork-6C',
    },
    {
      image: 'image/sculpture4.jpg',
      title: 'Sculpture Artwork-6D',
    },
  ],
  [
    {
      image: 'image/street1.jpg',
      title: 'Street Artwork-7A',
    },
    {
      image: 'image/street2.jpg',
      title: 'Street Artwork-7B',
    },
    {
      image: 'image/street3.jpg',
      title: 'Street Artwork-7C',
    },
    {
      image: 'image/street4.jpg',
      title: 'Street Artwork-7D',
    },
  ],
  [
    {
      image: 'image/photo1.jpg',
      title: 'Fineart Photography-8A',
    },
    {
      image: 'image/photo2.jpg',
      title: 'Fineart Photography-8B',
    },
    {
      image: 'image/photo3.jpg',
      title: 'Fineart Photography-8C',
    },
    {
      image: 'image/photo4.jpg',
      title: 'Fineart Photography-8D',
    },
  ],
  [
    {
      image: 'image/con1.jpeg',
      title: 'Contenporary Artwork-9A',
    },
    {
      image: 'image/con2.jpg',
      title: 'Contenporary Artwork-9B',
    },
    {
      image: 'image/con3.jpg',
      title: 'Contenporary Artwork-9C',
    },
    {
      image: 'image/con4.jpg',
      title: 'Contenporary Artwork-9D',
    },
  ],
  [
    {
      image: 'image/eme1.jpg',
      title: 'Emerging Artwork-10A',
    },
    {
      image: 'image/eme2.jpg',
      title: 'Emerging Artwork-10B',
    },
    {
      image: 'image/eme3.jpg',
      title: 'Emerging Artwork-10C',
    },
    {
      image: 'image/eme4.jpg',
      title: 'Emerging Artwork-10D',
    },
  ],
  [
    {
      image: 'image/ceramic1.jpg',
      title: 'Ceramic Artwork-11A',
    },
    {
      image: 'image/ceramic2.jpg',
      title: 'Ceramic Artwork-11B',
    },
    {
      image: 'image/ceramic3.jpg',
      title: 'Ceramic Artwork-11C',
    },
    {
      image: 'image/ceramic4.jpg',
      title: 'Ceramic Artwork-11D',
    },
  ],
  [
    {
      image: 'image/war.jpeg',
      title: 'Post-War Artwork-12A',
    },
    {
      image: 'image/war1.jpg',
      title: 'Post-War Artwork-12B',
    },
    {
      image: 'image/war2.jpeg',
      title: 'Post-War Artwork-12C',
    },
    {
      image: 'image/war3.jpeg',
      title: 'Post-War Artwork-12D',
    },
  ],
];

function Home() {
  const isMobile = useMediaQuery('(max-width:1399px)');
  const isTablet = useMediaQuery('(max-width:900px)');

  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 const navigate=useNavigate();

  return (
    <>
     {/* -----------------------------------------------------------------banner---------------------------------------------------------------------- */}

    <Carousel
      autoPlay
      animation="fade"
      indicators={false}
      sx={{
        width: '100%',
        height: isMobile ? '200px' : '400px',
      }}
    >
      {bannerData.map((item, index) => (
        <Box
          key={index}
          sx={{
            background: `linear-gradient(to right, rgba(106, 17, 203, 0.6), rgba(37, 117, 252, 0.6)), url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
            height: isMobile ? '200px' : isTablet ? '300px' : '400px', // Adjust height for smaller screens
          }}
        >
          <Typography variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h3'}  sx={{ mt: isMobile ? 10 : isTablet ? 15 : 28, textAlign: 'center' }}>{item.title}</Typography>
          <Typography variant="body1" sx={{ mt: isMobile ? 1 : 2, mb: isMobile ? 5 : isTablet ? 10 : 15, px: 2, textAlign: 'center',fontSize: isMobile ? '0.9rem' : '1rem'
  }}>
            {item.description}
          </Typography>
        </Box>
      ))}
    </Carousel>

    {/* -----------------------------------------------------------------service---------------------------------------------------------------------- */}
   <Box>
   <Typography gutterBottom variant="h5" component="div"
sx={{ 
  mb: 2,
  mt: 4,
  display: 'flex', 
  justifyContent: 'center', // Centers the content horizontally
  color: "#006064"
}}
>
        Service We Provide...
        </Typography>
    <Box
      sx={{ 
        mt: 5,
        mb: 5,
        display: 'flex', 
        flexDirection: { xs: 'row',sm:'row', md: 'row' }, // Column on small screens, row on medium+ screens
        gap: 2, // Adds space between cards
        flexWrap: 'wrap', // Ensures cards wrap to the next line if necessary
        justifyContent: 'center', // Centers the content horizontally
      }}
      >
    <Card sx={{ maxWidth: 345,boxShadow: 7 }}>
      <CardMedia
        sx={{ height: 150 }}
        image="image/service1.avif"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Online Art Marketplace
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        A curated platform for artists and collectors to buy and sell artwork with secure payment options. Listings are verified, ensuring high-quality and authentic pieces for buyers.
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to="/service" size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345,boxShadow: 7 }}>
      <CardMedia
        sx={{ height: 150 }}
        image="image/service3.avif"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Virtual Art Showrooms
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Explore artworks in interactive, 3D virtual galleries that mimic a real-world viewing experience. Users can view, zoom, and engage with art as if they were in a physical gallery.
        </Typography>
      </CardContent>
      <CardActions>
      <Button component={Link} to="/service" size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345,boxShadow: 7 }}>
      <CardMedia
        sx={{ height: 150 }}
        image="image/service2.avif"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Art Advisory Services
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Personalized consultation with art advisors to help collectors find pieces that match their tastes and space. Tailored recommendations make art collecting accessible and meaningful.
        </Typography>
      </CardContent>
      <CardActions>
      <Button component={Link} to="/service" size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345,boxShadow: 7 }}>
      <CardMedia
        sx={{ height: 150 }}
        image="image/service4.avif"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Artist Portfolios and Profiles
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        An artist directory where each artist has a profile showcasing their bio, artistic style and current work. This feature builds a connection between the buyer and the artist's journey.
        </Typography>
      </CardContent>
      <CardActions>
      <Button component={Link} to="/service" size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Box>
    </Box>

{/* ==================================================artist feature============================================================================ */}
<Typography gutterBottom variant="h5" component="div"
sx={{ 
  mb: 2,
  display: 'flex', 
  justifyContent: 'center', // Centers the content horizontally
  color: "#006064"
}}
>
        Artist Features
        </Typography>
<Carousel
      autoPlay
      animation="slide"
      indicators={false}
      sx={{
        width: '100%',
        height: isMobile ? '200px' : '300px',
      }}
    >
      {artistData.map((artist, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            background: "linear-gradient(to right, rgba(72, 149, 239, 0.8), rgba(61, 217, 245, 0.8))",
            padding: 2,
            borderRadius: 2,
            boxShadow: 2,
            textAlign: 'center',
          }}
        >
          <img
            src={artist.image}
            alt={artist.name}
            style={{
              borderRadius: '50%',
              width: isMobile ? '80px' : '150px',
              height: isMobile ? '80px' : '150px',
              objectFit: 'cover',
            }}
          />
          <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mt: isMobile ? 2 : isTablet ? 3 : 4, textAlign: 'center' }}>
            {artist.name}
          </Typography>
          <Typography variant="body2" sx={{ mt: isMobile ? 1 : 2, mb: isMobile ? 5 : isTablet ? 10 : 15, px: 2, textAlign: 'center',fontSize: isMobile ? '0.6rem' : '1rem'}}>
            {artist.bio}
          </Typography>
        </Box>
      ))}
    </Carousel>
 {/* =========================================================About section======================================================================= */}

 <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        p: 4
      }}
    >
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          mb: isMobile ? 2 : 0,
          padding: 1
        }}
      >
        <img 
          src="image/aboutbanner1.jpg" // Replace with actual image URL
          alt="Gallerist"
          style={{ 
            width: isMobile ? '80%' : '100%', 
            borderRadius: '8px', 
            // boxShadow: '0 4px 8px rgba(0,0,0,0.2)' 
          }}
        />
      </Box>
      
      <Box 
        sx={{ 
          flex: 2, 
          textAlign: 'center', 
          p: 2 
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#006064" }}>
          About Gallerist
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Gallerist is a premier online platform connecting art enthusiasts with talented artists. We provide a space for buying and selling unique artworks, offering a curated selection of pieces that inspire creativity and passion.
        </Typography>
        <Button component={Link} to="/about" variant="outlined" color="primary">
          Know More
        </Button>
      </Box>

      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: 1 
        }}
      >
        <img 
          src="image/aboutbanner2.jpg" // Replace with actual image URL
          alt="Art Gallery"
          style={{ 
            width: isMobile ? '80%' : '100%', 
            borderRadius: '8px', 
            // boxShadow: '0 4px 8px rgba(0,0,0,0.2)' 
          }}
        />
      </Box>
    </Box>
{/* ===============================================Art Features============================================================ */}
<Box sx={{mb:3}}>
<Typography gutterBottom variant="h5" component="div"
sx={{ 
  mb: 2,
  display: 'flex', 
  justifyContent: 'center', // Centers the content horizontally
  color: "#006064"
}}
>
        Artworks Feature
        </Typography>
<Carousel
      autoPlay
      animation="fade"
      indicators={false}
      sx={{
        width: '100%',
        height: isMobile ? '150px' : '300px',
      }}
    >
      {artworkData.map((slide, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            pt: 1,
            pb:2,
            height: isMobile ? '150px' : '300px',
          }}
        >
          {slide.map((artwork, idx) => (
            <Box key={idx} sx={{ textAlign: 'center', padding: 1 }}>
              <img
                src={artwork.image}
                alt={artwork.title}
                style={{
                  width: isMobile ? '70px' : '180px',
                  height: isMobile ? '70px' : '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '4px 4px 4px rgba(0,0,0,0.5)',
                }}
              />
              <Typography variant={isMobile ? 'subtitle2' : 'subtitle1'} sx={{ color: "white"}}>
                {artwork.title}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Carousel>
    </Box>

    {/* =======================================frequently ask questions========================================================== */}
   
   <Container maxWidth="md" sx={{mb:5}}>
   <Typography gutterBottom variant="h5" component="div"
sx={{ 
  mb: 2,
  display: 'flex', 
  justifyContent: 'center', // Centers the content horizontally
  color: "#006064"
}}
>
        Frequently Ask Questions
        </Typography>
    <Box sx={{my:3}}>
      {questionsAndAnswers.map((item, index) => (
        <Box key={index} sx={{backgroundColor:"#A0DEFF", mb:2, py:1, px:2, borderRadius: 2}}>
          <Box
            onClick={() => handleClick(index)}
            fullWidth
          >
            <Typography variant='body1' sx={{display: "flex", justifyContent:"space-between"}}>
            Question. {item.question}
            <span>{openIndex === index ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</span>
            </Typography>
            <Collapse in={openIndex === index}>
            <Box mt={2}>
              <Typography variant="body2" color='text.secondary'>Answer. {item.answer}</Typography>
            </Box>
          </Collapse>
          </Box>
        </Box>
      ))}
    </Box>
  </Container>
  {/* =======================================================get started page============================================================ */}
  <Box
      sx={{
        height: '400px',
        background: "linear-gradient(135deg, rgba(25, 25, 116, 0.8), rgba(0, 0, 130, 0.8)), url('image/get.webp')",
        backgroundSize: 'cover',	
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          textAlign: 'center',
        }}
      >
         <Typography variant="h4" sx={{ mb: 2}}>
        Join Gallerist now!
        </Typography>
        <Typography variant="h5" sx={{ mb: 2}}>
        Join Gallerist now! Experience a seamless platform to buy, sell, and appreciate extraordinary art from passionate creators.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/signup')}
          sx={{
            mt: 2,
            bgcolor: '#1fc8db', // Teal or cyan color
            color: '#ffffff',
            fontSize: '1rem',
            padding: '10px 20px',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(31, 200, 219, 0.4)',
            '&:hover': {
              bgcolor: '#17b2c7',
              boxShadow: '0 6px 15px rgba(31, 200, 219, 0.6)',
            },
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  </>
  );
}

export default Home;
