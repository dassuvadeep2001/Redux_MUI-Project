import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography, Paper, Container, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart, decrementQty, deleteitem, incrementQty } from '../../slice/cartSlice/cartslice';
import Swal from 'sweetalert2';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, Totalprice } = useSelector((state) => state.cart);

  const increment = (id) => dispatch(incrementQty(id));
  const decrement = (id) => dispatch(decrementQty(id));
  const remove = (id) => dispatch(deleteitem(id));
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    Swal.fire({
      icon: 'success',
      title: 'Order Placed Successfully!',
      text: 'Your order has been placed and is being processed.',
      confirmButtonText: 'Thank You',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        navigate('/');
      }
    });
  };

  const addMore = () => navigate('/artwork');

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 3, md: 5 }, bgcolor: 'white', p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: '#006064', fontWeight: 'bold', textAlign: 'center' }}>
        Shopping Bag
      </Typography>
      {/* <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
        {cart.length} items in your bag.
      </Typography> */}

      {cart.length === 0 ? (
        <Box textAlign="center" p={4}>
          <img 
            src="https://img.freepik.com/free-vector/empty-shopping-basket-concept-illustration_114360-22411.jpg" 
            alt="Empty Cart" 
            height="230px" 
          />
          <Typography variant="h5" sx={{ mt: 2, color: "#006064" }}>Hey, it feels so light!</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            There is nothing in your basket. Let's add some items.
          </Typography>
          <Link to="/artwork">
            <Button variant="outlined" color="primary">Shop Now</Button>
          </Link>
        </Box>
      ) : (
        <>
{cart.map((item) => (
  <Paper
    key={item.id}
    sx={{
      p: 2,
      mb: 2,
      borderRadius: 2,
      boxShadow: 8,
    }}
  >
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }} // Switch layout for small screens
      alignItems="center"
      gap={2}
    >
      {/* Image */}
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{
          width: { xs: 100, sm: 100 },
          height: 100,
          borderRadius: 2,
          objectFit: 'cover',
        }}
      />
      
      {/* Title */}
      <Box flex="1" textAlign={{ xs: 'center', sm: 'left' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {item.title}
        </Typography>
      </Box>

      {/* Price */}
      <Typography
        variant="subtitle1"
        sx={{
          minWidth: 80,
          textAlign: 'center',
          display: { xs: 'none', sm: 'block' }, // Hide price in small screens, optional
        }}
      >
        ${item.price.toFixed(2)}
      </Typography>

      {/* Quantity Controls */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
      >
        <Button variant="outlined" onClick={() => decrement(item.id)}>-</Button>
        <Typography variant="body1" sx={{ mx: 1 }}>
          {item.quantity}
        </Typography>
        <Button variant="outlined" onClick={() => increment(item.id)}>+</Button>
      </Box>

      {/* Total Price */}
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="primary"
        sx={{
          minWidth: 80,
          textAlign: 'center',
          mt: { xs: 1, sm: 0 }, // Add top margin on small screens
        }}
      >
        ${(item.price * item.quantity).toFixed(2)}
      </Typography>

      {/* Delete Button */}
      <Button
        color="error"
        onClick={() => remove(item.id)}
        sx={{
          mt: { xs: 0, sm: 0 }, // Add top margin on small screens
        }}
      >
        <DeleteIcon />
      </Button>
    </Box>
  </Paper>
))}


          <Divider sx={{ my: 3 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
            <Typography variant="h6">Total Price</Typography>
            <Typography variant="h6" color="#006064">${Totalprice.toFixed(2)}</Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <Button variant="outlined" color="primary" size="large" onClick={addMore} startIcon={<AddIcon />}>
              Add More Art
            </Button>
            <Button variant="contained" color="primary" size="large" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
