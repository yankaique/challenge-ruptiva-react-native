import firebase from 'firebase';

import 'firebase/storage';

var firebaseConfig = {
  apiKey: "?",
  authDomain: "?",
  projectId: "?",
  storageBucket: "?",
  messagingSenderId: "?",
  appId: "?"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
