import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from '../layout/header/header';
import Footer from '../layout/footer/footer';
import Home from '../components/home/Home';
import ServicePage from '../components/service/service';
import AboutPage from '../components/about/about';
import RegistrationForm from '../user/registration/registration';
import Profile from '../user/profile/profile';
import BlogsPage from '../components/blogs/blogs';
import ArtistGallery from '../components/artist/artist';
import ReviewPage from '../components/review/review';
import ContactPage from '../components/contact/contact';
import ArtForm from '../components/sell/sell';
import ArtworkGallery from '../components/product/rightpart/allproduct';
import ArtByCategory from '../components/product/rightpart/categorywise/categorywise';
import Cart from '../components/add to cart/cart';
import QueryPage from '../components/querypage/query';
import PageNotFound from '../components/pnf/pnf';
import ProtectedRoute from './protectedRoute';

function Routing() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/artist" element={<ArtistGallery />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sell" element={<ArtForm />} />
        <Route path="/artwork" element={<ArtworkGallery />} />
        <Route path="/artwork/:type" element={<ArtByCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/queries"
          element={
            <ProtectedRoute>
              <QueryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Routing;
