import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, profError] = useUpdateProfile(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if(user || gUser){
            navigate(from,{replace:true})
        }
    },[from, user, navigate, gUser])

    if(loading || gLoading){
        return <Loading></Loading>
    }

    const onSubmit = async (data) => {

        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name })
        console.log('update done');
    };
    return (

        <div class="card w-96 m-auto bg-base-100 shadow-xl mt-9">
            <h1 className='text-center text-primary text-4xl font-bold'>Sign Up</h1>
            <div class="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">

                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text font-bold">Name</span>
                        </label>
                        <input type="text" placeholder="Your Name" class="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name is required"
                                }
                            })}
                        />
                        <label class="label">
                            {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="Your Email" class="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is Required"
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: "Provide a valid Email"
                                }
                            })}
                        />
                        <label class="label">
                            {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text font-bold">Password</span>
                        </label>
                        <input type="password" placeholder="Type Password" class="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is Required"
                                },
                                minLength: {
                                    value: 6,
                                    message: "Must be 6 characters or longer"
                                }
                            })}
                        />
                        <label class="label">
                            {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                    </div>

                    <input type="submit" value={"submit"} placeholder="Type here" class="w-full max-w-xs btn border-t-zinc-90" />
                </form>
                <p>Already Registered?<Link to="/login" className='btn btn-link lowercase'>login here</Link> </p>
                <div class="divider">OR</div>

                <button onClick={() => signInWithGoogle()} className='btn btn-info capitalize text-white'> Sign Up with Google</button>
            
        </div>
        </div >
    );
};

export default Register;

