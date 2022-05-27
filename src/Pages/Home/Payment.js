import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe('pk_test_51L3x3jKlM1XN8pMPU6eicHYOuir9vrVMsgS35YGw1QyIhWtV2Le0WO7tzd8ZKK76ppgYyn1C7KoZrt2aTzc2qZ1a00XEYZFPMF');

const Payment = () => {
    const { id } = useParams();
    const { data: singleOrder, isLoading, refetch } = useQuery('singleOrder', () => fetch(`http://localhost:5000/order/${id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    const { email, price, quantity, productName, img, paymentStatus } = singleOrder;
    console.log(email, price, quantity, productName, img, paymentStatus);
    return (
        <div>
            <div className='grid grid-flow-col justify-evenly h-[79vh] items-center'>
                <div>
                    <div class="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img src={img} alt="Shoes" /></figure>
                        <div class="card-body">
                            <h2 class="card-title text-info capitalize text-2xl">{productName}</h2>
                            <p className=' text-xl'><span className='font-bold text-error'>Email: </span>{email}</p>
                            <p className=' text-xl'><span className='font-bold text-error'>Product Quantity: </span>{quantity}</p>
                            <p className=' text-xl'><span className='font-bold text-error'>Payment amount: </span>{price}</p>

                        </div>
                    </div>
                </div>
                <div>
                    <div class="card w-96 bg-base-100 shadow-xl">
                        <div class="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckOutForm></CheckOutForm>
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;