import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const FineHistory = () => {

    const [borrows, setBorrows] = useState([]);
    const finePerDay = 10; 
  
    useEffect(() => {
      axios
        .get(`http://localhost:8080/fine?finePerDay=${finePerDay}`)
        .then((response) => {
          setBorrows(response.data);
        })
        .catch((error) => {
          console.error("Error fetching borrow data:", error);
        });
    }, [finePerDay]);

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
                            <th className="py-2 px-4 border-b">User Id</th>
                            <th className="py-2 px-4 border-b">Book Id</th>
                           
                            <th className="py-2 px-4 border-b">Borrow Date</th>
                            <th className="py-2 px-4 border-b">Due Date</th>
                            <th className="py-2 px-4 border-b">Return Date</th>
                            
                            <th className="py-2 px-4 border-b">Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrows.map(br => (
                            <tr key={br.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{br.borrowId}</td>
                                <td className="py-2 px-4 border-b">{br.userId}</td>
                                <td className="py-2 px-4 border-b">{br.bookId}</td>
                                
                                <td className="py-2 px-4 border-b">{br.borrowDate}</td>
                                <td className="py-2 px-4 border-b">{br.dueDate}</td>
                                <td className="py-2 px-4 border-b">{br.returnDate}</td>
                                
                                <td className="py-2 px-4 border-b">{br.fine}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default FineHistory