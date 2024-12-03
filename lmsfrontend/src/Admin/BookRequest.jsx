
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IconCategory2 } from '@tabler/icons-react';

function BookRequests() {
    const [borrow, setBorrow] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [bookTitle, setBookTitle] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/borrow')
            .then(response => {
                setBorrow(response.data);
                const userIds = response.data.map(br => br.user.id);
                const uniqueUserIds = [...new Set(userIds)];
                Promise.all(uniqueUserIds.map(getUser))
                    .then(users => {
                        const updatedUserNames = {};
                        users.forEach(user => updatedUserNames[user.id] = user.name);
                        setUserNames(updatedUserNames);
                    })
                    .catch(error => console.log(error));
                const bookIds = response.data.map(br => br.book.id);
                const uniqueBookIds = [...new Set(bookIds)];
                Promise.all(uniqueBookIds.map(getBook))
                    .then(books => {
                        const updatedBookTitles = {};
                        books.forEach(book => updatedBookTitles[book.id] = book.title);
                        setBookTitle(updatedBookTitles);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, []);

    const getUser = (id) => {
        return axios.get('http://localhost:8080/users/' + id)
            .then(response => ({ id, name: response.data.name }))
            .catch(error => console.log(error));
    }

    const getBook = (id) => {
        return axios.get('http://localhost:8080/books/' + id)
            .then(response => ({ id, title: response.data.bookTitle }))
            .catch(error => console.log(error));
    }

    const adminId = parseInt(sessionStorage.getItem("adminId"));

    const handleAccept = (borrwID) => {
        axios.put('http://localhost:8080/borrow/accept', { borrowId: borrwID })
            .then(res => {
                toast.success("Request accepted");
                axios.get('http://localhost:8080/borrow/' + borrwID)
                    .then(res => {
                        const bookId = res.data.book.id;
                        const userId = res.data.user.id;

                        axios.get('http://localhost:8080/requests')
                            .then(response => {
                                let requestId = null;
                                for (let i = 0; i < response.data.length; i++) {
                                    if (response.data[i].user.id === userId && response.data[i].book.id === bookId) {
                                        requestId = response.data[i].id;
                                        break;
                                    }
                                }
                                axios.put('http://localhost:8080/requests/' + requestId, {
                                    user: { id: userId }, book: { id: bookId },
                                }, {
                                    params: {
                                        admin: adminId,
                                    }
                                }).then(res => {
                                    setTimeout(() => {
                                        window.location.reload(false);
                                    }, 500);
                                })
                            })

                    })
            }).catch(err => console.log(err));
    }

    const handleReject = (borrwID) => {
        axios.put('http://localhost:8080/borrow/reject', { borrowId: borrwID })
            .then(res => {
                toast.error("Request rejected");
                axios.get('http://localhost:8080/borrow/' + borrwID)
                    .then(res => {
                        const bookId = res.data.book.id;
                        const userId = res.data.user.id;

                        axios.get('http://localhost:8080/requests')
                            .then(response => {
                                let requestId = null;
                                for (let i = 0; i < response.data.length; i++) {
                                    if (response.data[i].user.id === userId && response.data[i].book.id === bookId) {
                                        requestId = response.data[i].id;
                                        break;
                                    }
                                }
                                axios.put('http://localhost:8080/requests/' + requestId, {
                                    user: { id: userId }, book: { id: bookId },
                                }, {
                                    params: {
                                        admin: adminId,
                                    }
                                }).then(res => {
                                    setTimeout(() => {
                                        window.location.reload(false);
                                    }, 500);
                                })
                            })

                    })
            }).catch(err => console.log(err));
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex items-center justify-between bg-white p-4 shadow-lg rounded-lg mb-6">
                <IconCategory2 className="text-2xl text-gray-700">Book Request </IconCategory2>
               
                <div className="flex items-center">
                    <img src="../book4.jpg" alt="Admin Logo" className="w-10 h-10 rounded-full" />
                </div>
            </div>

            <div className="overflow-x-auto w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 font-semibold">Borrow Id</th>
                            <th className="p-4 font-semibold">Book Id</th>
                            <th className="p-4 font-semibold">Book Title</th>
                            <th className="p-4 font-semibold">User Id</th>
                            <th className="p-4 font-semibold">Username</th>
                            <th className="p-4 font-semibold">Borrow Date</th>
                            <th className="p-4 font-semibold">Due Date</th>
                            <th className="p-4 font-semibold">Return Date</th>
                            <th className="p-4 text-center font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrow.filter(br => br.status === 'PENDING').map(br => (
                            <tr key={br.id} className="border-b">
                                <td className="p-4">{br.borrowId}</td>
                                <td className="p-4">{br.book.id}</td>
                                <td className="p-4">{bookTitle[br.book.id]}</td>
                                <td className="p-4">{br.user.id}</td>
                                <td className="p-4">{userNames[br.user.id]}</td>
                                <td className="p-4">{br.borrowDate}</td>
                                <td className="p-4">{br.dueDate}</td>
                                <td className="p-4">{br.returnDate}</td>
                                <td className="p-4 text-center flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleAccept(br.borrowId)}
                                        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(br.borrowId)}
                                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookRequests;
