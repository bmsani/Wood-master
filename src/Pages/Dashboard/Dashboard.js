import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
        <h1 className='text-5xl text-primary'>Dashboard</h1>
    <Outlet></Outlet>
    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li><Link to='/dashboard'> My Orders </Link></li>
      <li><Link to='/dashboard/addReview'> Add Review </Link></li>
      <li><Link to='/dashboard/myProfile'> My Profile </Link></li>
      <li><Link to='/dashboard/manageOrder'> Manage All Orders </Link></li>
      <li><Link to='/dashboard/addProduct'> Add a Product </Link></li>
      <li><Link to='/dashboard/manageUser'> Manage Users </Link></li>
      <li><Link to='/dashboard/manageProducts'> Manage Products </Link></li>
      
      
    </ul>
  
  </div>
</div>
    );
};

export default Dashboard;