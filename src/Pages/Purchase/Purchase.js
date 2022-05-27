import cogoToast from 'cogo-toast';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import SingleProduct from '../Home/SingleProduct';
import Loading from '../Shared/Loading';

const Purchase = () => {
    const { id } = useParams()
    const [user] = useAuthState(auth);
    const email = user?.email;
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { data: singleProduct, isLoading, refetch } = useQuery('singleProduct', () => fetch(`https://quiet-chamber-70480.herokuapp.com/singleProduct/${id}`, {
        headers: {

            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    const { _id, name, price, minQuantity, availableQuantity, description, img } = singleProduct;


    const onSubmit = async (data) => {
        const setQuantity = availableQuantity - parseInt(data.purchaseQte)
        const newQuantity = { availableQuantity: setQuantity };

        if (availableQuantity > parseInt(data.purchaseQte)) {
            fetch(`https://quiet-chamber-70480.herokuapp.com/product/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(newQuantity)
            })
                .then(res => res.json())
                .then(updated => {
                    if (updated.modifiedCount) {
                        const totalPrice = price * parseInt(data.purchaseQte)
                        const order = {
                            email: email,
                            price: totalPrice,
                            quantity: parseInt(data.purchaseQte),
                            productName: name,
                            img: img,
                            paymentStatus: false
                        }
                        fetch(`https://quiet-chamber-70480.herokuapp.com/order`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            },
                            body: JSON.stringify(order)
                        })
                            .then(res => res.json())
                            .then(inserted => {
                                if (inserted.insertedId) {
                                    console.log(inserted);
                                    refetch();
                                    reset()
                                    Swal.fire({
                                        title: 'Order Successful',
                                        text: "Ready For Payment?",
                                        icon: 'success',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: "Let's Go"
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            navigate(`/order/${inserted.insertedId}`)
                                        }
                                    })
                                }
                            })
                    }
                })
        }
        else {
            cogoToast.error('please select lower than maximum quantity')
        }


    }
    return (
        <div>
            <h1 className='text-4xl text-center font-bold'>Purchase page</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 items-center w-11/12 mx-auto'>
                <div className="w-2/4">
                    <SingleProduct product={singleProduct}></SingleProduct>
                </div>
                <div>
                    <div className=''>

                        <div className="card w-96 lg:w-2/4 mx-auto bg-base-100 shadow-xl">
                            <h1 className='text-center text-2xl font-bold'>Write your review here</h1>
                            <div className="card-body">
                                {
                                    minQuantity > availableQuantity
                                        ?
                                        <h1 className="text-4xl text-center">Product not Available.</h1>
                                        :
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
                                                    <span className="label-text font-bold">Minimum order Quantity {minQuantity} & maximum {availableQuantity}</span>
                                                </label>
                                                <input type="number" placeholder="Order Quantity" className="input input-bordered w-full"
                                                    {...register("purchaseQte", {
                                                        required: {
                                                            value: true,
                                                            message: "Purchase Quantity is required"
                                                        },
                                                    })}
                                                />
                                                <label className="label">
                                                    {errors.purchaseQte?.type === 'required' && <span className="label-text-alt text-red-500">{errors.purchaseQte.message}</span>}
                                                </label>
                                            </div>

                                            <input type="submit" value={"submit"} placeholder="Type here" className="w-full lg:w-1/4 mx-auto btn border-t-zinc-90" />
                                        </form>
                                }
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    );
};

export default Purchase;