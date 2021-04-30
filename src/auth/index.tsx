import {useState, useEffect} from "react";
import firebase from "firebase/app";
import "firebase/auth";

// TODO: あとでどこかにまとめる
export const firebaseConfig = {
    apiKey: "AIzaSyAkgTEHqsih0lmwu1hx0IYrJH8RakhYXwA",
    authDomain: "drawboke.firebaseapp.com",
    databaseURL: "https://drawboke-default-rtdb.firebaseio.com",
    projectId: "drawboke",
    storageBucket: "drawboke.appspot.com",
    messagingSenderId: "1008146064966",
    appId: "1:1008146064966:web:9e496005f27b3392d70c47",
    measurementId: "G-RJ2NWBQ1V5"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const Firebase = firebase;

function GoogleLoginResult() {
    const [result_message, setMessage] = useState("まだなにもしてないぜ");

    useEffect(() => {
        firebase.auth()
        .getRedirectResult()
        .then((result) =>  {
            if (result.credential) {
                setMessage("やったぜ");
            }
        }).catch((error) => {
                setMessage("失敗したぜ");
        });
    }, []);

    return (<h2>
        {result_message}
    </h2>)
}

function GoogleLoginButton() {
    const redirect = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    return (
        <button
            onClick = {() => redirect() }
        >
            いますぐクリッコ
        </button>
    )
}

export function LoginScreen() {
    return (
        <div>
            <h1>あなたとドロー<br />いますぐダウンロー<br />ド</h1>
            <GoogleLoginResult />
            <GoogleLoginButton />
        </div>
    )
}