import React from 'react';
import Bg from '../../assets/img/blog_01.jpg'


const Banner = () => {
    return (
        <div>
            <div class="hero min-h-screen" style={{
                background: `url(${Bg})`,
                backgroundSize: 'cover'
            }}>
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="hero-content text-left text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
                        <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button class="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;