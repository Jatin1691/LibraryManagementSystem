import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function MyAccounts() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const userId = sessionStorage.getItem("userId");


    useEffect(() => {
        axios.get(`http://localhost:8080/users/${userId}`)
            .then(res => {
                setName(res.data.name);
                setEmail(res.data.email);
                setPhoneNumber(res.data.phoneNumber);
                setPassword(res.data.password);
            });
    }, [userId]);

    const updateProfile = async () => {
        axios.put(`http://localhost:8080/users/${userId}`, {
            id: userId,
            name,
            email,
            phoneNumber,
            password
        })
        .then(() => window.location.reload(false))
        .catch(err => console.log(err));
    };

    

   
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="flex justify-between items-center bg-white shadow p-4 mb-6">
                <h1 className="text-xl font-semibold">My Account</h1>
                <img className="w-10 h-10 rounded-full" src="../book4.jpg" alt="User logo" />
            </div>
            <div className="bg-white p-6 rounded shadow">
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="inputFirstName">Full Name</label>
                        <input 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                            id="inputFirstName" 
                            type="text" 
                            placeholder={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="inputEmailAddress">Email address</label>
                        <input 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                            id="inputEmailAddress" 
                            type="email" 
                            placeholder={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="inputPhone">Phone number</label>
                        <input 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                            id="inputPhone" 
                            type="tel" 
                            placeholder={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button 
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" 
                            type="button" 
                            onClick={updateProfile}
                        >
                            Save changes
                        </button>
                     
                    </div>
                </form>
            </div>
           
        </div>
    );
}

export default MyAccounts;
