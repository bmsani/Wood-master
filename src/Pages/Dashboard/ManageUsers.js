import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const ManageUsers = () => {
    const {data:users, isLoading, refetch} = useQuery('users', () => fetch('http://localhost:5000/user').then(res => res.json()))
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className="text-9xl">Manage users {users.length}</h1>
        </div>
    );
};

export default ManageUsers;