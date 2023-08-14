import React from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";

import { addDays } from "date-fns";
import { useState } from "react";
import { database } from "../firebase/firebase";
import { push, ref, set, getDatabase, get, child, orderByChild, equalTo } from "firebase/database";
import { format } from "date-fns";
import { useEffect } from "react";

export const Tools = () => {
  const [openDate, setOpenDate] = useState(false);
  const [car, setCar] = useState("Storages Near Me");
  const [option, setOption] = useState(50);
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);

  const [city,setcity]=useState("")
  const [price,setprice]=useState(0)
  const [cat,setcat] =useState()

  const [locationcity, setlocationlist] = useState([])
  const [category, setcategory] = useState([])




  const [date, setdate] = useState([
    
    {
      startDate: new Date(),
      endDate: addDays(new Date(), -30),
      key: "selection",
      calendarFocus: "backwards"
    },
  ]);

  useEffect(() => {
    getcity()
    getCategory()
  }, [])


  const getcity = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Cities`)).then((snapshot) => {
      if (snapshot.exists()) {

        let listcity = Object.values(snapshot.val())
        setlocationlist(listcity)

      }
    }).catch((error) => {
      console.error(error);
    });
  }


  const getCategory = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Category`)).then((snapshot) => {
      if (snapshot.exists()) {

        let listcity = Object.values(snapshot.val())
        setcategory(listcity)

      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const handleAdd = () => {
    return <>{setOption((i) => i + 10)}</>;
  };
  const handleSub = () => {
    return <>{setOption((i) => (i == 10 ? 10 : i - 10))}</>;
  };

  const navigate = useNavigate();
  const handleSearch = () => {
    console.log(city)
    console.log(price)
    console.log(cat)
    navigate("/listing", { state: { city, price, cat } });
  };
  return (
    <>
      <div className=" pt-20 flex md:flex-row flex-col justify-center  justify-items-center  w-full">
        <div class="text-black  container  bg-white shadow-xl p-2 rounded border border-white     flex md:flex-row flex-col justify-around  justify-items-center ">
          <div class="py-1    ">
            {" "}
            <div className="space-y-1 grow" style={{ marginRight: "30px" }}>

              <select style={{ width: "300px" }}
                class=" border px-1 rounded border-green-500  placeholder:text-black block item-center bg-white w-full   py-2    focus:outline-none  placeholder:text-center "
                onChange={(e) => setcity(e.target.value)}
                  // onClick={(ev) => setCar(ev.target.value)}
                name=""
                id=""
              >
                <option value="Select"
                  selected
                  disabled
                >
                  Select City
                </option>
                {
                  locationcity.map((v, i) => {
                    return <option value={v.city_name}>
                      {v.city_name}
                    </option>
                  })
                }



              </select>

            </div>
          </div>

          <div class="relative" style={{ marginTop: "5px" }}>
            {/* <label for="name" class="leading-7 text-md text-black">Name: </label> */}
            <input type="text" id="name" name="name" 
              placeholder="Enter Price"
              class=" border px-1 rounded border-green-500  placeholder:text-black block item-center bg-white w-full   py-2    focus:outline-none  placeholder:text-center "
              onChange={(e)=>setprice(e.target.value)}
            />
          </div>
          <div class="py-1    ">
            {" "}
            <div className="space-y-1 grow" style={{ marginRight: "30px" }}>

              <select style={{ width: "300px" }}
                class=" border px-1 rounded border-green-500  placeholder:text-black block item-center bg-white w-full   py-2    focus:outline-none  placeholder:text-center "
                onChange={(e) => setcat(e.target.value)}
                //   onClick={(ev) => setCar(ev.target.value)}
                name=""
                id=""
              >
                <option value="Select"
                  selected
                  disabled
                >
                  Select Category
                </option>
                {
                  category.map((v, i) => {
                    return <option value={v.category_name}>
                      {v.category_name}
                    </option>
                  })
                }



              </select>

            </div>
          </div>
          <div className="py-1">
            <button
              onClick={handleSearch}
              className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
