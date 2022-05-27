import React from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import Loading from '../Shared/Loading';

const ManageProducts = () => {
    const { data: products, isLoading, refetch } = useQuery('users', () => fetch('https://quiet-chamber-70480.herokuapp.com/product').then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = id => {
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
                const url = `https://quiet-chamber-70480.herokuapp.com/product/${id}`
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
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product, index) =>
                                <tr className={`${index % 2 === 0 && 'active'}`}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.img} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td><button onClick={() => handleDelete(product._id)} className='btn btn-primary'>Delete</button></td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;