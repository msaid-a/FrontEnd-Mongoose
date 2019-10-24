import React, { Component } from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'


 class Register extends Component {

    onSubmitClick = async () =>{
        //  ambil data dari text box
        let username = this.username.value
        let name = this.name.value
        let email = this.email.value
        let password = this.sandi.value
        let age = parseInt(this.age.value)

        
        axios.post('/users',{
                username,name,email,password,age
            }).then(res => {
                    if(res.data.error){
                        return alert(res.data.error)
                    }
                    Swal.fire({
                        title: 'Success',
                        text: "You user is added",
                        type: 'success',
                      })
                    
            }).catch(err =>{
                console.log({err})
            })
        } 
    

    render() {
        if(this.props.userName){
            return (<Redirect to ='/'> </Redirect>)
        }
        return (
            <div className=" col-5 mx-auto mt-5 card">
                <div className='card-body'>
                    <div className='border-bottom border-secondary card-tittle'>
                        <h1>Register</h1>
                    </div>
                    <form className="form-group" onSubmit={event => event.preventDefault()}>
                        <div className='card-title'>
                            <h4>Username</h4>
                        </div>
                        <input className="form-control" type="text" name="username" id="" ref={(input) => {this.username =  input}} />
                        <div className='card-title'>
                            <h4>Name</h4>
                        </div>
                        <input className="form-control" type="text" name="username" id="" ref={(input) => {this.name =  input}} />
                        <div className='card-title'>
                            <h4>Email</h4>
                        </div>
                        <input className="form-control" type='email'ref={(input) => {this.email =  input}} />
                        <div className='card-title'>
                            <h4>Password</h4>
                        </div>
                        <input className="form-control" type="password" name="password" id=""ref={(input) => {this.sandi =  input}} />
                        <div className='card-title'>
                            <h4>Age</h4>
                        </div>
                        <input className="form-control" type="number" name="password" id=""ref={(input) => {this.age =  input}} />
                    <button onClick={this.onSubmitClick} className="btn btn-outline-danger btn-block mt-4" >Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      userName : state.auth.username,
      iD : state.auth.id,
    }
  }
export default connect(mapStateToProps,null)(Register)

// Untuk memberukan referensu ke suatu inputan, kita harus menggunakan atribut 'ref'
    // akan meneruma function, function yang di terima menerima 1 inputan 
    // nama inputa itu bebas, namun biasanya akan di beri nama input

