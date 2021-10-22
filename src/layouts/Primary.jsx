import React from 'react';
import { observer } from 'mobx-react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Footer from '../components/Footer';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';


const styles = {
  container: {
    textAlign: 'left',
    padding: 0,
    display: 'flex',
    // height: '100%',
    width:'90%'
  },
  paper: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    position: 'relative',
    margin: 20,
    // marginBottom: 200,
    // height: '50%',
    // minWidth: '460px',
    // maxWidth: '800px',
    minHeight: '210px',
    width:'100%'
  },
  appBar: {
    backgroundColor: "#90BE6D",
  },
  contentBody: {
    // minHeight: '510px',
  },
  todoList: {

  },
  footerArea: {
    padding: 0,
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: '100%',
  },
  addButton: {
    textAlign: 'right',
    bottom: '0px',
    right: '0px',
    margin: '40px',
    marginRight: '50px',
  },
};


@observer class Primary extends React.Component {

  render() {
    return (
      <div style={styles.container} id="container">
        <Paper style={styles.paper} zDepth={4} id="paper">
          <div style={styles.contentBody} id="body">
            <AppBar id="app-bar" style={styles.appBar}
              title="Task Manager List"
            // iconClassNameRight="muidocs-icon-task-list"
            // iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <Subheader>Grupo 11 - Proceso de Software</Subheader>
            <TodoList store={this.props.store} style={styles.todoList} />
          </div>
          <div style={styles.footerArea}>
            <div style={styles.addButton}>
              <AddTodo store={this.props.store} />
            </div>
            <Footer store={this.props.store} />
          </div>
        </Paper>
      </div>
    );
  }
}

export default Primary;
