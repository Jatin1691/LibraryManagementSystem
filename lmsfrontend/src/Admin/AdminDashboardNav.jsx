import { IconHome, IconMapQuestion, IconBook, IconUser,IconAssembly, IconSettings, IconLogout } from '@tabler/icons-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

// import { IonIcon } from '@ionic/react';
// import { homeOutline, personOutline, notificationsOutline, logOutOutline, bookmarkOutline, bookOutline, arrowRedoOutline, settingsOutline } from "ionicons/icons";

function AdminDashboardNav() {
   const navigate=useNavigate();

    return (
        <div className="flex min-h-screen bg-gray-100">
           
            <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
                <ul className="space-y-4 pt-6">
                    <li className="text-center p-4">
                        <Link to="/admindashboard" className="flex items-center space-x-2 justify-center">
                            
                            <span className="text-xl font-semibold"> Library</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admindashboard" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
                            <IconHome className="text-lg"/>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admindashboard/users" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
                            <IconUser className="text-lg"/>
                            <span className="ml-3">User Details</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admindashboard/addbooks" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
                            <IconBook/>
                            <span className="ml-3">Add Books</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admindashboard/bookrequests" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
                            <IconMapQuestion/>
                            <span className="ml-3">Book Requests</span>
                        </Link>
                    </li>

                   

                    <li>
                        <Link to="/admindashboard/bookissuehistory" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
                        <IconAssembly/>
                            <span className="ml-3">Book Issue History</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admindashboard/setting" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
                            <IconSettings/>
                            <span className="ml-3">Settings</span>
                        </Link>
                    </li>

                    <li>
                        <div  className="flex items-center p-3 hover:bg-gray-700 rounded-lg" onClick={()=>{
                            localStorage.clear();
                            localStorage.clear();
                            navigate("/admin")
                        }}>
                            <IconLogout/>
                            <span className="ml-3" >Log Out</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="flex-1 ml-64 p-6">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminDashboardNav;
