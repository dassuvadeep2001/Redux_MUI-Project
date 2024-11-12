import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Avatar, Button, TextField, Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { userProfile, userEditProfile } from '../../slice/authslice/authslice';
import { MailOutline, Phone, Home, Edit } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { userValue } = useSelector((state) => state.auth);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [profilePicBase64, setProfilePicBase64] = useState(null);
  
  // React Hook Form setup
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: userValue,
  });

  useEffect(() => {
    dispatch(userProfile(id)).then((res) => {
      reset(res.payload); // Populate the form with user data
      setProfilePicBase64(res.payload.image); // Set initial profile image
    });
  }, [dispatch, id, reset]);

  // Handle edit profile submission
  const onSubmit = (data) => {
    const updatedData = { ...data, image: profilePicBase64 }; // Include the updated image
    dispatch(userEditProfile({ userId: id, updatedData }))
      .then(() => {
        setDrawerOpen(false); // Close drawer on successful submission
      });
  };

  // Handle drawer open/close
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Handle logout
  const handleLogout = () => {
    window.localStorage.clear();
    navigate('/');
  };

  const usertype = localStorage.getItem('userType');

  const handleViewQueries = () => {
    navigate("/queries");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          height: '30vh',
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 5,
          px: 2,
        }}
      >
      </Box>
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: 'white',
          borderRadius: 3,
          p: 5,
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          mt: -15,
          mb: 5,
          mx: { xs: 0, md: 'auto' },
        }}
      >
        <Avatar
          alt="User Profile"
          src={profilePicBase64 || userValue?.image}
          sx={{
            width: 350,
            height: 350,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        />

        <Box sx={{ flex: 1 }}>
          {usertype === 'Admin' && (
            <Typography variant="h4" sx={{ mb: 1 }}>
              {userValue?.usertype}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            HELLO EVERYBODY, I AM
          </Typography>
          <Typography variant="h4" fontWeight={600} sx={{ mt: 1, mb: 1 }}>
            {userValue?.fullname}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <MailOutline fontSize="medium" color="action" />
            <Typography variant="body2" sx={{ ml: 1, fontSize: "20px" }}>
              {userValue?.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Phone fontSize="medium" color="action" />
            <Typography variant="body2" sx={{ ml: 1, fontSize: "20px" }}>
              {userValue?.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Home fontSize="medium" color="action" />
            <Typography variant="body2" sx={{ ml: 1, fontSize: "20px" }}>
              {userValue?.address}
            </Typography>
          </Box>
          {usertype === 'Admin' && (
            <Button variant="text" color="info" onClick={handleViewQueries} sx={{ px: 3, width: '100%', mt: 2 }}>
              See User Queries
            </Button>
          )}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" color="primary" onClick={toggleDrawer} sx={{ px: 3, width: '100%' }} endIcon={<EditIcon />}>
              Edit Profile
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout} sx={{ px: 3, width: '100%' }}>
              Logout
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Drawer for Edit Profile */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: 400, p: 3 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Profile
          </Typography>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            {...register("fullname")}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            {...register("phone")}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            {...register("address")}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 1, color: '#024CAA', width: "100%" }}
          >
            Upload Profile Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {profilePicBase64 && (
            <Box mt={2}>
              <img src={profilePicBase64} alt="Profile Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Profile;


