import React from 'react';

const NotFound = () => {
    return (
        <div className='flex justify-center flex-col items-center pt-5'>
            <img className='max-w-sm' src="https://i.ibb.co/pbzCWhK/404.png" alt="" />
            <p className="text-5xl sm:text-9xl font-bold">Page Not Found</p>
        </div>
    );
};

export default NotFound;