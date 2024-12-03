
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconCategory2 } from '@tabler/icons-react';

function BookIssueHistory() {
    const [borrow, setBorrow] = useState([]);
 
    useEffect(() => {
        axios.get('http://localhost:8080/borrow')
            .then(response => {
                setBorrow(response.data);

})
            .catch(error => console.log(error));
    }, []);

  

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
            <div className="w-full flex items-center justify-between bg-white shadow-md py-4 px-6 rounded-md">
                <IconCategory2 className="text-gray-500 text-2xl cursor-pointer"/>
                <div className="flex items-center space-x-4">
                    <img className="h-10 w-10 rounded-full" src="../book4.jpg" alt="logo" />
                </div>
            </div>

            <div className="w-full mt-10 overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Borrow Id</th>
                            <th className="py-3 px-6 text-left">Book Id</th>
                            {/* <th className="py-3 px-6 text-left">Book Title</th> */}
                            <th className="py-3 px-6 text-left">User Id</th>
                            {/* <th className="py-3 px-6 text-left">Borrowed User</th> */}
                            <th className="py-3 px-6 text-left">Borrow Date</th>
                            <th className="py-3 px-6 text-left">Due Date</th>
                            <th className="py-3 px-6 text-left">Return Date</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {borrow.map(br => (
                            <tr key={br.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{br.borrowId}</td>
                                <td className="py-3 px-6 text-left">{br.book.id}</td>
                                {/* <td className="py-3 px-6 text-left">{bookTitle[br.book.id]}</td> */}
                                <td className="py-3 px-6 text-left">{br.user.id}</td>
                                {/* <td className="py-3 px-6 text-left">{userNames[br.user.id]}</td> */}
                                <td className="py-3 px-6 text-left">{br.borrowDate}</td>
                                <td className="py-3 px-6 text-left">{br.dueDate}</td>
                                <td className="py-3 px-6 text-left">{br.returnDate}</td>
                                <td className="py-3 px-6 text-left">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            br.status === 'ACCEPTED' ? 'bg-green-200 text-green-800' :
                                            br.status === 'REJECTED' ? 'bg-red-200 text-red-800' :
                                            'bg-yellow-200 text-yellow-800'
                                        }`}>
                                        {br.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookIssueHistory;
