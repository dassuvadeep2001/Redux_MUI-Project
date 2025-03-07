import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, MenuItem, Container, Typography, Box, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { postArt } from '../../slice/artworkslice/artslice/artslice';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/material/styles';
import LoginPage from '../../user/login/login';

const ArtForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm();
  const [imageBase64, setImageBase64] = useState('');
  const [imageError, setImageError] = React.useState("");

  const { isLoading, error } = useSelector((state) => state.art);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const artTypes = [
    "Cool-Toned Artworks", "Warm-Toned Artworks", 
    "Black-and-White Artworks", "Neutral Artworks", "Contemporary Art", "Emerging Art", 
    "Post-War Art", "Abstract Art", "Pop Art", "Street Art", "Photography", "Sculpture", 
    "Ceramics", "Textile"
  ];
  const userId = localStorage.getItem('userId');
    console.log(userId);
    
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true); 
  };
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    if (!userId){ 
      handleOpenLoginModal()
      return;
    }
    if (!imageBase64) {
      setImageError("Please upload an image.");
      return; // Prevent form submission
    }
    const artData = {
      ...data,
      image: imageBase64,
    };
    dispatch(postArt(artData))
      .then((res) => {
        if (res.payload.status === 201 || res.payload.status === 200) {
          Swal.fire({
            icon: "success",
            title: "CONGRATULATIONS",
            text: "Your Art is Submitted Successfully",
          });
          reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error In Submit Art",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Went Wrong",
        });
      });
  };

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherType, setOtherType] = useState('');

  const handleTypeChange = (event) => {
    const value = event.target.value;
    if (value === 'Others') {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
      setOtherType(''); // Reset the custom type if not "Others"
    }
  };

 
  return (
<Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', padding: 0 }}>
  {/* Left Section */}
  <Box
    sx={{
      flex: 1,
      background: "linear-gradient(to right, rgba(0, 98, 230, 0.8), rgba(51, 174, 255, 0.8))",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 4,
    }}
  >
    <Box
      sx={{
        background: "url('image/art.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        width: "150px",
        height: "150px",
        mb: 2,
      }}
    />
    <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', mb: 1 }}>"Art speaks where words are unable to explain." – Mathiole</Typography>
    <Typography sx={{ color: 'white', textAlign: 'center' }}>
      At Gallerist, we believe that every piece of art has a unique story to tell and a space it was destined to transform. Discover an exceptional collection of artworks that resonate with beauty, passion, and creativity. Our curated pieces are crafted to captivate, inspire, and elevate any environment.
    </Typography>
  </Box>

  {/* Right Section */}
  <Box sx={{ flex: 1, px: isSmallScreen ? 5 : 20, py: isSmallScreen ? 4 : 4, bgcolor: '#EEF5FF' }}>
    <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: "#006064" }}>Sell Your Art</Typography>
    {isLoading && <CircularProgress />}
    {error && <Typography color="error">Error: {error}</Typography>}
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: "Username is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="type"
            control={control}
            defaultValue=""
            rules={{ required: "Art Type is required" }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  label="Art Type"
                  select
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(e) => {
                    handleTypeChange(e);
                    field.onChange(e);
                  }}
                >
                  {artTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>{type}</MenuItem>
                  ))}
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
                {isOtherSelected && (
                  <TextField
                    label="Specify Art Type"
                    variant="outlined"
                    fullWidth
                    value={otherType}
                    onChange={(e) => setOtherType(e.target.value)}
                    sx={{ mt: 2 }}
                  />
                )}
              </>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="about"
            control={control}
            defaultValue=""
            rules={{ required: "About section is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="About"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="price"
            control={control}
            defaultValue=""
            rules={{
              required: "Price is required",
              validate: (value) => (value > 0 ? true : "Price must be a positive number"),
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
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
</Grid>

{imageBase64 && (
  <Grid item xs={12} sx={{ textAlign: 'center' }}>
    <img src={imageBase64} alt="Selected" style={{ maxWidth: '100%', height: 'auto', borderRadius: 4 }} />
  </Grid>
)}

<Grid item xs={12}>
<Button
  type="submit"
  variant="contained"
  color="primary"
  fullWidth
  onClick={() => {
    if (!imageBase64) {
      setImageError("Please upload an image."); // Error displayed if no image
    }
  }}
>
  Submit
</Button>

</Grid>

      </Grid>
    </form>
  </Box>
      <LoginPage open={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </Box>
  );
};

export default ArtForm;


