
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css'
import Landing from './Pages/Landing.jsx';
import Admin from './Pages/Admin.jsx';
import AdminDashboardNav from './Admin/AdminDashboardNav.jsx';
import AdminDashboard from './Admin/AdminDashboard.jsx';
import Users from './Admin/Users.jsx';
import AddBooks from './Admin/AddBook.jsx';
import BookRequests from './Admin/BookRequest.jsx';
import BookIssueHistory from './Admin/BookIssueHistory.jsx';
import MyAccount from './Admin/AddAdmin.jsx';
import { Toaster } from 'react-hot-toast';
import DashboardNav from './User/UserDashboardNav.jsx';
import Dashboard from './User/UserDashboard.jsx';
import MyAccounts from './User/MyAccount.jsx';
import MyBorrowedBook from './User/MyBorrowedBooks.jsx';
import SignUp from './User/Signups.jsx';
import Login from './User/Login.jsx';
import FineHistory from './User/FineHistory.jsx';

function App() {


  return (
    <>

    <BrowserRouter>
    <Toaster/>
     <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/admin' element={<Admin/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>} />

      <Route path='/admindashboard' element={<AdminDashboardNav/>}>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/admindashboard/users' element={<Users/>}/>
        <Route path='/admindashboard/addbooks' element={<AddBooks/>} />
        <Route path='/admindashboard/bookrequests' element={<BookRequests/>}/>
        <Route path='/admindashboard/bookissuehistory' element={<BookIssueHistory/>}/>
        <Route path='/admindashboard/setting' element={<MyAccount/>}/>
      </Route>

      <Route path='/userdashboard' element={<DashboardNav/>}>
       <Route path='/userdashboard' element={<Dashboard/>}/>
       <Route path='/userdashboard/fineHistory' element={<FineHistory/>}/>
       <Route path='/userdashboard/myaccount' element={<MyAccounts/>} />
       <Route path='/userdashboard/myborrowedbook' element={<MyBorrowedBook/>}/>
      </Route>
     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
