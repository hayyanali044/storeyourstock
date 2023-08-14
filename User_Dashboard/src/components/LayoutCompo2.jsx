import React from "react";
import Header from "./Header";
import Sidebar2 from "./Sidebar2";
import {Outlet} from 'react-router-dom'
 
const LayoutCompo2 = () => {

    const [colpass,setColpass] = React.useState(false)
  
  return (
    <div className=" rounded-t-xl  mb-0 w-full h-full">
    {/* Header-Topbar */}
  <div className="flex border-t border-lightgray  w-full h-full">
    {/* Sidebar*/}
    <Sidebar2 colpass={colpass}/>
    <div className="w-full h-full">
    <Header setColpass={setColpass} colpass={colpass}/>
    {/* Main*/}
      <div className="w-full h-full">{<Outlet />}</div>
    </div>
  </div>
</div>
  );
};

export default LayoutCompo2;
