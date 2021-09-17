import React,{useState} from 'react'
import { signout} from "../auth/index";
import {Redirect} from 'react-router-dom'

const Home = () =>{

    const [values,setValues] = useState({
        redirectToMain:false
    })

    const {redirectToMain} = values

    const handleSubmit = (event)=>{
        signout(()=>{
            console.log("Succesfully Signout")
            setValues({...values,redirectToMain:true})
        })
    }
    
    const redirectUser = ()=>{
        if(redirectToMain)
        {
            return <Redirect to="/signin" />
        }
    }

    return(
        <div>
            <h1>Successfully signed in</h1>
            <button onClick={handleSubmit}>Signout</button>
            {redirectUser()}
        </div>
    )
}

export default Home