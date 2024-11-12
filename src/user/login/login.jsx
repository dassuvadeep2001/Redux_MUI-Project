import React from "react";
import { Container, TextField, Button, Box, Typography, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../../slice/authslice/authslice";
import Swal from 'sweetalert2';

const LoginPage = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLoading, error } = useSelector((state) => state.auth);

  const onSubmit = (values) => {
    dispatch(userLogin(values))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome Back",
          text: "Login Successful",
        });
        navigate("/");
        onClose(); // Close modal after successful login
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Went Wrong",
        });
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Container sx={{ mt: 2 }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h5" textAlign="center" mb={2}>LOGIN</Typography>

            <TextField
              label="Email"
              variant="outlined"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 4, message: "Password must be at least 4 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {error && <Typography color="error" textAlign="center">{error}</Typography>}

            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <Button component={Link} to="/signup" variant="outlined" color="primary" fullWidth onClick={onClose}>
              Create Account
            </Button>
          </Box>
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 5 }}>
          By continuing, you are indicating that you accept our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: 'gray' }}>
          Powered by Gallerist.com
        </Typography>
        </Container>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPage;

