import React, { Component } from 'react';

class App extends Component {
  constructor () {
    super()
    this.state = {
      items: [],
      edit: false,
      index : ''
    }
  }
  handleChange(event) {

  }
  addItem(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    if(newItemValue) {
      var updatedTask = this.state.items;
      if(!this.state.edit){
        updatedTask.push(newItemValue);
      }
      else {
        updatedTask.splice(this.state.index, 1, newItemValue);
      }
      this.setState({
        items: updatedTask,
        edit: false
      });
      localStorage.setItem('items', JSON.stringify(this.state.items));
    }
     this.refs.itemName.value = '';
  }
  deleteItem(event){
    var value = event.target.parentNode.querySelector('span').innerText;
    var updatedTask = this.state.items;
    updatedTask.splice(updatedTask.indexOf(value), 1);
    this.setState({
      items: updatedTask
    });
    localStorage.setItem('items', JSON.stringify(this.state.items));
  }

  editItem(event){
    var value = event.target.parentNode.querySelector('span').innerText;
    this.refs.itemName.value = value;
    var updatedTask = this.state.items;
    var editIndex = updatedTask.indexOf(value);
    this.setState({
      edit: true,
      index : editIndex
    });
    
  }

  componentDidMount() {
    var todos = JSON.parse(localStorage.getItem('items')) || [];
    this.setState({
      items: todos
      });
  }
  render() {
    const listItems = this.state.items.map((item, index) =>{
     return <li key={index}>
              <span>{item}</span> 
              <button onClick={this.editItem.bind(this)}>Edit</button>
              <button onClick={this.deleteItem.bind(this)}>Delete</button>
            </li>
    });

    return (
      <div>
        <h1>TODO Application In React</h1>
        <form onSubmit={this.addItem.bind(this)}>
          <input type="text" ref="itemName" onChange={this.handleChange.bind(this)} placeholder='Enter Task' />
          <button type="submit"> Add </button>
        </form>
        <ul>
        {listItems}
      </ul>
      </div>
    );
  }
}

export default App;
