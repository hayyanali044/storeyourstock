import React, { useEffect, useState } from 'react'

import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Routesaddress } from '../../utils/api'
import { auth, database } from '../../context/Firebase';
import { get, ref } from 'firebase/database';


const Dashboard1 = () => {
    const [data, setData] = React.useState([])
    const { auth, theme } = useAuth();

 
    const [product, setproduct] = useState(0)
 

    useEffect(() => {
      
        countproduct()
       
    }, [])

    const countproduct = async () => {
        let uid = localStorage.getItem(`uid`)
        console.log(uid)
        let userref = ref(database, `Product`)
        await get(userref).then((snap) => {
            let userproduct = 0
            if(snap.val()!=null){
                let maindata=Object.values(snap.val())
                console.log(maindata)
                for(var i=0;i<maindata.length;i++ ){
                    if(maindata[i].useruid ==uid){
                        userproduct+=1
                    }
                }
                setproduct(userproduct)
            

            }

        })
    }

   






    return (
        <div className="">
            <div className='bg-background h-screen w-full px-4 py-4'>
                <div className="flex gap-4 ">
                 
                  


                    <div className={`${theme == 'light' ? 'bg-[#82b012]' : 'bg-cardColor'}  rounded-lg w-[25%] flex justify-between  items-center px-4 py-8 `}>
                        <div className="">
                            <h1 className='text-xl font-bold text-white font-[SF-Pro-Display-Regular]'>{product}</h1>
                            <p className='text-[12px] text-gray-300 font-bold font-[SF-Pro-Display-Regular]'>TOTAL Product</p>
                        </div>
                        <div className="">
                            <StorefrontIcon style={{ color: "white", fontSize: '3rem' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard1