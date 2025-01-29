import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userReg } from '../../slice/authslice/authslice';
import Swal from 'sweetalert2'

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLoading, error } = useSelector((state) => state.auth);
  

  const onSubmit = (data) => {
    const submissionData = {
      ...data,
      usertype: "user", //default
      image: profilePicBase64,
    };
    dispatch(userReg(submissionData))
      .then((res) => {
        console.log("Response from userReg:", res);
        if (res.meta.requestStatus === "fulfilled") {
          Swal.fire({
            icon: "success",
            title: "CONGRATULATIONS",
            text: "Registration Done Successfully",
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error In Registration",
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

  const [profilePicBase64, setProfilePicBase64] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleImageChangeWithValidation = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Only JPG, JPEG, PNG, and WEBP files are allowed');
        return;
      }
      setErrorMessage(''); // Clear error if file type is valid
  
      // Convert image to Base64
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicBase64(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <Box
      sx={{
        minHeight: 'auto',
        display: 'flex',
        // alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(rgba(106, 17, 203, 0.6), rgba(37, 117, 252, 0.6)), url(image/signup.webp) repeat-y fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2, p: 5, m: 5 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>Create Your Account</Typography>
        {isLoading && <CircularProgress />}
        {error && <Typography color="error">Error: {error}</Typography>}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Username"
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Full Name"
            {...register('fullname', { required: 'Full name is required' })}
            error={!!errors.fullname}
            helperText={errors.fullname?.message}
          />

          <TextField
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Address"
            {...register('address', { required: 'Address is required' })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />

          <TextField
              label="Phone"
                {...register('phone', { 
                 required: 'Phone is required', 
                pattern: {
                value: /^\d{10}$/, 
                message: 'Phone must be exactly 10 digits'
                } 
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
/>

          <TextField
            label="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

<Button
  variant="contained"
  component="label"
  sx={{ mt: 1, backgroundColor: '#024CAA', color: 'white' }}
>
  Upload Profile Image
  <input
    type="file"
    hidden
    accept=".jpg, .jpeg, .webp, .png" // Restricts file types in the file picker
    onChange={(e) => handleImageChangeWithValidation(e)}
  />
</Button>
{errorMessage && (
  <Box mt={1} color="red">
    {errorMessage}
  </Box>
)}
{profilePicBase64 && (
  <Box mt={2}>
    <img
      src={profilePicBase64}
      alt="Profile Preview"
      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
    />
  </Box>
)}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 4 }}>
          By continuing, you are indicating that you accept our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: 'gray' }}>
          Powered by Gallerist.com
        </Typography>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
