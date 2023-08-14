import React,{useEffect,useState} from "react";
import { HeroSection } from "../components/heroSection";
import { Tools } from "../components/tools";
import { Featured } from "../components/featureed";
import { ToastContainer, toast } from 'react-toastify';
import { getFirebaseToken,onForegroundMessage } from "../firebase/firebase";
import 'react-toastify/dist/ReactToastify.css'

const Home = ()=>{

    const [showNotificationBanner, setShowNotificationBanner] = useState(Notification.permission === 'default');

  useEffect(() => {
    onForegroundMessage()
      .then((payload) => {
       alert('Received foreground message: ', payload.notification.title);
        const { notification: { title, body } } = payload;
        toast(<ToastifyNotification title={title} body={body} />);
      })
      .catch(err => console.log('An error occured while retrieving foreground message. ', err));
  }, []);


  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then((firebaseToken) => {
        console.log('Firebase token: ', firebaseToken);
        if (firebaseToken) {
          setShowNotificationBanner(false);
        }
      })
      .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
  }


  const ToastifyNotification = ({ title, body }) => (
    <div className="push-notification">
      <h2 className="push-notification-title">{title}</h2>
      <p className="push-notification-text">{body}</p>
    </div>
  );

    return(
        <>
        <>
        {showNotificationBanner && <div className="notification-banner">
          <span>The app needs permission to</span>
          <a
            href="#"
            className="notification-banner-link"
            onClick={handleGetFirebaseToken}
          >
            enable push notifications.
          </a>
          <ToastContainer/>
        </div>}</>
        
    <HeroSection/>
    <Tools/>
    <Featured />
        </>
    )
}

export default Home;