
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IconCategory2 } from '@tabler/icons-react';

function AddBooks() {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setauthor] = useState('');
    const [category, setcategory] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [publishedDate, setpublishedDate] = useState('');
    const navigate = useNavigate();

    const register = async (event) => {
        event.preventDefault();

        const currentDate = new Date();
        const selectedDate = new Date(publishedDate);

        if (selectedDate > currentDate) {
            toast.error('Date cannot be in the future');
            return;
        }

        if (!bookTitle || !author || !category || !description || !quantity || !publishedDate) {
            toast.error('Fill out all fields.');
            return;
        }

        const requestBody = {
            bookTitle,
            author,
            category,
            description,
            quantity,
            availability: quantity,
            publishedDate,
        };

        try {
            const response = await axios.post("http://localhost:8080/books", requestBody);
            toast.success("Book added successfully");
            setBookTitle("");
            setauthor("");
            setcategory("");
            setdescription("");
            setquantity("");
            setpublishedDate("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add book");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex items-center justify-between p-4 bg-white shadow-md mb-8">
                <div className="flex items-center">
                    <IconCategory2 className="text-2xl text-gray-700"/>
                    <h1 className="ml-4 text-xl font-semibold text-green-700">Add Book</h1>
                </div>
                <img className="w-10 h-10 rounded-full" src="../book4.jpg" alt="Admin logo" />
            </div>

            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Add New Book</h1>
                <form onSubmit={register} className="space-y-4">
                    <div>
                        <label htmlFor="authorName" className="block text-gray-700">Author Name:</label>
                        <input
                            type="text"
                            id="authorName"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={author}
                            onChange={(e) => setauthor(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="bookTitle" className="block text-gray-700">Book Title:</label>
                        <input
                            type="text"
                            id="bookTitle"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-gray-700">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={quantity}
                            onChange={(e) => setquantity(e.target.value)}
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-gray-700">Category:</label>
                        <input
                            type="text"
                            id="category"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="bookDesc" className="block text-gray-700">Book Description:</label>
                        <textarea
                            id="bookDesc"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="bookpublished" className="block text-gray-700">Published Date:</label>
                        <input
                            type="date"
                            id="bookpublished"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={publishedDate}
                            onChange={(e) => setpublishedDate(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBooks;
