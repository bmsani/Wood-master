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
                <div className="hero-content text-left text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;