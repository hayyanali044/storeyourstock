import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Routesaddress } from '../utils/api'
import Logo from '../assets/logo-login.png'
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../context/Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [data, setData] = React.useState({
    email: '',
    password: ''
  })
  const handlerCHange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }
  const handlerSUbmit = async (e) => {
    e.preventDefault()
    if (data.email == "" || data.password == "") {
      toast.error("Enter All data", {
        position: toast.POSITION.TOP_CENTER
      })
    }

    // try {

    //   let user = await createUserWithEmailAndPassword(auth, data.email, data.password)
    //   console.log(user.user.uid)

    //   toast.success("User Regsister", {
    //     position: toast.POSITION.TOP_CENTER
    //   })


    // }
    // catch (e) {
    //   toast.error(e.code, {
    //     position: toast.POSITION.TOP_CENTER
    //   })
    // }

    // Admin@gmail.com
    // Admin123

    if (data.email == "Admin@gmail.com" && data.password == "Admin123") {
      toast.success("Succeffully Login As Admin", {
        position: toast.POSITION.TOP_CENTER
      })

      navigate("/Panel/dashboard")
    }
    else if (data.email != null || data.email != undefined || data.password != undefined || data.password != undefined) {
      try{
      let user = await signInWithEmailAndPassword(auth, data.email, data.password)
      console.log(user.user.uid)

      localStorage.setItem("uid",user.user.uid)

      toast.success("User login Succefully", {
        position: toast.POSITION.TOP_CENTER
      })
      navigate("/userPanel/dashboard")
      }
     
      catch(e){

      }

    }
    else {
      toast.error("Enter Incorrect data", {
        position: toast.POSITION.TOP_CENTER
      })

    }

    // try {

    //   let user = await signInWithEmailAndPassword(auth, data.email, data.password)
    //   console.log(user.user.uid)

    //   toast.success("Succeffully Login As Admin", {
    //     position: toast.POSITION.TOP_CENTER
    //   })

    //   navigate("/dashboard")


    // }
    // catch (e) {
    //   toast.error(e.code, {
    //     position: toast.POSITION.TOP_CENTER
    //   })
    // }



  }
  return (
    <div className='flex w-full h-screen'>
      <div className="min-w-[40%] bg-[#82b012]"></div>
      <div className="w-[60%] h-full flex bg-white justify-center  flex-col">
        <div className="w-[60%] mx-auto my-0 ">
          <div className="flex justify-center">
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtsXemX9sxtmQM4pOY7Em4k8pV97hH_nPog&usqp=CAU"} style={{ height: 200 + "px", width: 400 + "px" }} width={100} height={100} alt="" />
          </div>
          <form onSubmit={handlerSUbmit}>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className='font-bold  text-xl font-[SF-Pro-Display-Semibold]  text-[#82b012]'>Log in to continue</label>
              <input style={{ color: "black" }} type="text" onChange={handlerCHange} className='border border-gray-300 py-3 rounded px-2' placeholder='Username' name="email" id="" />
              <input style={{ color: "black" }} type="password" onChange={handlerCHange} className='mt-1 border border-gray-300 py-3 rounded px-2' placeholder='Password' name="password" id="" />
              <input type="submit" className='mt-2 uppercase cursor-pointer font-[SF-Pro-Display-Regular] tracking-wider text-white bg-[#82b012] py-3 rounded' name="" id="" />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login

