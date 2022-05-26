import React from 'react';
import workerimg from '../../assets/img/blog-1-1.jpg'

const HeroSection = () => {
    return (
        <div>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="avatar">
                        <div class="w-96 rounded-xl">
                            <img src={workerimg} alt='' />
                        </div>
                    </div>
                    <div>
                         <p className='text-error text-sm'>Our Journey</p>
                        <h1 class="text-5xl font-bold">Welcome to Our Wood Master Services</h1>
                        <p class="py-6">We, at Wood Master we provide all types of carpentry parts. We have Over 20 Years’ Experience Providing Top Quality Carpentry Across world accross the world </p>
                        <button class="btn btn-info text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;