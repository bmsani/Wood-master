import cogoToast from 'cogo-toast';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const ManageUsers = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'Get',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleAdmin = email => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    cogoToast.error('Failed to make admin');
                }
                return res.json()
            })
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch();
                    cogoToast.success('Successfully made an admin');
                }
            })
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((user, index) => <tr key={user._id} className={`${index % 2 === 0 && 'active'}`}>
                            <th>{index + 1}</th>
                            <td>{user.email}</td>
                            {
                                user.role !== 'admin'
                                &&
                                <td>
                                    <button onClick={() => handleAdmin(user.email)} className='btn btn-xs'> Make Admin </button>
                                </td>
                            }
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;