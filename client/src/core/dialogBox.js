import React,{useState,useEffect} from 'react'
import "./popup.css"
import {API} from '../config'
import {Redirect} from 'react-router-dom'
import {getCategoryName} from './apiCore'

const DialogBox = (props)=>{
    const src = API + "/category/image/" + props.match.params.categoryId;

    const [values,setValues] = useState({
        categoryName:'',
        state:'',
        city:'',
        category:props.match.params.categoryId,
        userID:props.match.params.userID,
        redirectUser:false
    })

    const {categoryName,state,city,category,redirectUser,userID} = values;

    const handleChange = (name) => (event)=>{
        setValues({...values,[name]:event.target.value})
    }

    const handleClick = (event) =>{
        event.preventDefault();
        setValues({...values,redirectUser:true})
    }

    const updateCategoryName = ()=>{
        getCategoryName(category).then(data=>{
            setValues({...values,categoryName:data.name})
        })
    }

    useEffect(()=>{
        updateCategoryName();
    },[])

    const redirect = ()=>{
        if(redirectUser)
        {
            return <Redirect to = {`/${userID}/category/${category}/ngo/${state}/${city}`}/>
        }
    }

    return(
        <div className="popup">
            <div>
                <h1>{categoryName}</h1>
            </div>
            <div>
                <label className="dbLabel">State</label>
            </div>
            <div>
                <input  className="db"
                        type="text" 
                        placeholder="Enter State" 
                        onChange={handleChange('state')}
                        value={state}
                />
            </div>
            <div>
                <label className="dbLabel">City</label>
            </div>
            <div>
                <input  className="db"
                        type="text" 
                        placeholder="Enter City" 
                        onChange={handleChange('city')}
                        value={city}
                />
            </div>
            <div>
                <button onClick={handleClick}>next</button>
            </div>
            {redirect()}
        </div>
    )
}

export default DialogBox;
