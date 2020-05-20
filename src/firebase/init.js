import firebase from "firebase";
import "firebase/firestore";
// import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyChL-IPUR9aQCY-Y341yI2DUb7H5NC25wQ",
  authDomain: "foodapp-5c678.firebaseapp.com",
  databaseURL: "https://foodapp-5c678.firebaseio.com",
  projectId: "foodapp-5c678",
  storageBucket: "foodapp-5c678.appspot.com",
  messagingSenderId: "378838690046",
  appId: "1:378838690046:web:9093083e7439729e63ddaf",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// export firestore databse
export default firebaseApp.firestore();
