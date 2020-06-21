import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import { firebaseConfig } from "../constants/defaultValues";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const store = firebase.firestore();
const database = firebase.database();

export { auth, database, store };
