import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const Reviews = () => {
    const { data: reviews, isLoading } = useQuery('reviews', () => fetch('https://quiet-chamber-70480.herokuapp.com/review').then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const reviewsReverse = reviews.map(product => product).reverse();
    const slicedReviews = reviewsReverse.slice(0, 6);



    return (
        <div>
            <h1 className='text-5xl text-center font-bold text-error py-10'>Customer Reviews</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 w-10/12 mx-auto'>
                {
                    slicedReviews?.map(review => <div className="card w-96 bg-base-100 shadow-xl mt-8">
                        <div className="card-body">
                            <h2 className="card-title text-info"> <span className='text-black'>Email : </span>{review.email}</h2>
                            <p> <span className='font-bold'>Customer Rating :</span> {review.rating}</p>
                            <p className='min-h-[80px]'> <span className='font-bold'>Customer Review :</span> {review.review.length > 20 ? review.review.slice(0, 100) : review.review}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Reviews;