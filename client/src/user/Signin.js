import React,{useState} from "react";
import "./style.css"
import {Redirect,Link} from 'react-router-dom'
import { signin,authenticate,isAuthenticated} from "../auth/index";
import Navbar from '../core/navbar'
const Signin = () => {
    
    const [values,setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false
    })

    const {email,password,error,loading,redirectToReferrer} = values;

    const handleChange = (name) => event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                  authenticate(
                      data,
                      ()=>{
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                      })
            }
        });
    }

    const showError = () => (
        <div className="error"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div>
                <h2>Loading...</h2>
            </div>
        );


    const redirectUser = () => {
        if (redirectToReferrer) {    
                return <Redirect to="/" />
        }

        if(isAuthenticated())
        {
            return <Redirect to="/" />
        }
    };

    const signInForm = () => (
        <div>
            <div className="wrapper">
                <div className="header-text">Welcome</div>
                <div>
                    <label>Email</label>
                </div>
                <input type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange('email')}>
                </input>
                <div>
                    <label>Password</label>
                </div>
                <input type="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange('password')}>
                </input>
                <button onClick={handleSubmit}>
                    Login
                </button>
                <div className="href">
                    <Link className="href" to='/signup'>REGISTER HERE</Link>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Navbar />
            {showError()}
            {showLoading()}
            {signInForm()}
            {redirectUser()}
        </div>
    );
};

export default Signin;
