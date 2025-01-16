import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, useMediaQuery, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const topics = [
  {
    title: 'Curated Acquisitions',
    about: 'At Gallerist, we celebrate the art of curation through our carefully selected acquisitions. Each piece tells a story and embodies creativity, allowing collectors to enrich their collections with unique artworks that inspire and captivate the imagination. Discover your next treasure today!',
    blogs: [
      { id: 1, title: 'The Joy of Collecting Art', content: 'Buying art goes beyond just owning a piece; it’s about connecting with a story and an artist’s vision. At Gallerist, explore diverse artwork that makes every purchase feel truly special.', image: 'image/buy1.avif' },
      { id: 2, title: 'Finding Your Art Style', content: 'Not sure where to start? Begin with pieces that speak to you emotionally. Gallerist curates a range of styles to help you discover what resonates most deeply with your personal taste.', image: 'image/buy2.jpg' },
      { id: 3, title: 'Investing in Emerging Artists', content: 'Supporting emerging artists can be both rewarding and valuable. Buying from new talent at Gallerist lets you invest in unique works that might become tomorrow’s masterpieces.', image: 'image/buy3.png' },
    ],
  },
  {
    title: 'Artistic Commerce',
    about: 'In the realm of Artistic Commerce, Gallerist bridges the gap between creativity and commerce. We empower artists to showcase their unique creations while providing art lovers with a curated platform to discover and acquire exceptional works that resonate with their passions.',
    blogs: [
      { id: 4, title: 'Discover the Value of Art Buying', content: 'Art buying opens the door to an immersive experience where passion meets investment. From timeless masterpieces to contemporary pieces, owning art adds personality to any space while holding lasting value.', image: 'image/sell1.jpg' },
      { id: 5, title: 'Choosing the Right Art Piece', content: 'Finding the perfect artwork is about aligning with personal style and aesthetic. Art buying is not just an acquisition—its about building a collection that resonates with you and tells your story.', image: 'image/sell2.jpg' },
      { id: 6, title: 'Supporting Emerging Artists', content: 'Investing in art is also about supporting the vision of new artists. Buying art from emerging creators not only enriches your collection but also fosters a vibrant art community and future talent.', image: 'image/sell3.jpg' },
    ],
  },
  {
    title: 'Visual Showcases',
    about: 'At Gallerist, we celebrate the beauty of art through our visual showcases. Dive into a curated selection of stunning artworks that captivate the imagination and inspire creativity, featuring talented artists from around the world. Experience art like never before!',
    blogs: [
      { id: 7, title: 'Exploring Modern Art Exhibitions', content: 'Modern art exhibitions offer a unique insight into contemporary artists visions. At Gallerist, discover the latest in abstract, digital, and mixed-media creations that challenge perceptions and inspire thought.', image: 'image/virtual1.jpg' },
      { id: 8, title: 'The Allure of Outdoor Art Shows', content: 'Outdoor exhibitions bring art into nature, creating a vibrant experience where visitors can enjoy sculptures, installations, and live performances. Explore these immersive displays at Gallerist’s recommended art shows.', image: 'image/virtual2.jpg' },
      { id: 9, title: 'Virtual Art Exhibitions', content: 'Virtual exhibitions let you explore masterpieces from around the world without leaving home. Gallerist’s virtual art tours bring global galleries and exhibits directly to you, fostering accessibility and inspiration.', image: 'image/virtual3.png' },
    ],
  },
];

// Styled component for sliding effect
const BlogCardContent = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  background: 'linear-gradient(to right, rgba(11, 121, 238, 0.88), rgba(35, 16, 237, 0.81))',
  color: 'white',
  transition: 'transform 0.4s ease-in-out',
  transform: 'translateY(100%)',
  padding: theme.spacing(0),
}));

const BlogsPage = () => {
  const [activeBlogId, setActiveBlogId] = useState(null);

  const handleHover = (id) => setActiveBlogId(id);
  const handleMouseLeave = () => setActiveBlogId(null);

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Container maxWidth="lg" sx={{ pt: 5, pb: 5 }}>
      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom 
        sx={{
          color: "#4A90E2", 
          fontWeight: 'bold', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)', 
          mb: 4
        }}
      >
        Insights & Inspirations
      </Typography>
      <Typography 
        align="center" 
        gutterBottom 
        sx={{ mx: 'auto', mb: 4, lineHeight: 1.7 }}
      >
        At Gallerist, we believe every piece of art tells a story. Explore exquisite works curated from emerging and established artists to find the perfect addition to your space. Let us guide you through the art-buying journey.
      </Typography>

      {topics.map((topic) => (
        <Box key={topic.title} sx={{ mt: 8, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'darkblue',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {topic.title}
          </Typography>
          <Typography 
            sx={{
              my: 2,
              mx: 'auto',
              lineHeight: 1.8,
              color: '#5a5a5a',
            }}
          >
            {topic.about}
          </Typography>

          <Grid container spacing={4}>
            {topic.blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    },
                  }}
                  onMouseEnter={() => handleHover(blog.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleHover(blog.id)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={blog.image}
                    alt={blog.title}
                    sx={{
                      filter: 'brightness(0.9)',
                      transition: 'filter 0.3s ease',
                      '&:hover': { filter: 'brightness(1.1)' },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      backgroundColor: 'rgba(54, 67, 243, 0.67)',
                      color: 'white',
                      textAlign: 'center',
                      padding: 1,
                    }}
                  >
                    <Typography variant="h6">{blog.title}</Typography>
                  </Box>
                  <BlogCardContent
                    sx={{
                      transform: activeBlogId === blog.id ? 'translateY(0)' : 'translateY(100%)',
                    }}
                  >
                    <Typography variant="body2" sx={{ mb: 2, p: 1 }}>
                      {blog.content}
                    </Typography>
                    <Button 
                      variant="contained" 
                      sx={{ mt: 1, boxShadow: 'none', textTransform: 'none', color: 'blue', backgroundColor: 'white' }}
                    >
                      Read More
                    </Button>
                  </BlogCardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default BlogsPage;

