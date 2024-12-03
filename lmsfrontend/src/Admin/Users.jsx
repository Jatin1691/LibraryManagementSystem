
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IconCategory2 } from '@tabler/icons-react';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

  
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <div className="flex items-center">
                    <IconCategory2 className="text-2xl text-gray-700"/>
                    <h1 className="ml-4 text-xl font-semibold text-green-700">User Management</h1>
                </div>
                <div>
                    <img className="w-10 h-10 rounded-full" src="../book4.jpg" alt="logo" />
                </div>
            </div>

            <div className="p-6">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">User ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">User Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Email Address</th>
                            <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Contact</th>
                            <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Number of Borrows</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users.map(user => (
                            <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-100">
                                <td className="px-4 py-3 text-sm">{user.id}</td>
                                <td className="px-4 py-3 text-sm">{user.name}</td>
                                <td className="px-4 py-3 text-sm">{user.email}</td>
                                <td className="px-4 py-3 text-sm">{user.phoneNumber}</td>
                                <td className="px-4 py-3 text-sm">{user.numBookBorrowed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}

export default Users;
