import React,{useEffect,useState} from 'react'
import "./form.css"
import {getNgoName,getUser,updateHistory,send} from './apiCore'

const DonationForm = (props)=>{

    const [selectedNgo,setSelectedNgo] = useState('')
    const [ngoEmail,setNgoEmail] = useState('')
    const [name,setName] = useState('')
    const [values,setValues] = useState({
        contact:'8289094310',
        pickUpAddress:'dsffd',
        pincode:'143001',
        donationDetails:'vvdds',
        state:props.match.params.state,
        city:props.match.params.city,
        userEmail:'msingh_be18@thapar.edu',
        success:false
    })

    const {contact,pickUpAddress,pincode,donationDetails,state,city,userEmail,success} = values;

    const ngoName = ()=>{
        getNgoName(props.match.params.ngoID).then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            setSelectedNgo(data.name)
            setNgoEmail(data.email)
        })
    }

    const donorName = ()=>{
        console.log()
        getUser(props.match.params.userID).then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            setName(data.name)
        })
    }

    const showSuccess = () =>(
        <div className='title' style={{display: success ? '':'none'}}>
            Success
        </div>
    )
    
    useEffect(()=>{
        ngoName();
        donorName();
    })

    const handleChange = (name) =>(event)=>{
        setValues({...values,[name]:event.target.value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        const parameters = {
        name,selectedNgo,ngoEmail,userEmail,pincode,contact,pickUpAddress,
        donationDetails,state,city}
        updateHistory(props.match.params.userID,parameters).then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else
            {
                console.log("User history updated.")
                setValues({...values,
                    contact:'',
                    pickUpAddress:'',
                    pincode:'',
                    donationDetails:'',
                    userEmail:'',
                    success:true
                })
            }
        })

        send(parameters).then(data=>{
            console.log(data)
        })        

    }

    return(
        <div className="donationForm">
            <div className="title">
                Donation Form
            </div>
            {showSuccess()}   
        <div className="form">
        <div className="inputfield">
            <label>Donor</label>
            <input type="text"
                className="inp" 
                value={name}/>
        </div> 
            <div className="inputfield">
            <label>NGO selected</label>
            <input type="text" 
                   value={selectedNgo}
                   className="inp" />
            </div> 
        <div className="inputfield">
            <label>Ngo Email Address</label>
            <input type="email" 
                   value={ngoEmail}
                   className="inp" required="true" />
         </div> 
        <div className="inputfield">
          <label>State</label>
          <input type="text" 
                 value={state} 
                 className="inp" />
       </div>  
       <div className="inputfield">
          <label>City</label>
          <input type="text" 
                 value={city} 
                 className="inp" />
       </div>  
       <div className="inputfield">
            <label>Postal Code</label>
            <input type="text" 
                    value={pincode}
                    onChange={handleChange('pincode')}
                   className="inp" />
        </div> 
       <div className="inputfield">
          <label>Phone Number</label>
          <input type="text" 
                value={contact}
                onChange={handleChange('contact')}
                className="inp" />
       </div> 
        <div className="inputfield">
          <label>Email Address</label>
          <input type="email" 
                className="inp" 
                value={userEmail}
                onChange={handleChange('userEmail')}
                required="true" />
       </div> 
      <div className="inputfield">
          <label>Pickup Address</label>
          <textarea className="textarea"
                    onChange={handleChange('pickUpAddress')}
                    value={pickUpAddress}          
          >
          </textarea>
       </div> 
       <div className="inputfield">
            <label>Donation Items Details</label>
            <textarea className="textarea"
                      onChange={handleChange('donationDetails')}
                      value={donationDetails}></textarea>
        </div> 
      <div className="inputfield terms">
          <label className="check">
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
          <p>Agreed to terms and conditions</p>
       </div> 
      <div className="inputfield">
        <input type="submit" 
               value="Donate" 
               className="btn" 
               onClick={handleSubmit}/>
      </div>
      </div> 
    </div>
    )
}

export default DonationForm