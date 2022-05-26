import React from 'react';
import Bg from '../../assets/img/blog_01.jpg'


const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{
                background: `url(${Bg})`,
                backgroundSize: 'cover'
            }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold">Welcome to <span className='lobsterFont text-error'>WoodMaster</span></h1>
                        <p className="mb-5">Here you can buy Wood working parts for your wholesale or Retail shop/business. We have world wide shipping & payment service so you don't have to worry about payment and product delivery. </p>
                        <button className="btn btn-info text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;