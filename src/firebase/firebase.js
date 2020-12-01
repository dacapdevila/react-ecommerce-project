import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from "./config";

class Firebase {

    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
        this.db = app.firestore();
    }

    async registerNewUser(nombre, email, password) {
        console.log('email');
        console.log(email);
        console.log('password');
        console.log(password);
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
        return await newUser.user.updateProfile({
            displayName : nombre,
        });
    }

    async loginUser(email, password) {
        console.log('email');
        console.log(email);
        console.log('password');
        console.log(password);
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    async logoutUser() {
        await this.auth.signOut();
    }

}

const firebase = new Firebase();
export default firebase;
