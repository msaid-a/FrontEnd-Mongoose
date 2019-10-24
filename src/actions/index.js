// ACTION CREATORS 
// import axios from 'axios'
import axios from '../config/axios'


export const sendData = (_email, _password) =>{
    return (dispatch) => {
        axios.post(
            '/users/login', 
            {
                email: _email,
                password : _password
            }
        ).then((res) => {
            if(res.data.error){
                return alert(res.data.error)
            }
                let {_id, username} = res.data.data
                // kirim id dan username ke reducers
                    localStorage.setItem('userData',JSON.stringify({_id, username}))
                    // Action
                    dispatch( {
                        type : "LOGIN_SUCCESS",
                        payload : {
                            id:_id, 
                            username 
                        }
                    }
                    )
        })
    }
     
 }
 

export const logoutData = () =>{
    localStorage.removeItem('userData')
    return {
        type : "LOGOUT_SUCCESS",
    }
}

export const session = (userData) =>{
    return {
        type : 'LOGIN_SUCCESS',
        payload:{
            id : userData._id,
            username: userData.username
        }
    }
}

