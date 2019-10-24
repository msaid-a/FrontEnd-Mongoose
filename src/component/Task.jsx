import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

export class Task extends Component {

    state={
        task : []
    }
    addTask = async() =>{
        console.log(this.props.iD)
        let desc = this.desc.value
        try {
            let res = await axios.post('/tasks/'+ this.props.iD,{
                description : desc
            })
            
            if(res){
                this.getTask()
                Swal.fire({
                    title: 'Success',
                    text: "You tasks is added",
                    type: 'success',
                  })
                  this.desc.value =''
            }
        } catch (error) {
            console.log(error)
        }
    }

    getTask = async () =>{
        try {
            let res = await axios.get('/tasks/'+this.props.iD)
            this.setState({task: res.data})
            
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount = () =>{
        this.getTask()
    }


    deleteTask = (id)=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    axios.delete('/tasks/'+id)
                    .then(res => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                            this.getTask()
                    })
                    }
                })
            
       
    }

    renderTask = () =>{
       return this.state.task.map(data => {
            if(data.completed==false){                
                return ( 
                <li onDoubleClick={()=>{this.deleteTask(data._id)}} className="list-group-item d-flex justify-content-between"><span>{data.description}</span>
                    <span><button  className=" justify-right btn btn-primary" onClick={()=>
                            {this.updateTask(data._id)}}>Done</button></span>
                </li>
                )
            }else{
                return ( <tr>
                    <li onDoubleClick={()=>{this.deleteTask(data._id)}} className="list-group-item d-flex justify-content-between"><span><del>{data.description}</del></span>
                        <span><button className=" justify-right btn btn-danger" onClick={()=>
                                {this.cancelUpdateTask(data._id)}}>Cancel</button></span>
                    </li>
                </tr>
                )
            }
        })
    }

    updateTask = async(id) =>{
        
        try {
            let res = await axios.patch('/tasks/'+id,{
                completed : true
            })
            console.log(res.data)
            this.getTask()
        } catch (error) {
            console.log(error)
        }
    }

    cancelUpdateTask = async(id) =>{
        
        try {
            let res = await axios.patch('/tasks/'+id,{
                completed : false
            })
            console.log(res.data)
            this.getTask()
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        if(!this.props.iD){
            return <Redirect to="/login"></Redirect>
        }
        return (            
            <div className="container">
                <h1 className="text-center mt-5 mb-5">List Task</h1>
                <ul className="list-group list-group-fluid">
                    {this.renderTask()}
                    
                </ul>
                <form onSubmit={e => e.preventDefault()} className="mt-3">
                    <input type="text" placeholder="What do you want do ?" className="form-control" ref = {input => this.desc = input}/>
                    <button className="btn btn-primary btn-block mt-4" onClick={this.addTask}>Up!</button>

                </form>
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
export default connect(mapStateToProps)(Task)
