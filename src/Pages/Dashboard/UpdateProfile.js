import cogoToast from 'cogo-toast';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const currentUser = user.email;
    const userMail = user?.email;
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgBbKey = 'b8623ae84b8ddec30bf73b1abc12cd47';


    const { data: singleUsers, isLoading, refetch } = useQuery('singleUsers', () => fetch(`http://localhost:5000/singleUser?email=${userMail}`).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>

    }
    console.log(singleUsers);
    const { email, role, name, img, education, location, phone, linkedin } = singleUsers[0];

    const onSubmit = async (data) => {
        const image = data.userImg[0];
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
                    const updateUser = {
                        name: data.name,
                        role: data.role,
                        email: data.email,
                        education: data.education,
                        location: data.location,
                        phone: data.phone,
                        img: img
                    }

                    fetch(`http://localhost:5000/singleUser/${currentUser}`, {
                        method: "PUT",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateUser)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                cogoToast.success('Successful', { heading: 'Profile Update', position: 'top-right' });
                                reset();
                                navigate('/dashboard/myProfile')
                            }
                        })
                }
            })
    }
    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-1">

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
                        <span className="label-text font-bold">Role</span>
                    </label>
                    <input value={role || 'User'} type="text" placeholder="Product price $" className="input input-bordered w-full max-w-xs"
                        {...register("role")}
                    />
                    {/* <label className="label">
                        {errors.role?.type === 'required' && <span className="label-text-alt text-red-500">{errors.role.message}</span>}
                    </label> */}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" value={email} placeholder="Type email" className="input input-bordered w-full max-w-xs"
                        {...register("email")}
                    />
                    {/* <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label> */}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Education</span>
                    </label>
                    <input type="text" placeholder="Your education" className="input input-bordered w-full max-w-xs"
                        {...register("education", {
                            required: {
                                value: true,
                                message: "education is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.education?.type === 'required' && <span className="label-text-alt text-red-500">{errors.education.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Location</span>
                    </label>
                    <input type="text" placeholder="Your city" className="input input-bordered w-full max-w-xs"
                        {...register("location", {
                            required: {
                                value: true,
                                message: "location is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.location?.type === 'required' && <span className="label-text-alt text-red-500">{errors.location.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Phone</span>
                    </label>
                    <input type="number" placeholder="Your Phone" className="input input-bordered w-full max-w-xs"
                        {...register("phone", {
                            required: {
                                value: true,
                                message: "Phone number is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Linkedin</span>
                    </label>
                    <input type="text" placeholder="Linkedin link" className="input input-bordered w-full max-w-xs"
                        {...register("profLink", {
                            required: {
                                value: true,
                                message: "Linkedin is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.profLink?.type === 'required' && <span className="label-text-alt text-red-500">{errors.profLink.message}</span>}
                    </label>
                </div>



                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Profile Picture</span>
                    </label>
                    <input type="file" placeholder="Product Short Details" className=""
                        {...register("userImg", {
                            required: {
                                value: true,
                                message: "Image is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.userImg?.type === 'required' && <span className="label-text-alt text-red-500">{errors.userImg.message}</span>}
                    </label>
                </div>



                <input type="submit" value={"submit"} placeholder="Type here" className="w-full max-w-xs btn border-t-zinc-90" />
            </form>
        </div>
    );
};

export default UpdateProfile;