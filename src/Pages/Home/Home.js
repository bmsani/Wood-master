import React from 'react';
import Banner from './Banner';
import BusinessSummery from './BusinessSummery';
import ContactUs from './ContactUs';
import HeroSection from './HeroSection';
import Products from './Products';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HeroSection></HeroSection>
            <Products></Products>
            <BusinessSummery></BusinessSummery>
            <Reviews></Reviews>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;