import firebase from "firebase/app";
import "firebase/auth";
// TODO: あとでどこかにまとめる

const firebaseConfig = {
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
auth.useEmulator("http://localhost:9099");

import ReactDom from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

/*
  TODO: あとでUserPageとLoginPageを同じファイルにする
  TODO: できるなら各デフェクトリのindex.tsxにコンポーネントを集めたい
*/

import { LoginPage } from "./auth/index";
import { Header } from "./auth/header";
import { DrawingPage } from "./draw/index";
import { BokePage } from "./boke/index";
import { UserPage } from "./user/index";
import { ShowDrawingPage, ShowCaptionPage} from "./show/index";
import { NotFoundPage } from "./notfound";
import { useState, useLayoutEffect } from "react";

import { ChakraProvider, extendTheme, Spinner } from "@chakra-ui/react"


const defaultTheme = extendTheme({
    colors: {
        white: "#fff6eb"
    },
    component: {
        Box: {
            baseStyle: {
                p: 2,
            }
        }
    },
    styles: {
        global: {
            body: {
                bg: "#fdebd1",
                color: "#4e3819",
            }
        }
    }
});

export default function RootScreen() {
    const auth = firebase.auth();
    
    const [isLoading, setIsLoading] = useState(
           auth.currentUser === undefined 
        || auth.currentUser === null);

    useLayoutEffect(() => {
        const listener = auth.onAuthStateChanged((user: firebase.User | null) => {
            setIsLoading(false);
            return () => { listener(); };
        });    
    }, []);

    const getCurrentUser: () => firebase.User | null = () => { return auth.currentUser };
 
    return (

<ChakraProvider theme={ defaultTheme }>
    {isLoading
    ?(<Spinner size="xl" />)
    :(<Router>
        <Header />
        <Switch>
            <Route exact path="/"> <LoginPage /> </Route>
            <Route path="/draw/:id"><DrawingPage /> </Route>
            <Route path="/boke/:id"><BokePage /> </Route>
            <Route path="/show/draw/:id">
                <ShowDrawingPage getCurrentUser={ () => {return getCurrentUser()}} />
            </Route>
            <Route path="/show/boke/:id">
                <ShowCaptionPage getCurrentUser={ () => {return getCurrentUser()}} />
            </Route>
            <Route path="/user/:id" children={ <UserPage /> } />
            <Route path="*"><NotFoundPage /></Route>
        </Switch>
    </Router>)
    }
</ChakraProvider>)
}

ReactDom.render(
    <RootScreen />,
    document.getElementById('root')
)