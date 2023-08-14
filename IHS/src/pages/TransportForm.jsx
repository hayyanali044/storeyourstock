import React from "react";
import { database } from "../firebase/firebase";
import { push, ref, set, getDatabase, get, child, orderByChild, equalTo } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const TransportForm = () => {

  let [name, setname] = useState()
  let [email, setemail] = useState()
  let [address, setaddress] = useState()
  let [date, setdate] = useState()
  let [time, settime] = useState()
  let [km, setkm] = useState()

  let [price,setprice]=useState(3000)


  const chgdata=(e)=>{

    var price1 = 3000
    if(e<=0){
      setprice(3000)
    }
    else{
  
      setkm(e)
      setprice(3000+e*100)
  
    }
  
  }

  useEffect(() => {
    // setdatabase()
  }, [])

  const setdatabase = async () => {
    // let uid = localStorage.getItem("uid")
    const databaseRef2 = ref(database, `Transf_Service`);
    const key = push(databaseRef2).key;

    const databaseRef = ref(database, `Transf_Service/${key}`);
    var obj = { name,email,address,date,time,km,price}
    const databaseRef1 = ref(database, `Transf_Service/${key}`);
    await set(databaseRef1, obj)
    setname("")
    setemail("")
    setaddress("")
    setdate("")
    settime("")
    setkm("")
    setprice(3000)
    // setmessage("")

    toast.success('Message Send Succfully', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }

  return (
    <>
      <div>

        <section class="text-black body-font bg-white relative">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-12">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">Transport Services Form</h1>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
                <div class="p-2 w-full">
                  <div class="relative">
                    {/* <label for="name" class="leading-7 text-md text-black">Name</label> */}
                    <input type="text" id="name"
                      name="name"
                      value={name}
                      placeholder="Enter Name"
                      onChange={(e) => setname(e.target.value)}
                      class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    {/* <label for="email" class="leading-7 text-md text-black">Email </label> */}
                    <input type="email"
                      placeholder="Enter Email"

                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    {/* <label for="Date" class="leading-7 text-md text-black">Date </label> */}
                    <input type="text"
                      placeholder="Enter Pick Up Address"

                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      id="Date" name="Date" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    {/* <label for="Date" class="leading-7 text-md text-black">Date </label> */}
                    <input type="date"
                      placeholder="Enter Pick Up Date"

                      value={date}
                      onChange={(e) => setdate(e.target.value)}
                      id="Date" name="Date" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    {/* <label for="Time" class="leading-7 text-md text-black">Time </label> */}
                    <input type="time"
                      placeholder="Enter Pick Up Time"
                      value={time}
                      onChange={(e) => settime(e.target.value)}
                      id="Time" name="Time" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    {/* <label for="Date" class="leading-7 text-md text-black">Date </label> */}
                    <input type="text"
                      placeholder="Enter Km"

                      value={km}
                      onChange={(e) => chgdata(e.target.value)}
                      id="Date" name="Date" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>

                <h1 style={{textAlign:"center",margin:"auto",color:"green",fontSize:"27px"}}>Charges : {price}</h1>

                <div class="p-2 w-full">
                  <button class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                    onClick={() => setdatabase()}
                  >Submit</button>
                  <ToastContainer />
                </div>
                {/* <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                  <p class="leading-normal my-5 text-lg"><b>Contact Us At : +92-347-247-653-5 | +92-342-219-581-2 | +92-316-260-594-7</b>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )

}