import React, {useState} from 'react';
import { BrowserRouter, Switch, Route,Link } from "react-router-dom";
import './App.css';
import useToken from './Token/useToken';

import Map from './pages/Home';
import ListMode from './pages/listMode';
import ViewAllFilms from './pages/viewAllFilms';
import List from './pages/List';

import Login from './login/Login';
import Register from './login/Register';
import ForgetPassword from './login/forgetPassword';
import SingleFilmPage from './login/singleFilmPage';
import Account from './login/account';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

function App() {
    const {token,setToken} = useToken();
    
    if(!token) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/List">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/ListMode">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/Map">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/Account">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/SingleFilmPage">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/ForgetPassword">
                        <ForgetPassword/>
                    </Route>
                    <Route path="/Register">
                        <Register/>
                    </Route>
                    <Route exact path="/">
                        <Login setToken={setToken} />
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/List">
                        <ViewAllFilms/>
                    </Route>
                    <Route path="/ListMode">
                        <ListMode/>
                    </Route>
                    <Route exact path="/Map">
                        <Map/>
                    </Route>
                    <Route path="/Account">
                        <Account/>
                    </Route>
                    <Route path="/SingleFilmPage">
                        <SingleFilmPage/>
                    </Route>
                    <Route path="/ForgetPassword">
                        <ForgetPassword/>
                    </Route>
                    <Route path="/Register">
                        <Register/>
                    </Route> 
                    <Route path="/">
                        <Login setToken={setToken}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
