import React from 'react';
import { useNavigate } from 'react-router-dom';

const HandleBtn = ({ id }) => {
    console.log(id);
    const navigate = useNavigate();
    
    const handleBuyNow = id => {
        navigate(`/purchase/${id}`)
    }
    return (
        <div className="card-actions justify-end">
            <button onClick={() => handleBuyNow(id)} className="btn btn-primary">Buy Now</button>
        </div>
    );
};

export default HandleBtn;