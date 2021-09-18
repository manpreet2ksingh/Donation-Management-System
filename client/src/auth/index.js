import {API} from '../config'
export const signup = (user)=>{
    return fetch(`${API}/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const signin = (user)=>{
    
    return fetch(`${API}/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const authenticate = (data,next)=>{
    if(typeof window != 'undefined')
    {
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
}


/*signout - 
remove from localStorage 
get request to backend
redirect to home page 
*/
export const signout = (next)=>{
    if(typeof window != 'undefined')
    {
        localStorage.removeItem('jwt');
        next();
        fetch(`${API}/signout`,{
            method:'GET'
        })
        .then(response=>{
            return response.json()
        })
        .catch(error =>console.log(error));
    }
}

export const isAuthenticated = ()=>{
    if(typeof window == 'undefined')
    {
        return false;
    }

    if(localStorage.getItem('jwt'))
    {
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false;
    }
}