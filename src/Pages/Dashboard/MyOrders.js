import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`http://localhost:5000/order?email=${email}`, {
        method: 'Get',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }

    // const {price,quantity,img,productName,price,} = 
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Payment Status</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders && orders.map((order, index) => <tr key={order._id} className={`${index % 2 === 0 && 'active'}`}>
                        <th>{index + 1}</th>
                        <td>
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={order.img} alt='' />
                                </div>
                            </div>
                        </td>
                        <td>{order.productName}</td>
                        <td>{order.quantity}</td>
                        <td>{order.paymentStatus? 'Paid':'unpaid'}</td>
                        <td>$ {order.price}/=</td>

                    </tr>)
                }

            </tbody>
        </table>
    );
};

export default MyOrders;