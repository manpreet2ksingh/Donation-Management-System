import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './core/HomePage'
import Signin from './user/Signin'
import Signup from './user/Signup'
import DialogBox from './core/dialogBox'
import Ngos from './core/ngos'
import LandingPage from './core/LandingPage'
import DonationForm from './core/DonationForm'
import './styles.css'
const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandingPage}  />
                <Route path='/:userID/categories' exact component={Home}  />
                <Route path='/signin' exact component={Signin}  />
                <Route path='/signup' exact component={Signup}  />
                <Route path='/:userID/category/:categoryId' exact component={DialogBox}  />
<Route path='/:userID/category/:categoryId/ngo/:state/:city' exact component={Ngos}  />
<Route path='/:userID/category/:categoryId/ngo/:state/:city/:ngoID/form' exact component={DonationForm}  />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;