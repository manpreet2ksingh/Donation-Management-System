import {API} from '../config'

export const listCategories = () =>{
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const filteredNgos = (parameters)=>{
    console.log(parameters)
    return fetch(`${API}/ngos/filtered`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(parameters)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const getNgoName = (id)=>{
    return fetch(`${API}/ngo/${id}`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const getCategoryName = (id)=>{
    return fetch(`${API}/category/${id}`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}


export const updateHistory = (id,parameters)=>{
    console.log(parameters)
    return fetch(`${API}/user/${id}/donation`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(parameters)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const getUser = (id)=>{
    return fetch(`${API}/user/${id}`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const send = (details)=>{
    return fetch(`${API}/notification`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(details)
    }).then(res=>{
        return res.json()
    })
}

