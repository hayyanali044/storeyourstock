import React, { useEffect, useState } from 'react'
// import Store from '../assets/store.jpeg'
// import Content from './Content'
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {Routesaddress} from '../../utils/api'
import { auth, database } from '../../context/Firebase';
import { get,ref } from 'firebase/database';
import Category from './Users';


const Dashboard = () => {
  const [data,setData] = React.useState([])
  const { auth ,theme} = useAuth();

  const [usercount,setusercount] = useState(0)
  const [product,setproduct] = useState(0)
  const [categorycount,setcategorycount] = useState(0)
  const [citycount,setcitycount] = useState(0)


  useEffect(()=>{
    countuser()
    countproduct()
    countcat()
    countcity()
  },[])

 const countuser=async()=>{
    let userref = ref(database,"user")
    await get(userref).then((snap)=>{
      setusercount(Object.values(snap.val()).length)
      
    })
  }

  const countproduct=async()=>{
    let userref = ref(database,"Product")
    await get(userref).then((snap)=>{
      setproduct(Object.values(snap.val()).length)
      
    })

  }

  const countcat=async()=>{
    let userref = ref(database,"Category")
    await get(userref).then((snap)=>{
      setcategorycount(Object.values(snap.val()).length)
      
    })

  }

  const countcity=async()=>{
    let userref = ref(database,"Cities")
    await get(userref).then((snap)=>{
      // console.log(Object.values(snap.val()).length)
      setcitycount(Object.values(snap.val()).length)
      
    })

  }





 
  return (
    <div className="">
      <div className='bg-background h-screen w-full px-4 py-4'>
    <div className="flex gap-4 ">
    <div  className={`${theme=='light'?'bg-[#82b012]':'bg-cardColor'}  rounded-lg w-[25%] flex justify-between  items-center px-4 py-8 `}>
        <div className="">
        {/* <h1 className='text-xl font-bold text-white font-[SF-Pro-Display-Regular]'>{data.length}</h1> */}
        <div className="">
        <h1 className='text-xl font-bold text-white font-[SF-Pro-Display-Regular]'>{usercount}</h1>
        <p className='text-[12px] text-gray-300 font-bold font-[SF-Pro-Display-Regular]'>TOTAL Users</p>
        </div>
        </div>
        <div className="">
        <StorefrontIcon style={{ color: "white",fontSize:'3rem'  }}/>
        </div>
      </div>
      <div  className={`${theme=='light'?'bg-[#82b012]':'bg-cardColor'}  rounded-lg w-[25%] flex justify-between  items-center px-4 py-8 `}>
        <div className="">
        <h1 className='text-xl font-bold text-white font-[SF-Pro-Display-Regular]'>{product}</h1>
        <p className='text-[12px] text-gray-300 font-bold font-[SF-Pro-Display-Regular]'>TOTAL Product</p>
        </div>
        <div className="">
          <StorefrontIcon style={{ color: "white",fontSize:'3rem' }}/>
        </div>
      </div>
    <div  className={`${theme=='light'?'bg-[#82b012]':'bg-cardColor'}  rounded-lg w-[25%] flex justify-between  items-center px-4 py-8 `}>
        <div className="">
        <h1 className='text-xl font-bold text-white font-[SF-Pro-Display-Regular]'>{categorycount}</h1>
        <p className='text-[12px] text-gray-300 font-bold font-[SF-Pro-Display-Regular]'>TOTAL Category</p>
        </div>
        <div className="">
          <StorefrontIcon style={{ color: "white",fontSize:'3rem' }}/>
        </div>
      </div>
      <div  className={`${theme=='light'?'bg-[#82b012]':'bg-cardColor'}  rounded-lg w-[25%] flex justify-between  items-center px-4 py-8 `}>
        <div className="">
        <h1 className='text-xl font-bold text-white font-[SF-Pro-Display-Regular]'>{citycount}</h1>
        <p className='text-[12px] text-gray-300 font-bold font-[SF-Pro-Display-Regular]'>TOTAL City</p>
        </div>
        <div className="">
          <StorefrontIcon style={{ color: "white",fontSize:'3rem' }}/>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Dashboard