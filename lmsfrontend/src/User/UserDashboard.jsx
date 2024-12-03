import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';


function Dashboard() {
    // get books
    const [books, setBooks] = useState([]);
    const [bookStatuses, setBookStatuses] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/books')
            .then(response => {
                setBooks(response.data);
                // hide the request button
                axios.get('http://localhost:8080/requests')
                    .then(response => {
                        const statusDict = response.data.reduce((acc, request) => {
                            const bookId = request.book.id;
                            const status = request.status;
                            acc[bookId] = status;
                            return acc;
                        }, {});
                        setBookStatuses(statusDict);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const userId = sessionStorage.getItem('userId');
    const [userName, setUserName] = useState("");

    // get user
    useEffect(() => {
        axios.get('http://localhost:8080/users/' + userId)
            .then(response => {
                setUserName(response.data.name);
            });
    }, [userId]);

    // borrow book
    const handleBorrow = (id) => {
        axios.post('http://localhost:8080/borrow', { user: { id: userId }, book: { id: id } })
            .then(response => {
                console.log(response.data);
                axios.post('http://localhost:8080/requests', { user: { id: userId }, book: { id: id } })
                    .then(response => {
                        toast.success("Book requested");
                       
                    }).catch(error => {
                        toast.error("Unable to request");
                    });
            })
            .catch(error => {
                toast.error("Failed, max 2 request");
                console.log(error);
            });
    };

 

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-green-600">Hello, {userName}</h3>
                <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src="../book4.jpg" alt="User Logo" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="px-4 py-2 border border-gray-300">Serial Number</th>
                            <th className="px-4 py-2 border border-gray-300">Book ID</th>
                            <th className="px-4 py-2 border border-gray-300">Book Name</th>
                            <th className="px-4 py-2 border border-gray-300">Quantity</th>
                            <th className="px-4 py-2 border border-gray-300">Availability</th>
                            <th className="px-4 py-2 border border-gray-300">Description</th>
                            <th className="px-4 py-2 border border-gray-300">Request Books</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border border-gray-300">{book.serialNumber}</td>
                                <td className="px-4 py-2 border border-gray-300">{book.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{book.bookTitle}</td>
                                <td className="px-4 py-2 border border-gray-300">{book.quantity}</td>
                                <td className="px-4 py-2 border border-gray-300">{book.availability}</td>
                                <td className="px-4 py-2 border border-gray-300">{book.description}</td>
                              
                                <td className="px-4 py-2 border border-gray-300">
                                    {bookStatuses[book.id] === 'REQUESTED' ? (
                                        <span className="text-yellow-500">Requested</span>
                                    ) : (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                            type="button"
                                            onClick={() => handleBorrow(book.id)}
                                        >
                                            Request
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
