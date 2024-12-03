import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";

function MyBorrowedBook() {
    const [bookTitle, setBookTitle] = useState({});
    const [borrow, setBorrow] = useState([]);
    const userId = parseInt(sessionStorage.getItem('userId'));

    useEffect(() => {
        axios.get(`http://localhost:8080/borrow/user/${userId}`)
            .then(response => {
                setBorrow(response.data);
               
            })
            .catch(error => {
                console.log(error);
            });
    }, [userId]);

  

    const handleReturn = (borrwID, bookID, userID) => {
        axios.put('http://localhost:8080/borrow/return', { borrowId: borrwID, bookId: bookID, userId: userID })
            .then(res => {
                axios.get('http://localhost:8080/requests')
                    .then(response => {
                        const requests = response.data;
                        let returnId = null;
                        for (let i = 0; i < requests.length; i++) {
                            const req = requests[i];
                            if (req.user.id === userID && req.book.id === bookID) {
                                returnId = req.id;
                                break;
                            }
                        }
                        if (returnId !== null) {
                            axios.put(`http://localhost:8080/requests_return/${returnId}`, { user: { id: userID }, book: { id: bookID } })
                                .then(response => {
                                    toast.success("Book return success");
                                })
                                .catch(error => {
                                    toast.error("Failed to return");
                                    console.log(error);
                                });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }).catch(err => console.log(err));
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between items-center w-full p-4 bg-gray-800 text-white">
                <div className="toggle"></div>
                <div className="user">
                    <img className="w-10 h-10 rounded-full" src="../book4.jpg" alt="logo" />
                </div>
            </div>
            <div className="mt-8 w-full max-w-6xl">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">Borrow Id</th>
                            <th className="py-2 px-4 border-b">Book Id</th>
                            
                            <th className="py-2 px-4 border-b">Borrow Date</th>
                            <th className="py-2 px-4 border-b">Due Date</th>
                            <th className="py-2 px-4 border-b">Return Date</th>
                            <th className="py-2 px-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrow.map(br => (
                            <tr key={br.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{br.borrowId}</td>
                                <td className="py-2 px-4 border-b">{br.book.id}</td>
                                
                                <td className="py-2 px-4 border-b">{br.borrowDate}</td>
                                <td className="py-2 px-4 border-b">{br.dueDate}</td>
                                <td className="py-2 px-4 border-b">{br.returnDate}</td>
                                <td className="py-2 px-4 border-b">
                                    {br.status === 'ACCEPTED' ? (
                                        <button 
                                            onClick={() => handleReturn(br.borrowId, br.book.id, userId)} 
                                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                        >
                                            Return
                                        </button>
                                    ) : (
                                        <span>{br.status}</span>
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

export default MyBorrowedBook;
