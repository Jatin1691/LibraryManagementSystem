
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IconCategory2 } from "@tabler/icons-react";

function MyAccount() {
    const adminId = sessionStorage.getItem('adminId');
   
   
    const [admin, setAdmin] = useState([]); // Initialize the admin list
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [adminConfirmPassword, setAdminConfirmPassword] = useState("");

    useEffect(() => {
        // Fetch the existing admin data to populate the table
        axios.get("http://localhost:8080/admin")
            .then(response => setAdmin(response.data))
            .catch(error => console.error(error));
    }, []);

    const createAdmin = async (event) => {
        event.preventDefault();
        if (adminPassword !== adminConfirmPassword) {
            toast.error("Password did not match");
            return;
        }
        const requestBody = {
            name: adminName,
            phoneNumber: adminPhoneNumber,
            email: adminEmail,
            password: adminPassword,
        };
        await axios
            .post("http://localhost:8080/admin", requestBody)
            .then(() => {
                toast.success("Admin successfully created");
                // Refresh the admin list after creation
                setAdmin([...admin, requestBody]);
                // Clear form fields
                setAdminName("");
                setAdminEmail("");
                setAdminPhoneNumber("");
                setAdminPassword("");
                setAdminConfirmPassword("");
            })
            .catch(() => toast.error("Failed to create admin"));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Topbar */}
            <div className="flex items-center justify-between bg-white shadow-md py-4 px-6 rounded-md">
                <IconCategory2 className="text-gray-500 text-2xl cursor-pointer"/>
                <div className="flex items-center space-x-4">
                    <img className="h-10 w-10 rounded-full" src="../book4.jpg" alt="logo" />
                </div>
            </div>

            {/* Add Admin Form */}
            <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Add Admin</h2>
                <form onSubmit={createAdmin}>
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setAdminName(e.target.value)}
                        value={adminName}
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 mb-4"
                    />

                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setAdminEmail(e.target.value)}
                        value={adminEmail}
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 mb-4"
                    />

                    <label className="block text-gray-700">Phone number:</label>
                    <input
                        type="tel"
                        onChange={(e) => setAdminPhoneNumber(e.target.value)}
                        value={adminPhoneNumber}
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 mb-4"
                    />

                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setAdminPassword(e.target.value)}
                        value={adminPassword}
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 mb-4"
                    />

                    <label className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setAdminConfirmPassword(e.target.value)}
                        value={adminConfirmPassword}
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 mb-4"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md"
                    >
                        Add Admin
                    </button>
                </form>
            </div>

            {/* Admin Table */}
            <div className="mt-12 overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Admin Id</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {admin.map((br) => (
                            <tr key={br.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{br.id}</td>
                                <td className="py-3 px-6 text-left">{br.name}</td>
                                <td className="py-3 px-6 text-left">{br.email}</td>
                                <td className="py-3 px-6 text-left">{br.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyAccount;
