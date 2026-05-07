import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import RestaurantDashboardNavbar from '../components/RestaurantDashboardNavbar';
import { Outlet } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

const RestaurantDashboard = () => {
  const { loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
    <RestaurantDashboardNavbar/>
      <div className='flex'>
        <Sidebar/>
        <div className='flex-1 overflow-y-auto px-4 py-6 md:px-8'>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default RestaurantDashboard
