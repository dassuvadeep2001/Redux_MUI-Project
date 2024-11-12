import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authslice/authslice";
import artistReducer from "../slice/artistslice/artistslice"
import reviewReducer from "../slice/reviewslice/reviewslice"
import artCategoryReducer from "../slice/artworkslice/categoryslice/categoryslice"
import artReducer from "../slice/artworkslice/artslice/artslice"
import cartReducer from "../slice/cartSlice/cartslice"
import queriesReducer from "../slice/contactslice/constactslice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        artist:artistReducer,
        review:reviewReducer,
        category: artCategoryReducer,
        art:artReducer,
        cart:cartReducer,
        contact: queriesReducer
    }
})
export default store