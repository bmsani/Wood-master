import cogoToast from 'cogo-toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgBbKey = 'b8623ae84b8ddec30bf73b1abc12cd47';

    const onSubmit = async (data) => {
        if (data.minQuantity > data.availableQuantity) {
            return Swal.fire({
                title: 'Error!',
                text: 'Available Quantity have to be more than minimum quantity',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        const image = data.productImg[0];
        const formData = new FormData()
        formData.append("image", image)
        const url = `https://api.imgbb.com/1/upload?key=${imgBbKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const product = {
                        name: data.name,
                        price: data.price,
                        minQuantity: data.minQuantity,
                        availableQuantity: data.availableQuantity,
                        description: data.description,
                        img: img
                    }

                    fetch('http://localhost:5000/product', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product)

                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                cogoToast.success('Successful', { heading: 'Product Added', position: 'top-right' });
                                reset();
                            }
                        })
                }
            })
    }
    return (
        <div>
            <h1 className="text-4xl text-center font-bold pb-5">Add Product</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-1 justify-center">

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Product name</span>
                    </label>
                    <input type="text" placeholder="Product Name" className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Price</span>
                    </label>
                    <input type="number" placeholder="Product price $" className="input input-bordered w-full max-w-xs"
                        {...register("price", {
                            required: {
                                value: true,
                                message: "Price is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Minimum Purchase Quantity</span>
                    </label>
                    <input type="number" placeholder="Minimum Purchase Quantity" className="input input-bordered w-full max-w-xs"
                        {...register("minQuantity", {
                            required: {
                                value: true,
                                message: "Price is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.minQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minQuantity.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Available Product Quantity</span>
                    </label>
                    <input type="number" placeholder="Available Product Quantity" className="input input-bordered w-full max-w-xs"
                        {...register("availableQuantity", {
                            required: {
                                value: true,
                                message: "Price is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.availableQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.availableQuantity.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Product Description</span>
                    </label>
                    <textarea type="number" placeholder="Product Short Details" className="input input-bordered w-full max-w-xs"
                        {...register("description", {
                            required: {
                                value: true,
                                message: "Price is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Product Image</span>
                    </label>
                    <input type="file" placeholder="Product Short Details" className=""
                        {...register("productImg", {
                            required: {
                                value: true,
                                message: "Image is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.productImg?.type === 'required' && <span className="label-text-alt text-red-500">{errors.productImg.message}</span>}
                    </label>
                </div>



                <input type="submit" value={"submit"} placeholder="Type here" className="w-full max-w-xs btn border-t-zinc-90" />
            </form>
            </div>
        </div>
    );
};

export default AddProduct;