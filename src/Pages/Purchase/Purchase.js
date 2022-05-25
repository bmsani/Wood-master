import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';

const Purchase = () => {
    const {id} = useParams()
    const {data:singleProduct, isLoading, refetch} = useQuery('singleProduct', () => fetch(`http://localhost:5000/singleProduct/${id}`).then(res => res.json()))

    if(isLoading){
        return <Loading></Loading>
    }
    const{name,price} = singleProduct;
    return (
        <div>
            <h1>Purchase page {name}</h1>
        </div>
    );
};

export default Purchase;