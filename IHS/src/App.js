import React,{useEffect,useState} from 'react';
import './App.css';
import Home from './pages/home';
import { ErrorPage } from './pages/errorPage';
import { ToastContainer, toast } from 'react-toastify';

import { RootComponent } from './pages/root';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Signin } from './pages/signin';
import { ListPage } from './pages/list';
import Detail from './pages/detail';
import 'react-slideshow-image/dist/styles.css'
import { RegisterForm } from './pages/register';
import { ListingForm } from './pages/cretaeListingForm';
import { FaSignInAlt } from 'react-icons/fa';
import { ContactUs } from './pages/contactus';
import { AboutUs } from './pages/aboutus';
import 'react-toastify/dist/ReactToastify.css'
import { TermsAndConditions } from './pages/termsandconditions';

import { Firebase } from "./firebase/firebase";
import { FirebaseContext } from "./context/firebase-context";
import { ListSpeficPage } from './pages/SpeficList';
import { CatSpeficPage } from './pages/SpeficCategory';
import { CatSpeficPage1 } from './pages/Cat1';
import { CatSpeficPage2 } from './pages/Cat2';
import { CatSpeficPage3 } from './pages/Cat3';
import { CatSpeficPage4 } from './pages/Cat4';
import { CatSpeficPage5 } from './pages/Cat5';

import { getFirebaseToken, onForegroundMessage } from './firebase/firebase';
import { Cat1 } from './pages/Cat';
import { TransportForm } from './pages/TransportForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "Listing",
        element: <ListPage />,
      },
      {
        path: "ListSpec",
        element: <ListSpeficPage />
      },

      {
        path: "Cat/1",
        element: <CatSpeficPage1 />
      },
      {
        path: "Cat/2",
        element: <CatSpeficPage2 />
      },
      {
        path: "Cat/3",
        element: <CatSpeficPage3 />
      },
      {
        path: "Cat/4",
        element: <CatSpeficPage4 />
      },
      {
        path:"Cat/new",
        element: <Cat1 />


      },
      {
        path:"Transport_Services",
        element: <TransportForm />


      },
      {
        path: "Cat/5",
        element: <CatSpeficPage5 />
      },
      {
        path: "ListSpec",
        element: <ListSpeficPage />
      },
      {
        path: "Listing/detail/:id",
        element: <Detail />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "listingform",
        element: <ListingForm />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "termsandconditions",
        element: <TermsAndConditions />,
      },
    ],
  },

]);





function App() {

  

  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <RouterProvider router={router} />
    </FirebaseContext.Provider>
  );
}



export default App;
