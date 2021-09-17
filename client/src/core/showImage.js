import React from 'react'
import {API} from '../config'
import "./card.css"

const ShowImage = (data)=>{
    return(
        <div className="card-image">
            <img src={`${API}/category/image/${data.data._id}`}
                alt = {data.name}/>
        </div>
    )
}

export default ShowImage