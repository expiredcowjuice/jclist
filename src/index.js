import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: ''
    };
  }
  
  handleChange(event) {
    const value = event.target.value;
    this.setState({
      value: value
    })
  }
  
  add() {
    this.props.onConfirm({
      label: this.state.value,
      done: false
    });
    this.setState({
      value: ''
    })
  }
  
  handleClick() {
    this.add();
  }
  
  handleKeyDown(event) {
    if (event.keyCode == 13) {
      this.add();
    }
  }
  
  render() {
    return <div className="search">
      <input className="todo-input" onChange={(event) => this.handleChange(event)} onKeyDown={(event) => this.handleKeyDown(event)} value={this.state.value}/>
      <button className = "addInput" onClick={(event) => this.handleClick(event)}>+</button>
      <button className = "clearSelected" onClick={() => this.props.onSelection()}/>

    <span className="box"/>
    </div>;
  }
}


class TodoList extends React.Component {
  render() {
    const addedItems = this.props.items;
    const itemList = addedItems.map((item, index) =>
                                    <li key={this.index} className={item.done ? 'done' : 'not-done'}>
                                      <span className="checkbox" onClick={() => this.props.onChecked(index)}/>
                                      <span className="line"/>
                                      <span className="label">{item.label}</span>
                                      <span className="clear" onClick={() => this.props.onCleared(item)}></span>
                                    </li>)                                      
    return <ul>{itemList}</ul>;
  };
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
      
    const persistedItems = JSON.parse(localStorage.getItem('todos'));
    
    window.onbeforeunload = () => {
      localStorage.setItem('todos', JSON.stringify(this.state));
    };
    
    this.state = persistedItems || {
      items: []
    };
  }
    
  addItem(item) {
    if (item.label==''){
      return
    }
    const newItems=[...this.state.items, item]
    this.setState({
      items: newItems
    })
  }
    
  onDoneItemsCleared() {
    const newItems=this.state.items.filter(function(item) {
      return(!item.done);
    });
    this.setState({
      items: newItems
    });
  }
    
  check(index) {
    this.state.items[index].done = !this.state.items[index].done;
    this.setState({
      items: this.state.items
    });
  }
  
  clear(item) {
    const newItems=this.state.items.filter(function(el) {
      return (el !== item);
    });
    this.setState({
      items: newItems
    });
 }
    
  render() {
    return <div className="notebook">
      <Input onConfirm={(value) => this.addItem(value)} onSelection={() => this.onDoneItemsCleared()}/>
      <removeSelected/>
      <div className="counter">Count: {this.state.items.length}</div>
      <TodoList items={this.state.items} onChecked={(index) => this.check(index)} onCleared={(item) => this.clear(item)}/>
    </div>;
  }
}

ReactDOM.render(<Todo/>, document.getElementById('root'));
