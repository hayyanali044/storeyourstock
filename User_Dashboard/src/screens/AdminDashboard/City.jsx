import { Checkbox, MenuItem, Select, TextField } from '@mui/material';
import React from 'react'
import UploadImg from '../../components/UploadImg';
import useAuth from '../../hooks/useAuth';
import { Routesaddress } from '../../utils/api'
import Table from '../../components/Table'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons'
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { storage, database } from '../../context/Firebase';
import { set, ref, get,push } from "firebase/database";
import { DeleteForever } from '@mui/icons-material';
import {  remove } from "firebase/database";

const Cities = () => {
    const { auth, uploadIMg, theme } = useAuth();
    const [data, setData] = React.useState([])
    const [selected, setSelected] = React.useState(false)
    React.useEffect(() => {


    }, [])

    React.useEffect(() => {
        getData()

    }, [])




    const getData = () => {
        var data = ref(database, "Cities")

        get(data).then((snap) => {
            console.log(snap.val())
            if (snap.val() != null) {
                setData(Object.values(snap.val()))

            }

        })
            .catch((e) => console.log(e.code))

    }

    const CreateCategory = () => {
        const [getImg, setGetImg] = React.useState({ url: '', file: File });
        const [value, setValue] = React.useState({
            title: "",
            name: "",
            descrpition: "",
            contact: "",
            email: "",
            link: ""
        });


        const handlerChange = (e) => {
            const { name, value: values } = e.target;
            setValue({
                ...value,
                [name]: values,
            });
        };
        const [dropDon, setDropDon] = React.useState(false)

        const handlerSUbmit = async () => {


            let dbref = ref(database, `Cities`)
            let key = push(dbref).key

            var obj = {
              
                city_name: value.title,
                key:key
                

            }

            try {
                let dbref = ref(database, `Cities/${key}`); //ref,path
                await set(dbref, obj);
                toast.success("Add Succefully About Info", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            catch (e) {
                toast.error(e.code, {
                    position: toast.POSITION.TOP_CENTER
                })
            }

        }

        const uplaodImage = (e) => {
            console.log(e.target.files[0])
            const storageref = sRef(storage, `images/${e.target.files[0].name}`);

            uploadBytes(storageref, e.target.files[0])
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            console.log(url);
                            setValue({
                                ...value,
                                link: url,
                            });
                            toast.success("Succeffully Image Uplaod", {
                                position: toast.POSITION.TOP_CENTER
                            })

                        })
                        .catch((e) => {
                            toast.success(e.code, {
                                position: toast.POSITION.TOP_CENTER
                            })

                        });
                })
                .catch((e) => {
                    toast.success(e.code, {
                        position: toast.POSITION.TOP_CENTER
                    })

                });
        }

        const label = { inputProps: { 'aria-label': 'Active' } };
        return (

            <div className="w-[60%] ml-4 bg-cardColor px-4 py-4 rounded-xl" >
                <div className="w-full  flex flex-col">
                    <div className="flex justify-between py-2 px-2 items-center">
                        <h1 className="text-xl font-bold text-mainTextColor font-[SF-Pro-Display-Regular]">Add City List</h1>
                        <h1 className="text-xl font-bold text-mainTextColor py-1 cursor-pointer px-2 bg-background rounded items-center" onClick={() => setSelected(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </h1>
                    </div>
                    
                    <div className="flex gap-4 my-2 ">
                        <div className="px-2 w-full rounded bg-background">
                            <input type="text"

                                className={`${theme == 'light' ? '' : 'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text rounded-md  w-full mt-2`}
                                onChange={handlerChange}
                                placeholder="Title"
                                variant="standard"
                                name="title"
                            />

                        </div>

                    </div>
                    
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handlerSUbmit}
                        className={`mt-2 uppercase px-4  font-[SF-Pro-Display-Regular] cursor-pointer ${theme == 'light' ? 'text-white bg-[#82b012]' : 'text-white bg-background'} py-3 rounded`}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        );
    };


    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'Id',
        },
        {
            id: 'title',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'cateogryPicturePath',
            numeric: true,
            disablePadding: false,
            label: 'Image',
            type: 'image'
        },
        {
            id: 'is_active',
            numeric: true,
            disablePadding: false,
            label: 'Active',

        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            label: 'Action',
            type: 'action'
        },

    ];
    function createData(
        id,
        title,
        cateogryPicturePath,
        is_active,
        action,
    ) {
        return {
            id,
            title,
            cateogryPicturePath,
            is_active,
            action,
        };
    }
    const handlerCLick = (name, id) => {


    }
    const [loading, setLoading] = React.useState(true)

    const deleteData =async (key) => {
        console.log(key)
        console.log("jbfbhj")
        try{
            const dataRef = ref(database, `Cities/${key}`);
            await remove(dataRef);
            toast.error("Delete Succefully", {
                position: toast.POSITION.TOP_CENTER
            })
            getData()
        }
        catch(e){
            toast.error(e.code, {
                position: toast.POSITION.TOP_CENTER,
            })
        }
      

    }


    return (
        <div>
            <div className="">
                {selected ? <div className="w-full h-full flex gap-4 ">
                    <CreateCategory />
                </div> : (
                    <div className="">
                        <div className="flex mb-6 justify-between my-4 mr-4">
                            <div className="px-4 ">
                                <h1 className={`border-b border-t-0 border-x-0 border-4 border-white inline ${theme == 'light' ? 'text-[#82b012] border-[#82b012]' : 'border-white text-white'} text-5xl font-bold font-[SF-Pro-Display-Regular] tracking-wide`}>Cities List</h1>
                            </div>
                            <button onClick={() => (setLoading(true), setSelected(true))} className={`mt-2 uppercase px-4 cursor-pointer ${theme == 'light' ? 'text-white bg-[#82b012]' : 'text-white bg-cardColor'} py-3 rounded font-[SF-Pro-Display-Regular]`}>+ ADD City</button>
                        </div>
                        <table>
                            <thead>
                                <tr>

                                    <th>S.No</th>
                                    <th>City Name</th>
                                    <th>View</th>



                                </tr>
                            </thead>
                            <tbody>
                                {data.map((v, i) => {
                                    return (
                                        <tr key={i + 1}>
                                            <td>{i + 1}</td>
                                            <td>{v.city_name}</td>
                                            <td>
                                                <DeleteForever style={{ color: "white", fontSize: "40px" }} onClick={()=>deleteData(v.key)} />
                                            </td>

                                        </tr>
                                    )
                                })}



                            </tbody>
                        </table>
                        {/*  */}

                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default Cities









