import React from "react";
import { database } from "../firebase/firebase";
import { push, ref, set, getDatabase, get, child, orderByChild, equalTo } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const ContactUs = () => {

  let [name, setname] = useState()
  let [email, setemail] = useState()
  let [message, setmessage] = useState()

  useEffect(() => {
    // setdatabase()
  }, [])

  const setdatabase = async () => {
    // let uid = localStorage.getItem("uid")
    const databaseRef2 = ref(database, `Message`);
    const key = push(databaseRef2).key;

    const databaseRef = ref(database, `Message/${key}`);
    var obj = {name, email, message, key }
    const databaseRef1 = ref(database, `Message/${key}`);
    await set(databaseRef1, obj)
    setname("")
    setemail("")
    setmessage("")

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
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-black">Contact Us</h1>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <label for="name" class="leading-7 text-md text-black">Name: </label>
                    <input type="text" id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <label for="email" class="leading-7 text-md text-black">Email: </label>
                    <input type="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="message" class="leading-7 text-md text-black">Message</label>
                    <textarea id="message"
                      value={message}
                      onChange={(e) => setmessage(e.target.value)}

                      name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                  </div>
                </div>
                <div class="p-2 w-full">
                  <button class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                    onClick={() => setdatabase()}
                  >Submit</button>
                  <ToastContainer/>
                </div>
                <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                  <p class="leading-normal my-5 text-lg"><b>Contact Us At : +92-347-247-653-5 | +92-342-219-581-2 | +92-316-260-594-7</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )

}