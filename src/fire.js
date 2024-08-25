// fire.js (or firebase.js)

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDOnjxDPBetFiOqhS3EIPiMMY4mMbnjVDg",
  authDomain: "task-management-b24cf.firebaseapp.com",
  projectId: "task-management-b24cf",
  storageBucket: "task-management-b24cf.appspot.com",
  messagingSenderId: "165475628479",
  appId: "1:165475628479:web:479458f9da2824d5f91d0a",
  measurementId: "G-9VQD6JQK40"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
