import cogoToast from 'cogo-toast';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const AddReview = () => {
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    if (loading) {
        return <Loading></Loading>
    }

    const onSubmit = async (data) => {
        console.log(data);
        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)

        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    cogoToast.success('Successful', { heading: 'Review Added', position: 'top-right' });
                    reset();
                }
            })
    }

    return (
        <div className=''>

            <div className="card w-96 lg:w-2/4 mx-auto bg-base-100 shadow-xl">
                <h1 className='text-center text-2xl font-bold'>Write your review here</h1>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-1">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" value={email} placeholder="Type email" className="input input-bordered w-full"
                                {...register("email")}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Give a between 0 to 5</span>
                            </label>
                            <input type="number" placeholder="Rating" className="input input-bordered w-full"
                                {...register("rating", { min: 0, max: 5 }, {
                                    required: {
                                        value: true,
                                        message: "Phone number is required"
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.rating?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Your Review</span>
                            </label>
                            <textarea type="text" placeholder="Review message" className="input input-bordered w-full h-24"
                                {...register("review", {
                                    required: {
                                        value: true,
                                        message: "Review is required"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.review.message}</span>}
                            </label>
                        </div>



                        <input type="submit" value={"submit"} placeholder="Type here" className="w-full lg:w-1/4 mx-auto btn border-t-zinc-90" />
                    </form>
                </div>
            </div>


        </div>
    );
};

export default AddReview;