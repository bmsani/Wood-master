import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import blankImg from '../../assets/icon/user.png'
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const userMail = user?.email;
    const { data: singleUsers, isLoading, refetch } = useQuery('singleUsers', () => fetch(`http://localhost:5000/singleUser?email=${userMail}`,{
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(singleUsers);
    const { email, role, name, img, education, location, phone, linkedin } = singleUsers[0];

    const handleUpdateProfile = () => {
        navigate('/dashboard/updateProfile')
    }
    return (
        <div className='mt-10'>
            <div className="card w-10/12 mx-auto bg-base-100 shadow-xl">
                <div className="avatar w-96 lg:w-[40vh] mx-auto mt-5">
                    <div className="rounded">
                        <img className='' src={img ? img : blankImg} alt="" />
                    </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-4xl font-bold mx-auto">Name: {user.displayName || name || 'Not Available' }</h2>
                    <p> <span className="text-xl text-neutral font-bold">Role : </span> {role || 'User'}</p>
                    <p> <span className="text-xl text-neutral font-bold">Email : </span> {email}</p>
                    <p> <span className="text-xl text-neutral font-bold">Education : </span> {education || 'Not Available'}</p>
                    <p> <span className="text-xl text-neutral font-bold">Location : </span>{location || 'Not Available'}</p>
                    <p> <span className="text-xl text-neutral font-bold">Phone : </span> {phone || 'Not Available'}</p>
                    <p> <span className="text-xl text-neutral font-bold">Linkedin Profile : </span> <span className="btn-link">{education || 'Not Available'}</span>
                    </p>
                    <button onClick={handleUpdateProfile} className='btn btn-primary w-full lg:w-1/4 mx-auto'>Update Profile</button>




                </div>
            </div>
        </div>
    );
};

export default MyProfile;