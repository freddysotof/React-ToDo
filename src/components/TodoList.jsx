import React from 'react';
import { observer } from 'mobx-react';

import { List } from 'material-ui/List';
import Cookies from 'js-cookie';
import Todo from './Todo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey700 } from 'material-ui/styles/colors';


@observer class TodoList extends React.Component {

  componentDidMount() {
    // if (this.props.store.demoMode) {
    //   this.testData();
    // }
    // this.testData();
    const { addTodo } = this.props.store;
    let objs =Cookies.get('tasks');
    let tasks=[];
    if(typeof(objs) == 'undefined')
      tasks = [];
    else
      tasks = JSON.parse(objs);
      for(let task of tasks){
        addTodo(task.id,task.text,task.completed,task.parentId);
      }
  }


  testData() {
    function setTimeouts(arrayOfFunctions, period) {
      let counter = 0;
      // queues up functions every `period` milliseconds
      for (const f of arrayOfFunctions) {
        setTimeout(f, counter);
        counter += period;
      }
    }

    const { addTodo } = this.props.store;

    setTimeouts([
      () => { addTodo('Welcome to this nested task list!'); },
      () => { addTodo('You\'ll find it quite intuitive. Just type!'); },
      () => { addTodo('You can add a new item by pressing enter.').indent(); },
      () => {
        const n = addTodo('Move up/down using the arrows. Indent with tab/shift+tab.');
        n.indent();
        n.indent();
      },
      () => { addTodo('Move an item up/down with cmd+up/cmd+down.').indent(); },
      () => { addTodo('Delete an empty line with backspace, or click the trashcan.'); },
      () => { addTodo('Enjoy!'); },
    ],
    1000);
  }


  render() {
    const muiTheme = getMuiTheme({
      overrides: {
        MUIDataTable: {
          responsiveScrollMaxHeight: {
            maxHeight:'400px !important' 
          }
        },
      },
      palette: {
        // primary1Color: '#23afff',
        // textColor: grey700,
        // primary1Color:'#000000', 
        // textColor:  '#FFFFFF',
        primary1Color: '#90BE6D',
        textColor: grey700,
      }
    })

    const { filteredTodos, addTodoAfter, focusNode } = this.props.store;
    // debugger
    let parents = filteredTodos.filter(x => typeof(x.parentTaskId) =='undefined' || x.parentTaskId == null);

    let children = filteredTodos.filter(x => typeof(x.parentTaskId) !='undefined' && x.parentTaskId !== 0);
    
    //iterating through children and pushing it to **parents** json just below the parent
    let counter=0;
    for(let x of children){
        let index = parents.findIndex(obj => obj.taskId === x.parentTaskId);
        parents.splice(index+1+counter, 0, x);
        counter++;
    }
    // debugger
    const items = parents.map((todo, index) => (
      <Todo
        key={todo.id}
        store={this.props.store}
        addAfter={() => addTodoAfter(todo)}
        arrayIndex={index}
        completed={todo.completed}
        deleteSelf={todo.delete}
        saveSelf={todo.save}
        depth={todo.depth}
        focusNode={focusNode}
        getsFocus={todo.getsFocus}
        id={todo.id}
        indent={todo.indent}
        moveDown={todo.moveDown}
        moveUp={todo.moveUp}
        node={todo}
        text={todo.text}
        toggle={todo.toggle}
        unindent={todo.unindent}
        update={todo.update}
      />
    ));

    return (
      <MuiThemeProvider muiTheme={muiTheme} >
      <List id="todo-lists">
        {items}
      </List>
      </MuiThemeProvider>
    );
  }
}

export default TodoList;
