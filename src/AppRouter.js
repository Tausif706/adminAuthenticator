// AppRouter.js
import React from 'react';
import { SignInTwo } from './Components/UserLogin';
import { AdminLogin } from './Components/AdminLogin';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ViewAdmin } from './AdminContents/ViewAdmin';
import AdminTable from './AdminContents/AdminTable';
import UserDesc from './UserPage/UserDesc';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = location.pathname === '/';

  if (isRootPath) {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-black/80"
    >
      <ArrowLeft className="mr-1" size={16} />
      Back
    </button>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<SignInTwo />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/view-admin" element={<ViewAdmin />} />      
          <Route path="/admin-table" element={<AdminTable/>} />  
          <Route path='/user-desc' element={<UserDesc/>} />
        </Routes>
        <BackButton />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default AppRouter;
