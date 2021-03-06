import cogoToast from 'cogo-toast';
import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    if (user) {
        console.log(user);
    }
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [token] = useToken(user || gUser)
    
    
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true })
        }
    }, [from, navigate, token])
    if (loading || gLoading) {
        return <Loading></Loading>
    }
    if(error || gError){
        cogoToast.error(`${error.message || gError.message}`, {heading:'Error',position:'top-right'})
    }
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    return (
        <div className="card w-96 m-auto bg-base-100 shadow-xl mt-9">
            <h1 className='text-center text-primary text-4xl font-bold'>Login</h1>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Type here" className="input input-bordered w-full max-w-xs"
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
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Type Password" className="input input-bordered w-full max-w-xs"
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
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                    </div>

                    <input type="submit" value={"submit"} placeholder="Type here" className="w-full max-w-xs btn border-t-zinc-90" />
                </form>
                <p>New to Wood-Master <Link to='/register' className='btn btn-link lowercase'> register here</Link> </p>
                <div className="divider">OR</div>

                <button onClick={() => signInWithGoogle()} className='btn btn-info capitalize text-white'> Sign Up with Google</button>
            </div>

        </div>
    );
};

export default Login;