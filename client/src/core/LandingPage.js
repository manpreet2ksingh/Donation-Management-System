import React,{useState} from 'react'
import Navbar from './navbar'
import './card.css'
import {isAuthenticated} from '../auth/index'
import {Redirect} from 'react-router-dom'

const LandingPage = ()=>{

    var user = isAuthenticated().user;
    const [redirectUser,setRedirect] = useState(false)
    var api = `/`;
    if(user)
        api = `/${user._id}/categories/`;

    const handleClick = (event)=>{
        event.preventDefault();
        setRedirect(true)
    }

    const redirectToCategories = ()=>{
        if(redirectUser)
        {
            return <Redirect to={api}/>
        }
    }

    return(
        <div>
            <Navbar />
            <div className="next">
                <button onClick={handleClick}> Proceed </button>
            </div>
            {redirectToCategories()}
        </div>
    )
}

export default LandingPage