import React from 'react'
import './App.css';
import Product from './screens/AdminDashboard/Product';
import Login from './screens/Login';
import { Routes, Route } from 'react-router-dom';
import LayoutCompo from './components/LayoutCompo';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useAuth from './hooks/useAuth';
import Dashboard from './screens/AdminDashboard/Dashboard';
import Users from './screens/AdminDashboard/Users';
import Categories from './screens/AdminDashboard/Category';
import Cities from './screens/AdminDashboard/City';
import LayoutCompo2 from './components/LayoutCompo2';
import userDashboard from './screens/UserDashboard/Dashbaord';
import Dashboard1 from './screens/UserDashboard/Dashbaord';
import Usersproduct from './screens/UserDashboard/ProductList';
import Message from './screens/AdminDashboard/Message';
import Transf_Service from './screens/AdminDashboard/Transport_Data';

function App() {
  const ROLES = {
    SubAdmin: 'subadmin',
    Admin: 'admin'
  }
  const Unauthorized = () => {
    return (
      <div className="">Unauthorized</div>
    )
  }
  const Missing = () => {
    return (
      <div className="">404 not found</div>
    )
  }

  const { theme } = useAuth();

  return (
    <div className="w-full h-full bg-background relative">
      <SkeletonTheme baseColor={theme == 'light' ? '#e7e4e4' : "#202020"} highlightColor={theme == 'light' ? '' : "#444"}>

        <Routes>
          <Route path="/" element={<Login />}>
          </Route>

          <Route path="/Panel" element={<LayoutCompo />}>

            <Route index path='dashboard' element={<Dashboard />} />
            <Route path="product" element={<Product />} />
            <Route path="User" element={<Users />} />
            <Route path="Categories" element={<Categories />} />
            <Route path="City" element={<Cities />} />
            <Route path="Message" element={<Message />} />
            <Route path="Transport" element={<Transf_Service/> } />



            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>

          <Route path="/userPanel" element={<LayoutCompo2 />}>

            <Route index path='dashboard' element={<Dashboard1 />} />
            <Route path="product" element={<Usersproduct />} />
            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </SkeletonTheme>

    </div>
  );
}

export default App;



