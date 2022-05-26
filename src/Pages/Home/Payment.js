import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';

const Payment = () => {
    const {id} = useParams();
    console.log(id);
    const { data: singleOrder, isLoading, refetch } = useQuery('singleOrder', () => fetch(`http://localhost:5000/order/${id}`,{
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if(isLoading){
        return <Loading></Loading>
    }
    console.log(singleOrder);
    return (
        <div>
            <h1>Payment {singleOrder?.price}</h1>
        </div>
    );
};

export default Payment;