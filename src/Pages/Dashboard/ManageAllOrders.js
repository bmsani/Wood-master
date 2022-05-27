import React from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import Loading from '../Shared/Loading';

const ManageAllOrders = () => {
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`https://quiet-chamber-70480.herokuapp.com/order`, {
        method: 'Get',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://quiet-chamber-70480.herokuapp.com/order/${id}`
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    const handleShipping = id => {
        const shippinStatus = { shipped: true };
        fetch(`https://quiet-chamber-70480.herokuapp.com/order/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(shippinStatus)
        })
            .then(res => res.json())
            .then(updated => {
                if (updated.modifiedCount) {
                    Swal.fire(
                        'Product Shipped',
                        'success'
                    )
                    refetch();
                }
            })
    }
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
                    <th>Action</th>
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
                        <td>{order.paymentStatus ? 'Paid' : 'unpaid'}</td>
                        <td>$ {order.price}/=</td>
                        <td>
                            <div className='grid grid-flow-col gap-2'>
                                {
                                    order.paymentStatus
                                        ?
                                        <button className='btn btn-xs btn-error btn-disabled'>Delete</button>
                                        :
                                        <button onClick={() => handleDelete(order._id)} className='btn btn-xs btn-error'>Delete</button>
                                }
                                {
                                    order.paymentStatus && !order.shipped
                                        ?
                                        <button onClick={() => handleShipping(order._id)} className='btn btn-xs btn-success'>Ship</button>
                                        :
                                        <button className='btn btn-xs btn-success btn-disabled'>Ship</button>
                                }

                            </div>
                        </td>

                    </tr>)
                }

            </tbody>
        </table>
    );
};

export default ManageAllOrders;