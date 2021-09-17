import React,{useState,useEffect} from 'react'
import {filteredNgos} from './apiCore'
import CardForNgos from './CardForNgos'
const Ngos = (props) => {

    const [ngoList,setNgoList] = useState([])
    const {categoryId,state,city,userID} = props.match.params;

    const loadNgoList = ()=>{
        console.log(props.match.params)
        var category = categoryId
        filteredNgos({state,city,category})
        .then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else
            {
                data.data.map((temp)=>(
                    temp.userID = userID
                ))
                setNgoList(data.data)
                console.log(ngoList)
            }
        })
        .catch()
    }

    useEffect(()=>{
        loadNgoList();
    },[])

    return(
        <div>
        <h2 style={{color:"#BEBEBE",textAlign:"center",marginTop:"30px"}} >
            Select NGO nearest to you
        </h2>
            {
                ngoList.map((data,i)=>(
                    <CardForNgos data={data}/>
                ))
            }
        </div>
    )
}

export default Ngos;
