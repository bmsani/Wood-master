import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyOrders = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth);
    const email = user?.email;
    const [orders, setOrders] = useState([])


    useEffect(() => {
        const url = `https://quiet-chamber-70480.herokuapp.com/userOrder?email=${email}`
        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [email])
    const handlePay = id => {
        navigate(`/order/${id}`)
    }
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
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
                        <td>$ {order.price}/=</td>
                        <td>
                            {
                                order.paymentStatus
                                    ?
                                    'Paid'
                                    :
                                    <>
                                        <span>Unpaid</span>
                                        <button onClick={() => handlePay(order._id)} className='btn btn-sm btn-info text-white mx-2'>Pay now</button>
                                    </>
                            }
                        </td>

                    </tr>)
                }

            </tbody>
        </table>
    );
};

export default MyOrders;