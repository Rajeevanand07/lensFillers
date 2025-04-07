// import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';


const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This is where the page content will be rendered */}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Layout;
