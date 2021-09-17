import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from './navbar'
import "./cardForNgo.css"

const Card = ({data})=>{
    const [values,setValues] = useState({
        redirectToMain:false
    })

    const {redirectToMain} = values

    const handleClick = (event)=>{
        event.preventDefault();
        setValues({...values,redirectToMain:true})
    }

    const redirectUser = ()=>{
        if(redirectToMain)
        {
const url = `/${data.userID}/category/${data.category._id}/ngo/${data.state}/${data.city}/${data._id}/form`;
            return <Redirect to={url}/>
        }
    }

    return(
            <div className="cardNgo">
                <div className="cardNgo-text">
                    <h2>{data.name}</h2>
                </div>
                <div className="cardNgo-desc">
                    <p>Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor
                    </p>
                </div>
                <div className="cardNgo-email">
                    <h3>{data.email}</h3>
                </div>
                <div className="cardNgo-pincode">
                    <h3>{data.pincode}</h3>
                </div>
                <div className="cardNgo-btn">
                    <button onClick={handleClick}>Select</button>
                </div>
                {redirectUser()}
            </div>
    )
}

export default Card;