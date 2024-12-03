import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ConstNavLink=()=>{
    
   return <div className="h-20 flex items-center justify-around bg-silver-chalice-200">
       <div className="text-2xl flex  text-malachite-800 font-bold items-center gap-2 justify-center ">
        <span><img className="h-8 w-8 rounded-full" src="./book4.jpg"></img></span>Library Management System
        </div>
       <div className=" flex items-center gap-6">

      <NavLink className="text-malachite-600 text-xl font-semibold hover:text-malachite-700" to="/">Home</NavLink>
      <NavLink className="text-malachite-600 text-xl font-semibold hover:text-malachite-700" to="#about">About</NavLink>

      <NavLink className="text-malachite-600 text-xl font-semibold hover:text-malachite-700" to="/admin">Admin</NavLink>
      <NavLink className="text-malachite-600 text-xl font-semibold hover:text-malachite-700" to="/login">User</NavLink>
      </div>
       
   </div>

}

export default ConstNavLink;