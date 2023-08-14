import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import { Card } from "../components/card";
import { database } from "../firebase/firebase";
import { push, ref, set, getDatabase, get, child, orderByChild, equalTo } from "firebase/database";

export const ListPage = () => {
  const location = useLocation();
  // const [car, setCar] = useState(location.state.car);
  // const [option, setOption] = useState(location.state.option);
  // const [destination, setDestination] = useState(location.state.destination);
  const [date, setdate] = useState(location.state.date);
  const [openDate, setopenDate] = useState(false);
  const [openType, setopenType] = useState(false);

  let [Sqyard, setSqyard] = useState(0)

  const [locationlist, setlocationlist] = useState([])
  const [city, setcity] = useState("")
  let [test, settest] = useState(false)

  let [minprice, setminprice] = useState(0)
  let [maxprice, setmaxprice] = useState(0)

  const [name, setname] = useState()


  let [product, setproduct] = useState([])


  useEffect(() => {
    searchFirstTime()
    // productdata()
    getcity()
  }, [])


  const searchFirstTime = () => {
    console.log(location.state.cat)
    console.log(location.state.city)
    console.log(location.state.price)
    setproduct([])

    let products = []
    var checktest = false

    const dbRef = ref(getDatabase());

    get(child(dbRef, `Product`)).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(Object.keys(snapshot.val()))
        let listcity = Object.values(snapshot.val())

        for (var i of listcity) {
          if (i.City == location.state.city && i.category == location.state.cat && minprice <= parseInt(i.price)) {
            products.push(i)
            checktest = true

          }

        }

        setproduct(products)
        settest(checktest)

      }
    })



  }


  const searchdata = async () => {
    console.log(name)
    console.log(city)
    console.log(minprice)
    console.log(maxprice)
    console.log(Sqyard)
    if (city != "") {
      let products = []
      setproduct([])
      console.log(city)
      const dbRef = ref(getDatabase());

      get(child(dbRef, `Product`)).then((snapshot) => {
        if (snapshot.exists()) {
          let listcity = Object.values(snapshot.val())
          var checktest = false

          console.log(listcity)


          if (name != undefined && city != undefined && minprice > 0 && maxprice > 0) {
            console.log("run12")
            for (var i of listcity) {
              if (i.City == city && i.category == name && minprice < parseInt(i.price) && maxprice > parseInt(i.price)) {
                products.push(i)
                checktest = true
              }

            }

          }
          else if (city != undefined && name != undefined) {
            console.log("run2")

            for (var i of listcity) {
              console.log(i)
              if (i.City == city && i.category == name) {
                products.push(i)
                checktest = true
              }

            }
          }

          else if (city != undefined && minprice > 0 && maxprice > 0) {
            console.log("run3")

            for (var i of listcity) {

              if (i.City == city) {
                if (minprice <= parseInt(i.price) && maxprice >= parseInt(i.price)) {
                  products.push(i)
                  checktest = true

                }

              }

            }
          }


          else if (city != undefined) {
            console.log("run4")

            for (var i of listcity) {
              if (i.City == city) {
                console.log(i)
                products.push(i)
                checktest = true
              }

            }
          }
          else if (name != undefined) {
            console.log("run4")

            for (var i of listcity) {
              if (i.category == name) {
                products.push(i)
                checktest = true
              }

            }
          }



          // if (city != "" && city != undefined || name!=undefined && name !="" || minprice != 0 && maxprice !=0 ) {
          //   console.log("1")
          //   console.log(name)
          //   for (var i of listcity) {
          //     if (i.City == city && i.category == name && minprice < i.price && maxprice > i.price) {

          //       products.push(i)
          //       checktest = true
          //     }
          //   }
          // }

          // else  if (city != "" || city != undefined || name!=undefined || name !=""  ) {
          //   console.log("2")

          //     for (var i of listcity) {
          //       if (i.City == city && i.category == name) {

          //         products.push(i)
          //         checktest = true
          //       }
          //     }
          //   }


          //  else  if (city != "" || city != undefined) {
          //   console.log("3")

          //     for (var i of listcity) {
          //       if (i.City == city) {

          //         products.push(i)
          //         checktest = true
          //       }
          //     }
          //   }



          setproduct(products)
          settest(checktest)

          // } else {
          //   // console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });



    }
  }


  const getcity = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Cities`)).then((snapshot) => {
      if (snapshot.exists()) {

        let listcity = Object.values(snapshot.val())

        setlocationlist(listcity)
      } else {
        // console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const productdata = async () => {
    let dbref = ref(database, "Product")
    await get(dbref).then((snap) => {
      console.log(snap.val())
      var checktest = false
      if (snap.val() != null) {
        let data = Object.values(snap.val())
        console.log(data)

        setproduct(data)
        checktest = true
      }
      settest(checktest)




    })
  }

  return (
    <>

      <div className="bg-white pt-20   mb-40">
        <div className=" pb-20 container mx-auto  shadow-2xl p-4  rounded-2xl flex bg-white">
          <div className="flex h-fit shadow-xl  p-4 rounded-lg  mx-5">
            <div class="space-y-4 mx-2 text-gray-700">
              <div class="flex flex-wrap">
                <div class="w-full">
                  {/* <label class="block mb-1" for="formGridCode_card">
                    Location
                  </label> */}
                  <div className="space-y-1 grow">
                    <label htmlFor="Category" className="font-medium">  Location : &emsp; &emsp;

                      <select style={{ width: "100%" }}
                        className=" border mt-2   border-green-500 p-1 rounded"
                        onChange={(e) => setcity(e.target.value)}
                        //   onClick={(ev) => setCar(ev.target.value)}
                        name=""
                        id=""
                      >
                        <option value="Select"
                        >
                          Select City
                        </option>
                        {
                          locationlist.map((v, i) => {
                            return <option value={v.city_name}>
                              {v.city_name}
                            </option>
                          })
                        }



                      </select>
                    </label>
                  </div>
                </div>

              </div>
              {/* <div class="flex flex-wrap  space-y-4 md:space-y-0">
                <div class="w-full px-2 md:w-1/2">
                  <label class="block mb-1" for="formGridCode_name">
                    Area: <small>Sq-Yard </small>
                  </label>
                </div>
                <div class="w-full px-2 md:w-2/2">
                  <input
                    placeholder={`enter Sqr-Yd `}
                    class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    min={1}
                    type="number"
                    id="formGridCode_name"
                    onChange={(e) => setSqyard(e.target.value)}
                  />
                </div>
              </div> */}

              <div class="w-full px-2 md:w-1/2">
                <label class="block mb-1" for="formGridCode_name">
                  Categories
                </label>
              </div>
              <div class="w-full px-2 ">
                <input
                  value={name}
                  onClick={() => setopenType(!openType)}
                  placeholder={"enter Category"}
                  class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  id="formGridCode_name"
                />
                {openType && (
                  <select
                    className=" border mt-2   border-green-500 p-1 rounded shadow-lg "
                    onClick={(ev) => setname(ev.target.value)}
                    name=""
                    id=""
                  >
                    <option value="Storages Near Me"> Storages Near Me</option>
                    <option value="24/7 available storage">
                      {" "}
                      24/7 available storage
                    </option>
                    <option value="Business Stock Storage">
                      Business Stock Storage
                    </option>
                    <option value="Vehicle storage">
                      {" "}
                      Vehicle storage (car, bike, bus, truck, container,
                      rickshaws)
                    </option>
                    <option value="Cold Storage"> Cold storage</option>
                    <option value="Warehouse Storage">
                      {" "}
                      Warehouse Storage
                    </option>
                  </select>
                )}
              </div>
              <div class="flex flex-wrap  my-5 space-y-4 md:space-y-0">
                <div class="w-full px-2 md:w-1/2">
                  <label class="block mb-1" for="formGridCode_name">
                    Min Price:
                  </label>
                </div>
                <div class="w-full px-2 md:w-2/2">
                  <input
                    placeholder="Enter Minimum Price"
                    class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    min={5000}
                    value={minprice}
                    onChange={((e) => setminprice(e.target.value))}
                    type="number"
                    id="formGridCode_name"
                  />
                </div>
              </div>
              <div class="flex flex-wrap  my-5 space-y-4 md:space-y-0">
                <div class="w-full px-2 md:w-1/2">
                  <label class="block mb-1" for="formGridCode_name">
                    Max Price:
                  </label>
                </div>
                <div class="w-full px-2 md:w-2/2">
                  <input
                    placeholder="Enter Maximum Price"
                    class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    min={1}
                    value={maxprice}
                    onChange={((e) => setmaxprice(e.target.value))}
                    type="number"
                    id="formGridCode_name"
                  />
                </div>
              </div>
              <div className="w-full   my-3">
                <button
                  onClick={() => searchdata()}
                  className=" flex justify-center w-full lg:mt-2 xl:mt-0 flex-shrink-0  text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="flex ">
            <section className="text-black body-font">
              <div className="container px-5 py-5 mx-auto">
                <div className="flex  flex-wrap -m-4">



                  {

                    product.length == 0 ?
                      test == false ?
                        <h1>{test}</h1>
                        // <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" style={{ height: 100, width: 200, textAlign: "center", display: "block", marginLeft: "50%", marginTop: "1%" }} alt="" />
                        :
                        <h1>No data </h1>



                      :


                      product.map((v, i) => {
                        return <Card data={v} />
                      })
                  }


                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
