// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken,onMessage, NotificationPermission  } from 'firebase/messaging';
// import firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNEotgv3QLKoLPG7Fszd7_XJdBR4pvooc",
  authDomain: "store-stock-fbc0d.firebaseapp.com",
  databaseURL: "https://store-stock-fbc0d-default-rtdb.firebaseio.com",
  projectId: "store-stock-fbc0d",
  storageBucket: "store-stock-fbc0d.appspot.com",
  messagingSenderId: "681166334206",
  appId: "1:681166334206:web:e738e3dffc27eb34331daf"
};

export const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-push-notification-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-push-notification-scope',
        });
      });
  }
  throw new Error('The browser doesn`t support service worker.');
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker()
    .then((serviceWorkerRegistration) =>
      getToken(messaging, { vapidKey: "BIeIUgzycyR8u_4Jc6c_MUT4IZ_oyVnFlD2YtkuyCJFkfqzho0kNZGgaQIBb7DcL0UkJrlT5KAxjBS9MOLZ5pVc", serviceWorkerRegistration }));

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messaging = getMessaging(app);

const storage = getStorage(app);

// const messaging = getMessaging(app);
export { database, storage };



export class Firebase {
  constructor() {
    if (firebaseConfig) {
      const app = initializeApp(firebaseConfig);
      this.auth = getAuth(app)
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          localStorage.setItem('authUser', JSON.stringify(user));
          
        } else {
          localStorage.removeItem('authUser');
        }
      });
    }
  }

  /**
  * Registers the user with given details
  */
  registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      console.log(email, password, this.auth)
      createUserWithEmailAndPassword(this.auth, email, password)
        .then(
          (user) => {
            resolve(this.auth?.currentUser);
          },
          (error) => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
 * Login user with given details
 */
  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then(
          (result) => {
            console.log(result);
            localStorage.setItem("uid",result.user.uid)
            localStorage.setItem('authUser', JSON.stringify(result));
            resolve(result);
            // resolve(firebase.auth().currentUser);
          },
          (error) => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      signOut(this.auth)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  setLoggedInUser = (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
  };

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!localStorage.getItem('authUser')) return null;
    return JSON.parse(localStorage.getItem('authUser'));
  };

  _handleError(error) {
    var errorMessage = error.message;
    return errorMessage;
  }
}