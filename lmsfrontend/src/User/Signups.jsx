import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import { toast } from "react-hot-toast";

function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    if (!name || !phoneNumber || !regEmail || !regPassword || !confirmPassword) {
      toast.error("Fill all the fields");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(regPassword)) {
      toast.error("Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long");
      return;
    }

    if (regPassword !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    var requestBody = {
      name: name,
      phoneNumber: phoneNumber,
      email: regEmail,
      password: regPassword,
    };

    try {
      const response = await axios.post("http://localhost:8080/register", requestBody);
      toast.success("Successfully Signed up");
      setName("");
      setPhoneNumber("");
      setRegEmail("");
      setRegPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Signup");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex items-center mb-6">
        <img src="../book4.jpg" alt="Logo" className="h-12 w-12 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Welcome to  Library</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Create Account</h2>
        <form onSubmit={register} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full p-3 border border-malachite-300 rounded-md focus:outline-none focus:border-malachite-300"
            pattern="^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$"
            required
            onInvalid={(e) => e.target.setCustomValidity("Please enter a valid full name (letters and spaces only)")}
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <input
            type="tel"
            placeholder="Phone number"
            className="w-full p-3 border border-malachite-300 rounded-md focus:outline-none focus:border-blue-500"
            pattern="[0-9]{10}"
            required
            onInvalid={(e) => e.target.setCustomValidity("Please enter a valid 10-digit phone number")}
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-malachite-300 rounded-md focus:outline-none focus:border-blue-500"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
            onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address")}
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={(e) => setRegEmail(e.target.value)}
            value={regEmail}
          />

          <input
            placeholder="Password"
            className="w-full p-3 border border-malachite-300 rounded-md focus:outline-none focus:border-blue-500"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            onInvalid={(e) => {
              e.target.setCustomValidity("Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long");
              e.preventDefault();
            }}
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={(e) => setRegPassword(e.target.value)}
            value={regPassword}
          />

          <input
            placeholder="Confirm password"
            className="w-full p-3 border border-malachite-300 rounded-md focus:outline-none focus:border-blue-500"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            
            required
            onInvalid={(e) => {
              e.target.setCustomValidity("Please re-enter your password");
              e.preventDefault();
            }}
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          <button
            type="submit"
            
            className="w-full bg-malachite-500 text-white font-semibold py-2 rounded-md hover:bg-malachite-600 focus:outline-none focus:bg-malachite-700"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center gap-2 pl-16 mt-4 my-auto">Already Registered? <Link to="/login"><span className="underline  text-malachite-600">Login</span></Link></div>

      </div>

      
    </div>
  );
}

export default SignUp;
