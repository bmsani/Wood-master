import React from 'react';
import { useNavigate } from 'react-router-dom';

const SingleProduct = ({ product }) => {
    const {_id, name, price, minQuantity, availableQuantity, description, img } = product;
    const slicedDesc = description.length > 20 ? description.slice(1,20) : description;
    const navigate = useNavigate();

    const handleBuyNow = id => {
        navigate(`/purchase/${id}`)
    } 

    return (
        <div className=''>
            <div class="card bg-base-100 shadow-xl">
                <figure><img className='w-[460px] h-[502px]' src={img} alt="Tools" /></figure>
                <div class="card-body">
                    <h2 class="card-title text-2xl text-secondary">{name}</h2>
                    <p> <span className='text-xl font-bold text-neutral'>Price: $ </span>{price}</p>
                    <p> <span className='text-xl font-bold text-neutral'>Minimum order: $ </span>{minQuantity}</p>
                    <p> <span className='text-xl font-bold text-neutral'>Available quantity: $ </span>{availableQuantity}</p>
                    <p> <span className='text-xl font-bold text-neutral'>Description: $ </span>{slicedDesc}</p>
                    <div class="card-actions justify-end">
                        <button onClick={() => handleBuyNow(_id)} class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;