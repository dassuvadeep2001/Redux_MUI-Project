import React from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Header from '../layout/header/header'
import Footer from '../layout/footer/footer'
import Home from '../components/home/Home'
import ServicePage from '../components/service/service'
import AboutPage from '../components/about/about'
import RegistrationForm from '../user/registration/registration'
import Profile from '../user/profile/profile'
import BlogsPage from '../components/blogs/blogs'
import ArtistGallery from '../components/artist/artist'
import ReviewPage from '../components/review/review'
import ContactPage from '../components/contact/contact'
import { Grid } from '@mui/material'
import ArtCategoryList from '../components/product/leftpart/leftpart'
import ArtForm from '../components/sell/sell'
import ArtworkGallery from '../components/product/rightpart/allproduct'
import ArtByCategory from '../components/product/rightpart/categorywise/categorywise'
import CartPage from '../components/add to cart/cart'
import AddToCartPage from '../components/add to cart/cart'
import Cart from '../components/add to cart/cart'
import QueryPage from '../components/querypage/query'
import PageNotFound from '../components/pnf/pnf'

function Routing() {
  return (
    <Router>
      <Header/>
        <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/service" element={<ServicePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/signup" element={<RegistrationForm/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/blogs" element={<BlogsPage/>}/>
        <Route path="/artist" element={<ArtistGallery/>}/>
        <Route path="/review" element={<ReviewPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/sell" element={<ArtForm/>}/> 
        <Route path="/artwork" element={
        <Grid container spacing={2}>
          <Grid item xs={0} sm={0} md={0}>
            <ArtCategoryList />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <ArtworkGallery/>
          </Grid>
        </Grid>
      } />
      <Route path="/artwork/:type" element={
        <Grid container spacing={2}>
          <Grid item xs={0} sm={0} md={0}>
            <ArtCategoryList />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <ArtByCategory/>
          </Grid>
        </Grid>
      } />
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/queries" element={<QueryPage/>}/>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default Routing