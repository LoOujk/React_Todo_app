import React from 'react';
import './Todo.css';
import logo from './assets/logo.png';
import search from './assets/search_icon.png';

import Task from './Task'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '', newTaskTest: '', allTasks: [], filter: 'All' };
    this.textareaRef = React.createRef();
  }

  componentDidMount = () => {
    let temp = {...this.state};
    temp.allTasks = JSON.parse(localStorage.getItem('tasks'));
    if(!temp.allTasks){
      temp.allTasks = [];
    }
    this.setState(temp);
    console.log(temp)
  }

  search = (text) => {
    const temp = { ...this.state };
    temp.search = text;
    this.setState( temp );
  }

  onTextAreaChange = (text) => {
    const temp = { ...this.state };
    temp.newTaskTest = text;
    this.setState(temp)
  }

  add = () => {
    const newTask = {
      id: uuidv4(),
      text: this.state.newTaskTest,
      isImportant: 'notImportant',
      state: 'Active'
    };

    const temp = { ...this.state };
    temp.allTasks.push( newTask );
    localStorage.setItem('tasks', JSON.stringify(temp.allTasks) );
    this.setState(temp);
    this.textareaRef.current.value = '';
  }

  filterChange = (filter) => {
    let temp = {...this.state};
    temp.filter = filter;
    this.setState(temp);
  }

  changeStatus = ( taskForChange ) => {
    let temp = {...this.state};
    temp.allTasks.forEach( ( task ) => { 
      if( task.id === taskForChange.id && task.state === "Active" ){
        task.state = "Done";
      }
      else if( task.id === taskForChange.id && task.state === "Done"  ){
        task.state = "Active";
      }
    });
    localStorage.setItem('tasks', JSON.stringify( temp.allTasks ) );
    this.setState( temp );
  }
  
  changeImportant = (taskForChange) => {
    let temp = {...this.state};
    temp.allTasks.forEach( ( task ) => { 
      if( task.id === taskForChange.id && task.isImportant === "notImportant" ){
        task.isImportant = "important"
      }
      else if(  task.id === taskForChange.id && task.isImportant === "important" ){
        task.isImportant = "notImportant"
      }
    } )
    localStorage.setItem('tasks', JSON.stringify( temp.allTasks ) );
    this.setState( temp );
  }

  render() {
    return (
      <div className = "container">
        <header className = "header">
          <img className = "logo" src = { logo } />
          <div className = "containerheaderInput" >
            <img src = { search }/>
            <input 
              className = 'headerInput' 
              onChange = { ( event ) => { this.search(event.target.value) } }
              placeholder = "Search task for to do"
            />
          </div>
          
        </header>
       
        <div className = "tabContainer">
          <button 
            className = { this.state.filter === 'All' ? "activeButton" : "unactiveButton" }
            onClick = { () => { this.filterChange('All') } } 
          >
            All
          </button>
          <button 
            className = { this.state.filter === 'Active' ? "activeButton" : "unactiveButton" }
            onClick = { () => { this.filterChange('Active') } } 
          >
            Active
          </button>
          <button 
            className = { this.state.filter === 'Done' ? "activeButton" : "unactiveButton" }
            onClick = { () => { this.filterChange('Done') } } 
          >
            Done
          </button>
        </div>
        <div className = "newTaskContainer">
          <span className = "newTaskTitle" >New Task</span>
          <textarea 
            maxLength ={150} 
            ref = {this.textareaRef} 
            onChange = { ( event ) => { this.onTextAreaChange(event.target.value) } }
            className = "newTaskTextArea"
          >
          </textarea>
          <button className = "newTaskButton" onClick={ () => { this.add() }}>ADD</button>
        </div>
        <div className = "tasksContainer">
          {
            this.state.allTasks
              .filter( task => this.state.filter === 'All' ? true : this.state.filter === task.state )
              .filter( task => task.text.toLocaleLowerCase().match( new RegExp(`^${this.state.search.toLocaleLowerCase()}.+`) ) )
              .map( (task) => {
                return(
                  <Task key = {task.id} task = {task} changeImportant = {this.changeImportant} changeStatus = {this.changeStatus}/>
                )
            } )
          }
        </div>
      </div>
    )
  }
}

export default Todo;