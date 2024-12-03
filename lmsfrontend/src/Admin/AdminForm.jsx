import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-hot-toast";


function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
    
       
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
          setEmailError("Email is required.");
          isValid = false;
        } else if (!emailPattern.test(email)) {
          setEmailError("Enter a valid email address.");
          isValid = false;
        } else {
          setEmailError("");
        }
    
       
        if (!password) {
          setPasswordError("Password is required.");
          isValid = false;
        } else if (password.length < 6) {
          setPasswordError("Password must be at least 6 characters long.");
          isValid = false;
        } else {
          setPasswordError("");
        }
    
        return isValid;
      };

    const login = async (event) => {
        event.preventDefault();
        setErrorMsg("");
        if (!validateForm()) {
            toast.error("Please fix the errors before submitting.");
            return;
          }
        const requestBody = { email: email, password: password };
        try {
            const response = await axios.post("http://localhost:8080/adminLogin", requestBody);
            const admin = response.data;
            sessionStorage.setItem("adminId", admin.id);
            console.log(admin.id);
            navigate("/adminDashboard", { state: response?.data });
            toast.success("Successfully logged in");
        } catch (error) {
            setErrorMsg(error.response?.data?.errorMessage);
            toast.error("Failed to login");
        }
    };

    return <>
    <div className="h-12 bg-gray-100 flex justify-end mt-3 mx-5 items-center">
    <Link to="/" className=" text-center text-2xl h- font-semibold">
          <button className="w-full px-4 py-2 text-white bg-malachite-700 hover:bg-malachite-500 rounded-lg">Home</button>
        </Link>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center mb-6">
                <img src="../book4.jpg" alt="Library Logo" className="w-24 h-24 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700">Welcome to  Library</h2>
            </div>
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h1>
                <form onSubmit={login} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                            emailError ? "border-red-500" : ""
                          }`}
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              
                    <input
                        type="password"
                        id="pwd"
                        name="pwd"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                            passwordError ? "border-red-500" : ""
                          }`}
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-malachite-500 text-white rounded-md hover:bg-malachite-600 transition"
                    >
                        Login
                    </button>
                </form>
                {errorMsg && (
                    <p className="text-red-500 text-center mt-4">
                        {errorMsg}
                    </p>
                )}
            </div>
        </div>
    </>
}

export default AdminLogin;
