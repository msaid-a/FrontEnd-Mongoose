import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import { isNull } from 'util'
import {Link, Redirect} from 'react-router-dom'
 class Profile extends Component {


    state={
        profile :null
    }
    
    getProfile = async() =>{
        try {
            let res = await axios.get('/users/'+this.props.iD)
            console.log(res.data)
            this.setState({profile:res.data})
            
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount=  () =>{
      this.getProfile()
    }
    
    

    render() {
        if(!this.props.iD){
            return <Redirect to="/login"></Redirect>
        }
        if(!isNull(this.state.profile)){
            let {resp,avatar} = this.state.profile
            console.log(avatar)
            return (
                <div className="container">

                <div className="row mt-5    ">
                    <div className="col-4">
                        <img src={avatar} alt={resp.name}/>
                    </div>
                    <div className="col-6">
                    <h1>Hello {resp.name}</h1>
                         <table className="table table-hover">
                             <tr>
                                 <td>Name :</td>
                                 <td>{resp.name}</td>
                             </tr>
                             <tr>
                                 <td>Email :</td>
                                 <td>{resp.email}</td>
                             </tr>
                             <tr>
                                 <td>Age :</td>
                                 <td>{resp.age}</td>
                             </tr>
                         </table>
                         <Link className="btn btn-danger" to="/updateprofile">Edit Profile</Link>
                    </div>
                </div>
                </div>
            )
        }
        return (<div className="text-center">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>)
    }
}


const mapStateToProps = (state) =>{
    return {
      userName : state.auth.username,
      iD : state.auth.id,
    }
  }

export default connect(mapStateToProps)(Profile)
