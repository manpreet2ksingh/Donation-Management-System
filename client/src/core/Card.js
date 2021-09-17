import React,{useState} from 'react'
import ShowImage from './showImage'
import {Redirect} from 'react-router-dom'
import "./card.css"

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
            return <Redirect to={`/${data.userID}/category/${data._id}`}/>
        }
    }

    return(
        <div id="cardBody">
        <div className="card">
            <ShowImage data={data} />
            <div className="card-text">
                <h2>{data.name}</h2>
            </div>
            <div className="card-desc">
                <p>{data.description}
                </p>
            </div>
            <div className="card-btn">
                <button onClick={handleClick}>Select</button>
            </div>
            {redirectUser()}
        </div>
        </div>
    )
}

export default Card;