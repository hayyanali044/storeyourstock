import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import { Card } from "../components/card";
import { database } from "../firebase/firebase";
import { push, ref, set, getDatabase, get, child, orderByChild, equalTo } from "firebase/database";

export const CatSpeficPage2 = () => {
  const location = useLocation();
  const catname = useParams()
  const [openDate, setopenDate] = useState(false);
  const [openType, setopenType] = useState(false);

  console.log(catname)

  let [location1, setLocation1] = useState({ latitude: null, longitude: null });


  const [locationlist, setlocationlist] = useState([])
  const [city, setcity] = useState("")
  let [test, settest] = useState(false)


  let [product, setproduct] = useState([])





  useEffect(() => {
    productdata()
  }, []);




 

  const productdata = async () => {
    let dbref = ref(database, "Product")
    await get(dbref).then((snap) => {
      console.log(snap.val())
      var checktest = false
      var maindata = [];
      if (snap.val() != null) {
        let data = Object.values(snap.val())
        for (var i of data) {
            if(i.category=="Business Stock Storage"){
                maindata.push(i)
            }

        }
        console.log(data)
        setproduct(maindata)
        // setproduct(data)

        checktest = true
      }
      settest(checktest)




    })
  }

  return (
    <>

      {

        product.length == 0 ?
          test == false ?
            <h1>{test}</h1>
            // <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" style={{ height: 100, width: 200, textAlign: "center", display: "block", marginLeft: "50%", marginTop: "1%" }} alt="" />
            :

            <h1 style={{ textAlign: "center", display: "block", margin: "auto", backgroundColor: "white" ,color:"red",padding:"2%"}}>No data Aviable Right Now Near You </h1>





          :
          <div className="bg-white pt-20   mb-40">
            <div className=" pb-20 container mx-auto  shadow-2xl p-4  rounded-2xl flex bg-white">

              <div className="flex ">
                <section className="text-black body-font">
                  <div className="container px-5 py-5 mx-auto">
                    <div className="flex  flex-wrap -m-4">

                      {product.map((v, i) => {
                        return <Card data={v} />
                      })

                      }

                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
      }
    </>
  );
};
