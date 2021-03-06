import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth)

    const handleSignOut = () => {
        localStorage.removeItem('accessToken')
        signOut(auth);
    }
    const menuItem = <>
        <li><NavLink to="/myPortfolio">My Portfolio</NavLink></li>
        <li><NavLink to="/blog">Blog</NavLink></li>
        <li><NavLink to="/purchase/id">Purchase</NavLink></li>
        {
            user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        }
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <NavLink to="/"> <button className="btn btn-ghost normal-case text-2xl lobsterFont text-error">Wood Master</button> </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItem}
                </ul>
            </div>
            <div className="navbar-end">

                {
                    user ?

                        <div className="flex flex-row w-full justify-end">
                            <div className="grid card place-items-center">{user.displayName}</div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className="grid card place-items-center"> <button onClick={handleSignOut} className='btn btn-ghost'> Sign Out</button> </div>
                        </div>
                        :
                        <button className='btn btn-ghost'> <Link to='/login'>Login</Link></button>

                }
            </div>
        </div>
    );
};

export default Navbar;