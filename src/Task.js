import React from 'react';
import delete_image from './assets/delete.png';
import star from './assets/star_border.png'

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.importantRef = React.createRef();
        this.changeStatusRef = React.createRef();
        this.taskRef = React.createRef();
    }
    render(){
        return(
            <div 
                ref = {this.taskRef}
                className = "taskContainer" 
                key = {this.props.task.id} 
                onMouseEnter = { () => { 
                    if( this.props.task.state !== 'Done' ){
                        this.importantRef.current.style.display = 'flex'; 
                        this.changeStatusRef.current.style.display = 'flex'; 
                        this.taskRef.current.style.boxShadow = '0px 6px 20px rgba(60, 110, 202, 0.842)';
                    }
                    else{
                        this.changeStatusRef.current.style.display = 'flex'; 
                        this.taskRef.current.style.boxShadow = '0px 6px 20px rgba(60, 110, 202, 0.842)';
                    }
                    
                    } } 
                onMouseLeave = { () => { 
                    if( this.props.task.state !== 'Done' ){
                        this.importantRef.current.style.display = 'none';
                        this.changeStatusRef.current.style.display = 'none'; 
                        this.taskRef.current.style.boxShadow = 'none';
                    }
                    else{
                        this.changeStatusRef.current.style.display = 'none'; 
                        this.taskRef.current.style.boxShadow = 'none';
                    }
                    
                } } 
            >
                { this.props.task.isImportant === "important" && <img className = "starImage" src = {star}/> }
                <p className = {`${this.props.task.isImportant}${this.props.task.state}`} >{this.props.task.text}</p>
                <div className = "taskButtonCotainer" >
                    { 
                        this.props.task.state !== 'Done' &&
                        <button 
                            ref = {this.importantRef}
                            onClick = { () => { this.props.changeImportant(this.props.task) } } 
                            className = { this.props.task.isImportant === "notImportant" ? "taskImportant" : "taskNotImportant" }
                        >
                            { this.props.task.isImportant === "important" ? "NOT IMPORTANT" : "MARK IMPORTANT" }
                        </button>
                    }
                    <div 
                        ref = {this.changeStatusRef}
                        className = "taskStateChange" 
                        onClick = { () => { this.props.changeStatus( this.props.task ) } } 
                    >
                    <img src = {delete_image}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task