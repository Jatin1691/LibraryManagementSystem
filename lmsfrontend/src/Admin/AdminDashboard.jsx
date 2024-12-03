import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IconBook, IconBread, IconUsers } from '@tabler/icons-react';

function AdminDashboard() {
    const adminId = sessionStorage.getItem('adminId');
    const [books, setBooks] = useState([]);
    const [editID, setEditID] = useState(-1);
    const [bookTitle, setbookTitle] = useState('');
    const [author, setauthor] = useState('');
    const [category, setcategory] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [availability, setAvailability] = useState('');
    const [publishedDate, setpublishedDate] = useState('');
    const [uBookTitle, usetbookTitle] = useState('');
    const [uQuantity, usetquantity] = useState('');
    const [uAvailability, usetAvailability] = useState('');
    const [uDescription, usetdescription] = useState('');
    const [totalMembers, setTotalMembers] = useState('');
    const [totalBooks, setTotalBooks] = useState('');
    const [totalAvailability, setTotalAvailability] = useState("");
    const [totalIssued, setTotalIssue] = useState("");
    const [adminName, setAdminName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/${adminId}`)
            .then(response => {
                setAdminName(response.data.name);
            });
    }, [adminId]);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                setTotalMembers(response.data.length);
                let count = 0;
                for (let i = 0; i < response.data.length; i++) {
                    count += response.data[i].numBookBorrowed;
                }
                setTotalIssue(count);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/books')
            .then(response => {
                setBooks(response.data);
                setTotalBooks(response.data.length);
                let count = 0;
                for (let i = 0; i < response.data.length; i++) {
                    count += response.data[i].availability;
                }
                setTotalAvailability(count);
            })
            .catch(error => console.log(error));
    }, []);

    const handleEdit = (id) => {
        axios.get(`http://localhost:8080/books/${id}`)
            .then(res => {
                usetbookTitle(res.data.bookTitle);
                usetquantity(res.data.quantity);
                usetAvailability(res.data.availability);
                usetdescription(res.data.description);
                setauthor(res.data.author);
                setpublishedDate(res.data.publishedDate);
                setcategory(res.data.category);
            });
        setEditID(id);
    };

    const handleUpdate = () => {
        if (uQuantity < 0 || uAvailability < 0) {
            toast.error("Invalid negative value");
            return;
        }
        axios.put(`http://localhost:8080/books/${editID}`, { 
            id: editID, 
            bookTitle: uBookTitle, 
            author, 
            category, 
            quantity: uQuantity, 
            availability: uAvailability, 
            description: uDescription, 
            publishedDate 
        })
        .then(() => {
            window.location.reload(false);
        })
        .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/books/${id}`)
            .then(() => {
                window.location.reload(false);
            })
            .catch(err => console.log(err));
    };

  

    return (
        <div className="min-h-screen bg-gray-100">
           
            <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                <h3 className="text-lg font-semibold text-green-700">Hello, {adminName}</h3>
                <img className="w-10 h-10 rounded-full" src="./book4.jpg" alt="logo" />
            </div>

           
            <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-4">
                <div className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
                    <div>
                        <div className="text-3xl font-bold">{totalBooks}</div>
                        <div className="text-gray-500">Total Books</div>
                    </div>
                    <IconBook className="text-4xl text-green-700"/>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
                    <div>
                        <div className="text-3xl font-bold">{totalAvailability}</div>
                        <div className="text-gray-500">Available Books</div>
                    </div>
                    <IconBread className="text-4xl text-green-700"/>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
                    <div>
                        <div className="text-3xl font-bold">{totalIssued}</div>
                        <div className="text-gray-500">Issued Books</div>
                    </div>
                    <IconBook className="text-4xl text-green-700"/>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
                    <div>
                        <div className="text-3xl font-bold">{totalMembers}</div>
                        <div className="text-gray-500">Total Members</div>
                    </div>
                    <IconUsers className="text-4xl text-green-700"/>
                </div>
            </div>

            <div className="overflow-x-auto p-6">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Book ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Book Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Availability</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {books.map(book => (
                            book.id === editID ? (
                                <tr key={book.id} className="border-t">
                                    <td className="px-6 py-4">{book.id}</td>
                                    <td className="px-6 py-4">
                                        <input className="w-full p-2 border rounded" type="text" value={uBookTitle} onChange={(e) => usetbookTitle(e.target.value)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input className="w-full p-2 border rounded" type="text" value={uQuantity} onChange={(e) => usetquantity(e.target.value)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input className="w-full p-2 border rounded" type="text" value={uAvailability} onChange={(e) => usetAvailability(e.target.value)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <textarea className="w-full p-2 border rounded" value={uDescription} onChange={(e) => usetdescription(e.target.value)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700" onClick={handleUpdate}>Update</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={book.id} className="border-t">
                                    <td className="px-6 py-4">{book.id}</td>
                                    <td className="px-6 py-4">{book.bookTitle}</td>
                                    <td className="px-6 py-4">{book.quantity}</td>
                                    <td className="px-6 py-4">{book.availability}</td>
                                    <td className="px-6 py-4">{book.description}</td>
                                    <td className="px-6 py-4">
                                        <button className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-600" onClick={() => handleEdit(book.id)}>Edit</button>
                                        <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600" onClick={() => handleDelete(book.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>

          
        </div>
    );
}

export default AdminDashboard;
