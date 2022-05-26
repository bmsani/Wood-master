import React from 'react';
import proIcon from '../../assets/icon/progress-report (1).png'
import productIco from '../../assets/icon/new-product (1).png'
import reviewIco from '../../assets/icon/rating.png'
import deliveryIco from '../../assets/icon/checkout.png'

const BusinessSummery = () => {
    return (
        <div>
            <h1 className='text-5xl py-12 font-bold text-center text-error'>How we running our business</h1>
            <div className="grid grid-flow-row gap-10 lg:grid-flow-col lg:my-28">
                <div className='flex flex-col items-center'>
                    <img className='w-20' src={proIcon} alt="" />

                    <h1 className='text-6xl font-bold text-info'>400+</h1>
                    <h2 className='text-xl'>Prorgressive Report</h2>

                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-20' src={productIco} alt="" />

                    <h1 className='text-6xl font-bold text-info'>50+</h1>
                    <h2 className='text-xl'>Products</h2>

                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-20' src={reviewIco} alt="" />

                    <h1 className='text-6xl font-bold text-info'>900+</h1>
                    <h2 className='text-xl'>Customer Review</h2>

                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-20' src={deliveryIco} alt="" />

                    <h1 className='text-6xl font-bold text-info'>2700+</h1>
                    <h2 className='text-xl'>SuccessFull Delivery</h2>

                </div>
                
                
            </div>
        </div>
    );
};

export default BusinessSummery;