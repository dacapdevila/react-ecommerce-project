import firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBGEsWRL9IDyW8E4-vwopOo7hU3wEVLEo0",
    authDomain: "react-proyecto-final.firebaseapp.com",
    databaseURL: "https://react-proyecto-final.firebaseio.com",
    projectId: "react-proyecto-final",
    storageBucket: "react-proyecto-final.appspot.com",
    messagingSenderId: "82155633450",
    appId: "1:82155633450:web:25ecc186c0cacb5db9bc53",
    measurementId: "G-ZFX6RJW3XL"
});

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore(app);
}
