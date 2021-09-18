import {API} from '../config'

export const listCategories = () =>{
    return fetch(`/api/categories`,{
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
    return fetch(`/api/ngos/filtered`,{
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
    return fetch(`/api/ngo/${id}`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const getCategoryName = (id)=>{
    return fetch(`/api/category/${id}`,{
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
    return fetch(`/api/user/${id}/donation`,{
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
    return fetch(`/api/user/${id}`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

export const send = (details)=>{
    return fetch(`/api/notification`,{
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

