import { observable, computed, action } from 'mobx';
import Cookies from 'js-cookie';
import TodoNode from './TodoNode';
import Randomizer from 'react-randomizer';
export class TodoListStore {

  // can be SHOW_ALL, SHOW_ACTIVE or SHOW_COMPLETED
  @observable visibilityFilter = 'SHOW_ALL';
  @observable demoMode = true;
  @observable todoRoot;

  constructor() {
    this.todoRoot = new TodoNode(); // parent is undefined
  }

  // returns a 'flattened' array of the todo tree.
  @computed get todos() {
    // recursive function to flatten children
    const flattenChildren = (startNode) => {
      let result = [];

      if (!startNode.isRoot) {
        result.push(startNode);
      }
      for (const n of startNode.children) {
        result = result.concat(flattenChildren(n));
      }
      return result;
    };
    // flattenChildren = action(flattenChildren);
    return flattenChildren(this.todoRoot);
  }

  @computed get filteredTodos() {
    // debugger
    switch (this.visibilityFilter) {
      case 'SHOW_ALL':
        return this.todos;
      case 'SHOW_ACTIVE':
        return this.todos.filter(t => t.completed === false);
      case 'SHOW_COMPLETED':
        return this.todos.filter(t => t.completed === true);
      default:
        throw new Error('Invalid filter.');
    }
  }

  @action.bound
  findNodeById(id, startNode = this.todoRoot) {
    for (const n of startNode.children) {
      if (n.id === id) {
        return n;
      }
      // Recurse down into n's children
      const result = this.findNodeById(id, n);
      if (result) {  // if result is not undefined
        return result;
      }
    }
    // if nothing was found, return undefined
    return undefined;
  }

  // Eliminates need for error checking in users of this method
  @action.bound
  findNodeByIdSafe(id) {
    const node = this.findNodeById(id);
    if (typeof node === 'undefined') {
      throw new Error(`No TodoNode with id ${id}`);
    }
    return node;
  }

  // Sets focus on the node that is at location curNode + delta in the
  // filtered (aka visible) list.
  @action.bound
  focusNode(curId, delta) {
    const filteredList = this.filteredTodos;
    const curIndex = filteredList.findIndex(n => n.id === curId);
    if (curIndex === -1) {
      return;
    }
    const newIndex = curIndex + delta;
    if (0 <= newIndex && newIndex < filteredList.length) {
      filteredList[newIndex].getsFocus = true;
    }
  }

  // May just use this for debugging.
  @action.bound
  addTodo(id,text = '',completed,parentId) {
    const newNode = new TodoNode(this.todoRoot, text,completed);
    let exists = true;
    let randomizeId;
    if(typeof(id) == 'undefined'){
      let objs = Cookies.get('tasks');
      let tasks=[];
      if(typeof(objs) == 'undefined')
        tasks = [];
      else
        tasks = JSON.parse(objs);
      while(exists){
        randomizeId = Randomizer.randomNumber(1,100000);
        const index = tasks.findIndex((key)=>key.id == randomizeId);
        exists =false; 
      }
      newNode.taskId = randomizeId;
    }
    else
      newNode.taskId=id;
    newNode.parentTaskId= parentId;
    // debugger
    // this.unindent();
    this.todoRoot.children.push(newNode);
    // const index = this.todoRoot.children.findIndex(newNode);
    this.updateStorage({id:newNode.taskId,text,completed:completed,parentId:newNode.parentTaskId});
    return newNode;
  }

  @action.bound
  addTodoAfter(node, text = '') {
    const newNode = new TodoNode(node.parent, text);
    let exists = true;
    let randomizeId;
    let objs = Cookies.get('tasks');
    let tasks=[];
    if(typeof(objs) == 'undefined')
      tasks = [];
    else
      tasks = JSON.parse(objs);
    while(exists){
      randomizeId = Randomizer.randomNumber(1,100000);
      const index = tasks.findIndex((key)=>key.id == randomizeId);
      exists =false; 
    }
    newNode.taskId = randomizeId;
    node.parent.children.splice(node.index + 1,
                                0, // insert, rather than overwrite
                                newNode);
    this.updateStorage({id:newNode.taskId,text:"",completed:false});
    return newNode;
  }

  @action.bound
  deleteTodo(id) {
    // this could also be accomplished by
    // node.parent.children.splice(node.index, 1)
    // though .splice has been funky in other instances with mobx
    const node = this.findNodeByIdSafe(id);
    node.parent.children.remove(node);
  }

  @action.bound
  updateStorage(task){
    // const objs = localStorage.getItem('tasks');
    let objs =Cookies.get('tasks');
    let tasks=[];
    // debugger
    if(typeof(objs) == 'undefined')
      tasks = [];
    else
      tasks = JSON.parse(objs);
    const index = tasks.findIndex((key)=>key.id==task.id);
    if(index>=0)
      tasks[index]= task;
    else
      tasks.push(task);
    Cookies.set('tasks',JSON.stringify(tasks));
    
 
  }
}

export default new TodoListStore();
