import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import HandleBtn from './HandleBtn';
import SingleProduct from './SingleProduct';


const Products = () => {
    const { data: products, isLoading } = useQuery('users', () => fetch('http://localhost:5000/product').then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const productReverse = products?.map(product => product).reverse();
    const slicedProduct = productReverse.slice(0, 6);

    console.log(slicedProduct);

    return (
        <div>
            <p className='font-bold text-5xl text-center py-10 text-error'>Choose your Tools</p>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:w-11/12 mx-auto'>
                {
                    slicedProduct?.map(product => <SingleProduct key={product._id} product={product}>
                    <HandleBtn id={product._id}></HandleBtn>
                    </SingleProduct>)
                }
            </div>
        </div>
    );
};

export default Products;