import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <h1 className='text-5xl text-primary'>Dashboard</h1>
                <Outlet></Outlet>
                <label for="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label for="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">

                    {
                        admin
                            ?
                            <>
                                <li><Link to='/dashboard/myProfile'> My Profile </Link></li>
                                <li><Link to='/dashboard/manageOrder'> Manage All Orders </Link></li>
                                <li><Link to='/dashboard/addProduct'> Add a Product </Link></li>
                                <li><Link to='/dashboard/manageUser'> Manage Users </Link></li>
                                <li><Link to='/dashboard/manageProducts'> Manage Products </Link></li>
                            </>
                            :
                            <>
                                <li><Link to='/dashboard'> My Orders </Link></li>
                                <li><Link to='/dashboard/addReview'> Add Review </Link></li>
                                <li><Link to='/dashboard/myProfile'> My Profile </Link></li>
                            </>}



                </ul>

            </div>
        </div>
    );
};

export default Dashboard;