import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCGeSN-_x9mz-UlrZSkM2vFekZtMcg83eQ",
    authDomain: "weather-94ff6.firebaseapp.com",
    databaseURL: "https://weather-94ff6.firebaseio.com",
    projectId: "weather-94ff6",
    storageBucket: "weather-94ff6.appspot.com",
    messagingSenderId: "687672487778",
    appId: "1:687672487778:web:f90fc3a022df67f053063b"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp;