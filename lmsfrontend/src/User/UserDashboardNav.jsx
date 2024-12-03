import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import { IconBook, IconLogout, IconUserFilled,IconHome,IconCoinRupeeFilled } from '@tabler/icons-react';

function DashboardNav() {
    const location = useLocation();
    console.log(location.state);

    const navigate=useNavigate();
    
    return (
        <div className="flex h-screen">
            <div className="bg-gray-800 text-white w-64">
                <div className="flex items-center justify-center h-20">
                    <img className="h-10" src="../book4.jpg" alt="logo" />
                </div>
                <ul className="mt-6">
                    <li className="mb-4">
                        <Link to="/userdashboard" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <span className="icon"><IconHome className="text-xl"/></span>
                            <span className="ml-2 title">Home</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/userdashboard/myborrowedbook" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <span className="icon"><IconBook className="text-xl"/></span>
                            <span className="ml-2 title">My Borrowed Books</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/userdashboard/fineHistory" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <span className="icon"><IconCoinRupeeFilled className="text-xl"/></span>
                            <span className="ml-2 title">Fine History</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/userdashboard/myaccount" className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <span className="icon"><IconUserFilled className="text-xl"/></span>
                            <span className="ml-2 title">My Account</span>
                        </Link>
                    </li>
                    <li className="mb-4">
                        <div onClick={()=>{
                            localStorage.clear();
                            localStorage.clear();
                            navigate("/login");
                        }} className="flex items-center p-2 hover:bg-gray-700 rounded">
                            <span className="icon"><IconLogout className="text-xl"/></span>
                            <span className="ml-2 title">Log Out</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardNav;
