import React,{useState} from "react";
import "./style.css"
import {signup} from '../auth/index'
import {Link} from 'react-router-dom'
import Navbar from '../core/navbar'
const Signin = () => {
    
    const [values,setValues] = useState({
        name:'Manpreet',
        email:'singhmanpreet0707@yahoo.com',
        password:'sahez456',
        contact:8289094310,
        error:'',
        success:false
    })

    const {name,email,password,contact,error,success} = values;

    const handleChange = (name) =>(event) =>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values,error:false})
        signup({name,email,password,contact})
        .then(data=>{
            if(data.error)
            {
                setValues({...values,error:data.error,success:false})
            }
            else
            {
                setValues({
                    ...values,
                    name:'',
                    email:'',
                    password:'',
                    contact:8289094310,
                    error:false,
                    success:true
                })
            }
        })
        .catch()
    }


    const signUpForm = () => (
        <div>
            <div className="wrapper">
                <div className="header-text">Welcome</div>
                <div>
                    <label>Name</label>
                    <input type="text" 
                    placeholder="Enter Name"
                    value={name}
                    onChange={handleChange('name')}>
                    </input>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange('email')}>
                    </input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange('password')}>
                    </input>
                </div>
                <div>
                    <label>Contact</label>
                    <input type="number" 
                    min="1000000000"
                    max="9999999999" 
                    placeholder="Enter contact number"
                    value={contact}
                    onChange={handleChange('contact')}>
                    </input>
                </div>
                <div>
                    <button onClick={handleSubmit}>
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );

    const showError = () =>(
        <div className='error' style={{display: error ? '':'none'}}>
        <div>
            {error}
        </div>
    </div>
    )

    const showSuccess = () =>(
        <div className='alert alert-info' style={{display: success ? '':'none'}}>
            New user created successfully.Please <Link to='/signin'>Signin</Link>.
        </div>
    )
    

    return (
        <div className="container col-md-8 offset-md-2">
            <Navbar />
            {showError()}
            {showSuccess()}   
            {signUpForm()}
        </div>
    );
};

export default Signin;
