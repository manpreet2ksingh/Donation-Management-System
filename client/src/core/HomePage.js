import React,{useState,useEffect} from 'react'
import {listCategories} from './apiCore'
import Card from './Card'
import Navbar from './navbar'

const Home = (props) =>{

    const [values,setValues] = useState([])
    const [error,setError] = useState(false)

    const categories = ()=>{
        listCategories().then(data=>{
            if(data.error)
            {
                setError(data.error)
            }
            else
            {
                data.categories.map((temp)=>(
                    temp.userID = props.match.params.userID
                ))
                console.log(data.categories)
                setValues(data.categories)
            }
        })
    }

    useEffect(()=>{
        categories()
    },[])

    return(
        <div>
            {console.log(props.match.params.userID)}
            <Navbar />
            {
                values.map((data,i)=>(
                    <Card key={i} data={data} />
                ))
            }
        </div>
    )
}

export default Home