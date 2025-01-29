import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import { postQuery } from '../../slice/contactslice/constactslice';

const ContactPage = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const {isLoading,
    queries,
    error,
    status,
    sender,
    senderProfile,
    profileError} = useSelector(state => state.contact);
  
  const onSubmit = (data) => {
    // Dispatch the form data to postQuery
    dispatch(postQuery(data))
    .then((res) => {
      console.log(res)
      if (res.meta.requestStatus==="fulfilled") {
        Swal.fire({
          icon: 'success',
          title: 'Query Submitted Successfully',
          text: "You'll get your answer shortly",
        });
        reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error to submit query',
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

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          height: '40vh',
          background: "linear-gradient(to right, rgba(0, 98, 230, 0.8), rgba(51, 174, 255, 0.8)), url('image/contact.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          Get in touch
        </Typography>
        <Typography variant="body1">
          Want to get in touch? We'd love to hear from you. Here's how you can reach us...
        </Typography>
      </Box>

      {/* Contact Options Section */}
      <Container maxWidth="md" sx={{ mt: -10, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Customer Support Box */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CallIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Contact Customer Support
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                If you need any help, feel free to reach out to us.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1"><strong>Address:</strong> 32/A St.Paul Sarani, Saltlake Sector V, Kolkata-58, India</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1"><strong>Email:</strong> contact@gallerist.com</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1"><strong>Phone:</strong> +1 234 567 890</Typography>
              </Box>
              <Box
            sx={{
              width: '100%',
              height: '143px',
              mt: 2,
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <iframe
              title="Gallerist Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5207.166707388144!2d88.42561523982711!3d22.573545936783773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1730744295069!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
            </Paper>
          </Grid>

          {/* Send Your Query Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ChatIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Send Your Query
              </Typography>
              {isLoading && <CircularProgress />}
              {error && <Typography color="error">Error: {error}</Typography>}
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register('name', { required: "Name is required" })}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register('email', { required: "Email is required", 
                    pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  }})}
                />
                <TextField
                  fullWidth
                  label="Query"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  error={!!errors.query}
                  helperText={errors.query?.message}
                  {...register('query', { required: "Query is required" })}
                />
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Send'}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;



