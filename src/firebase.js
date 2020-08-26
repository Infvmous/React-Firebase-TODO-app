import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "***REMOVED***",
    authDomain: "todo-app-745fd.firebaseapp.com",
    databaseURL: "https://todo-app-745fd.firebaseio.com",
    projectId: "todo-app-745fd",
    storageBucket: "todo-app-745fd.appspot.com",
    messagingSenderId: "328905272207",
    appId: "1:328905272207:web:feace4e072d635560e39fa",
    measurementId: "G-609QK062L4"
});

const db = firebaseApp.firestore();

export default db;
