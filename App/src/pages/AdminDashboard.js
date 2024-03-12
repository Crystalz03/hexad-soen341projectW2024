import React from 'react';
import AdminSideMenu from '../components/AdminSideMenu';
import Footer from '../components/Footer';
import Header from '../components/Header';


function AdminDashboard() {
  return (
    <div>Admin dashboard
     <Header />
     <AdminSideMenu />
     <Footer />
     
    </div>
    
  );
}

export default AdminDashboard;