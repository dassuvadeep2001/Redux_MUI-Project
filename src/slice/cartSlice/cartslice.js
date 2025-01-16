import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import base_url, { end_url } from '../../api/api';


let artApi = base_url + end_url.art; // Update the URL for the reviews API
console.log(artApi);
let artistApi = base_url + end_url.artist; // Update the URL for the reviews API
console.log(artistApi);


// Initial state of the cart slice
const initialState = {
  isLoading: false,
  isError: false,
  allitem: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  Totalprice: JSON.parse(localStorage.getItem("total")) || 0,
};

// Async thunk to fetch all art items from the API
export const AllArt = createAsyncThunk("art/AllArt", async () => {
  const res = await axios.get(artApi, artistApi);
  return res?.data; // Return the data from API response
});

// Slice creation to manage cart state and related actions
const cartSlice = createSlice({
  name: "art",
  initialState,
  reducers: {
    // Action to add a new art item to the cart
    additem: (state, { payload }) => {
      // Define new item structure with default quantity
      const newitem = {
        id: payload?.id,
        title: payload?.name || payload?.title,
        price: parseFloat(payload?.price),
        newprice: parseFloat(payload?.price),
        image: payload?.image,
        quantity: 1,
      };

      // Check if item already exists in the cart
      const itemind = state.cart.findIndex((item) => item.id === payload.id);
      
      // If item is not in the cart, add it as a new item
      if (itemind === -1) {
        state.cart.push(newitem);
      } else {
        // If item exists, increase quantity and update total price of that item
        state.cart = state.cart.map((item, ind) => {
          if (ind === itemind) {
            item.quantity++;
            item.newprice = item.quantity * item.price;
            return item;
          } else {
            return item;
          }
        });
      }
      
      // Update the total cart price, save cart and total price to local storage
      state.Totalprice += Math.floor(payload?.price);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.Totalprice));
    },

    // Action to increment quantity of a cart item
    incrementQty: (state, { payload }) => {
      state.cart = state.cart.map((item) => {
        if (item.id === payload) {
          item.quantity++;
          item.newprice = item.quantity * item.price;
          return item;
        } else {
          return item;
        }
      });
      
      // Recalculate total price based on updated quantities
      state.Totalprice = state.cart.reduce((accum, item) => {
        return accum + Math.floor(item.newprice);
      }, 0);
      
      // Save updated cart and total price to local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.Totalprice));
    },

    // Action to decrement quantity of a cart item
    decrementQty: (state, { payload }) => {
        state.cart = state.cart
          .map((item) => {
            if (item.id === payload) {
              item.quantity--;
              item.newprice = item.quantity * item.price;
            }
            return item;
          })
          .filter((item) => item.quantity > 0); // Remove items with quantity 0
      
      // Recalculate total price after decrementing quantity
      state.Totalprice = state.cart.reduce((accum, item) => {
        return accum + Math.floor(item.newprice);
      }, 0);
      
      // Update local storage with new cart and total price values
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.Totalprice));
    },

    // Action to remove an item from the cart
    deleteitem: (state, { payload }) => {
      // Filter out the item to be removed from the cart
      state.cart = state.cart.filter((item) => item.id !== payload);
      
      // Recalculate total price after removing the item
      state.Totalprice = state.cart.reduce((accum, item) => {
        return accum + Math.floor(item.newprice);
      }, 0);
      
      // Save updated cart and total price to local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.Totalprice));
    },

    clearCart: (state) => {
        state.cart = [];
        state.Totalprice = 0;
      },
  },
  
  // Extra reducers to handle async operations for fetching art items
  extraReducers: (builder) => {
    builder
      .addCase(AllArt.pending, (state) => {
        state.isLoading = true; // Set loading state when fetching starts
      })
      .addCase(AllArt.fulfilled, (state, { payload }) => {
        state.isLoading = false; // Remove loading state when fetching is complete
        state.allitem = payload; // Store fetched art items in the state
      })
      .addCase(AllArt.rejected, (state) => {
        state.isError = true; // Set error state if fetching fails
      });
  }
});

// Exporting action creators and reducer for usage in components
export const { additem, incrementQty, decrementQty, deleteitem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
