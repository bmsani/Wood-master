import React from 'react';
import { useNavigate } from 'react-router-dom';

const SingleProduct = ({ product, children }) => {
    const { _id, name, price, minQuantity, availableQuantity, description, img } = product;
    const slicedDesc = description.length > 20 ? description.slice(0, 20) : description;


    return (
        <div className=''>
            <div className="card bg-base-100 shadow-xl">
                <figure><img className='w-[460px] h-[502px]' src={img} alt="Tools" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl text-secondary">{name}</h2>
                    <p> <span className='text-xl font-bold text-neutral'>Price: $ </span>{price}</p>
                    <p> <span className='text-xl font-bold text-neutral'>Minimum order:  </span>{minQuantity}</p>
                    <p> <span className='text-xl font-bold text-neutral'>Available quantity:  </span>{availableQuantity}</p>
                    <p> <span className='text-xl font-bold text-neutral'>Description: $ </span>{slicedDesc}</p>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;