import React,{useEffect} from 'react'
import {Link,withRouter} from 'react-router-dom'
import "./navbar.css"
import {signout,isAuthenticated} from '../auth/index'
import $ from 'jquery'

const Navbar = ({history})=>{

    // UseScript('https://kit.fontawesome.com/yourcode.js');
    
    useEffect(()=>{
        $('#icon').click(function(){
            $('ul').toggleClass('show')
          })
  
    })
    
    return(
        <nav>
            <label className="logo">Donate Cart</label>
            <ul>
                <li>
                    <a className="link" href="/">Home</a>
                </li>
                <li>
                    <a className="link">Causes</a>
                </li>
                <li>
                    <a className="link">About</a>
                </li>
                <li>
                    <a className="link">Team</a>
                </li>
                <li>
                    <a className="link">Contact</a>
                </li>
                {!isAuthenticated() && (
                    <li>
                        <a className="link"
                            href="/signin">
                            Login/Registration
                        </a>
                    </li>
                )}
                {isAuthenticated() && (
                    <li>
                        <a className='link'
                          style={{cursor:'pointer'}}
                          onClick={
                              ()=>{
                                  signout(()=>{
                                      history.push('/signin')
                                  })
                              }
                          }
                          >
                          Signout
                        </a>
                    </li>
                )}
            </ul>
            <label id="icon">
                <i className="fas fa-bars"></i>
            </label>
        </nav>
)}

export default withRouter(Navbar);