import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import SingleProduct from './SingleProduct';


const Products = () => {
    const { data: products, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/product').then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const productReverse = products.map(product => product).reverse();
    const slisedProduct = productReverse.slice(0,6);


    return (
        <div>
            <p className='font-bold text-4xl text-center'>Choose your Tools</p>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    slisedProduct.map(product => <SingleProduct key={product._id} product={product}></SingleProduct>)
                }
            </div>
        </div>
    );
};

export default Products;