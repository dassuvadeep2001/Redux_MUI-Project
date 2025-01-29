import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  Button,
  Drawer,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  Box,
  Avatar,
  CircularProgress,
  Container,
  useMediaQuery,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { fetchReviews, postReview } from '../../slice/reviewslice/reviewslice';
import Carousel from 'react-material-ui-carousel';
import LoginPage from '../../user/login/login'; // Import the LoginPage component

const ReviewPage = () => {
  const isMobile = useMediaQuery('(max-width:1399px)');
  const isTablet = useMediaQuery('(max-width:900px)');

  const dispatch = useDispatch();
  const { isLoading, reviews, error } = useSelector((state) => state.review);
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for login modal
  const [imageBase64, setImageBase64] = useState(null);
  const [imageError, setImageError] = useState("");

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();


  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleAddReviewClick = () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      setDrawerOpen(true); // Open the drawer if the user is logged in
    } else {
      setIsLoginModalOpen(true); // Show the login modal if not logged in
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false); // Close the login modal
  };

  const handleAddReview = (data) => {
    const reviewData = {
      ...data,
      image: imageBase64,
    };
    
    dispatch(postReview(reviewData))
      .then((res) => {
        if (res.payload.status === 201 || res.payload.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Review Added Successfully',
            text: 'Thank you for your feedback!',
          });
          reset();
          setDrawerOpen(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error in adding review',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong',
        });
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter buyer and seller reviews
  const buyerReviews = reviews.filter((review) => review.type === 'buyer');
  const sellerReviews = reviews.filter((review) => review.type === 'seller');

  return (
    <Container maxWidth="xl" sx={{ mb: 3 }}>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#006064' }}>
          Voices of the Artisans: Gallerist Reviews
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          At Gallerist, every brushstroke, every sculpture, and every crafted piece tells a unique story...
        </Typography>
      </Box>
      
      {/* Add Review Button */}
      <Box sx={{ boxShadow: '5px 5px 8px grey', py: 2, px: 2, background: 'linear-gradient(to right, rgba(34, 193, 195, 0.7), rgba(45, 253, 253, 0.7))' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#006064', textAlign: 'center' }}>
        ""Join our vibrant community and share your experience with us!<br/> Your insights help shape Gallerist and inspire fellow art enthusiasts.""
        </Typography>
        <Button variant="contained" onClick={handleAddReviewClick} sx={{ justifyContent: 'center', display: 'flex', mx: 'auto' }}>
          Add Your Review
        </Button>
      </Box>

      {/* Carousel for Buyer Reviews */}
      <Typography variant="h5" sx={{mt: 5, color: "#006064"}}>Art Enthusiast Testimonials</Typography>
      <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
      "Explore heartfelt testimonials from our cherished buyers. Discover how Gallerist connects art lovers with unique masterpieces that enrich their lives and spaces."
        </Typography>
      <Box>
        <Carousel autoPlay animation="fade">
          {buyerReviews.map((review, index) => (
            <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              padding: 5,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <img
  src={review.image || undefined}
  alt={review.name}
  style={{
    borderRadius: '50%',
    width: isMobile ? '80px' : '100px',
    height: isMobile ? '80px' : '100px',
    objectFit: 'cover',
    backgroundColor: review.image ? 'transparent' : '#e0e0e0',
    display: review.image ? 'block' : 'none',
  }}
/>
{!review.image && (
  <Avatar
    sx={{
      width: isMobile ? '80px' : '100px',
      height: isMobile ? '80px' : '100px',
      bgcolor: '#006064',
      fontSize: isMobile ? '24px' : '32px',
    }}
  >
    {review.name?.charAt(0).toUpperCase()}
  </Avatar>
)}

            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{mt: 2}} >
              {review.name}
            </Typography>
            <Typography variant="body2" sx={{mt: 1}} >
              {review.address}
            </Typography>
            <Rating value={review.rating} readOnly sx={{my: 1}}/>
            <Typography variant="body2" >
              {review.review}
            </Typography>
          </Box>
          ))}
        </Carousel>
      </Box>


      {/* Card for Seller Reviews */}
      <Typography variant="h5" style={{ margin: '20px 0', color: "#006064" }}>Artisan Reflections</Typography>
      <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
      "Delve into the voices of our talented sellers, where each review highlights their journey and passion for art. Discover their stories!"
        </Typography>
      <Grid container spacing={2}>
        {sellerReviews.map(review => (
      <Grid item xs={12} sm={6} md={4} key={review.id}>
      <Card style={{ margin: '10px', padding: '10px', boxShadow: "5px 5px 10px grey" }}>
        <CardContent style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Display Avatar with adjusted size */}
          {review.image ? (
  <img
    src={review.image}
    alt="User"
    style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      marginRight: '10px',
    }}
  />
) : (
  <Avatar
    sx={{
      width: '80px',
      height: '80px',
      marginRight: '10px',
      bgcolor: '#006064',
      fontSize: '32px',
    }}
  >
    {review.name?.charAt(0).toUpperCase()}
  </Avatar>
)}

          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6">{review.name}</Typography>
            <Typography variant="caption">{review.address}</Typography><br />
            <Rating value={review.rating} readOnly />
            <Typography variant="body1">{review.review}</Typography>
          </div>
        </CardContent>
      </Card>
    </Grid>
    
        ))}
      </Grid>

      {/* Drawer for Adding Reviews */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div style={{ padding: '20px', width: '400px' }}>
          <Typography variant="h6" sx={{ color: '#006064', textAlign: 'center' }}>Add Your Review</Typography>
          {isLoading && <CircularProgress />}
          {error && <Typography color="error">Error: {error}</Typography>}
          <form onSubmit={handleSubmit(handleAddReview)}>
  <TextField
    {...register('name', { required: 'Full Name is required' })}
    label="Full Name"
    fullWidth
    margin="normal"
    error={!!errors.name}
    helperText={errors.name?.message}
  />
  <TextField
    {...register('address', { required: 'Address is required' })}
    label="Address"
    fullWidth
    margin="normal"
    error={!!errors.address}
    helperText={errors.address?.message}
  />
  <Typography
    variant="subtitle1"
    sx={{ my: 1, color: 'grey', textAlign: 'center' }}
  >
    Rate Us
  </Typography>
  <Controller
  name="rating"
  control={control}
  defaultValue={0}
  rules={{
    required: 'Rating is required',
    validate: (value) => value > 0 || 'Rating is required',
  }}
  render={({ field }) => (
    <Rating
      {...field}
      precision={0.5}
      onChange={(_, value) => field.onChange(value)} // Update form value on change
      sx={{ mx: 'auto', justifyContent: 'center', display: 'flex' }}
    />
  )}
/>
{errors.rating && (
  <Typography
    variant="caption"
    color="error"
    sx={{ display: 'block', textAlign: 'center', mt: 1 }}
  >
    {errors.rating.message}
  </Typography>
)}

  <TextField
    {...register('review', { required: 'Review is required' })}
    label="Review"
    multiline
    rows={3}
    fullWidth
    margin="normal"
    error={!!errors.review}
    helperText={errors.review?.message}
  />
  <TextField
    {...register('email', {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
    })}
    label="Email"
    fullWidth
    margin="normal"
    error={!!errors.email}
    helperText={errors.email?.message}
  />
  <TextField
    {...register('type', { required: 'Type is required' })}
    select
    label="Type"
    fullWidth
    margin="normal"
    error={!!errors.type}
    helperText={errors.type?.message}
    SelectProps={{
      native: true,
    }}
  >
    <option value="buyer">Buyer</option>
    <option value="seller">Seller</option>
  </TextField>
    <Button variant="outlined" component="label" fullWidth>
      Upload Image
      <input
        type="file"
        hidden
        accept="image/jpeg, image/png, image/jpg, image/webp"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
            if (validFormats.includes(file.type)) {
              handleImageChange(e); // Your existing function to handle the image
              setImageError(""); // Clear any previous error message
            } else {
              setImageError("Invalid file format. Please upload a JPG, JPEG, PNG, or WEBP file.");
            }
          }
        }}
      />
    </Button>
    {imageError && (
      <Typography color="error" sx={{ mt: 1 }}>
        {imageError}
      </Typography>
    )}
  
  {imageBase64 && (
    <Box sx={{ textAlign: 'center' }}>
      <img src={imageBase64} alt="Selected" style={{ maxWidth: '100%', height: 'auto', borderRadius: 4 }} />
    </Box>
  )}

  <Button type="submit" variant="contained" sx={{ mt: 4, width: '100%' }}>
    {isLoading ? <CircularProgress size={24} /> : 'Submit'}
  </Button>
</form>

        </div>
      </Drawer>

      {/* Login Modal */}
      <LoginPage open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Container>
  );
};

export default ReviewPage;

