import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import { toast } from "react-hot-toast"


function Login() {
  
  const [rememberMe, setRememberMe] = useState(false);

  const [logEmail, setlogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  

  const validateForm = () => {
    let isValid = true;

   
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!logEmail) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailPattern.test(logEmail)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

   
    if (!logPassword) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (logPassword.length < 6) {
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
    const requestBody = { email: logEmail, password: logPassword };
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        requestBody
      );
      const user = response.data;
      if (rememberMe) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('isRememberMe', true);
      } else {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('isRememberMe', false);
      }
      sessionStorage.setItem("userId", user.id);
      navigate("/userdashboard", { state: user });
      toast.success("Successfully Signed In")
    } catch (error) {
      setErrorMsg(error.response?.data?.errorMessage);
      toast.error("Failed to Sign In")
    }
  };

 

  return <>
  <div className="h-12 bg-gray-100 flex justify-end mt-3 mx-5 items-center">
    <Link to="/" className=" text-center text-2xl h- font-semibold">
          <button className="w-full px-4 py-2 text-white bg-malachite-700 hover:bg-malachite-500 rounded-lg">Home</button>
        </Link>
        </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
       
        <form className="space-y-6" onSubmit={login}>
          <h1 className="text-center text-2xl font-bold text-gray-800">Sign in</h1>
          <input
            type="email"
            placeholder="Email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
            value={logEmail}
            onChange={(e) => setlogEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={logPassword}
            onChange={(e) => setLogPassword(e.target.value)}
           
            required
            className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
              passwordError ? "border-red-500" : ""
            }`}
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}


          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="text-blue-500"
            />
            <span className="text-gray-700">Remember Me</span>
          </div>

          <button
            type="button"
            onClick={login}
            className="w-full px-4 py-2 text-white bg-malachite-500 hover:bg-malachite-600 rounded-lg"
          >
            Sign In
          </button>

          <div className="flex gap-2 text-center items-center px-20 mx-auto">Not Registered Yet? <span className="hover:underline text-malachite-500"><Link to="/signup">Singup</Link></span></div>

          {errorMsg && (
            <p className="text-center text-red-500 text-sm mt-2">{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
    
 

       
    </>

}

export default Login;
