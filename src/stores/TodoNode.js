import { observable, computed, action, toJS } from 'mobx';
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)


let nextTodoId = 0;

class TodoNode {
  // When this is the root node, it is not displayed. Its children are what
  // constitute the primary level of "Todos"
  @observable text;
  @observable id;
  @observable completed;
  @observable getsFocus = false;
  @observable parent;
  @observable children = [];
  // @observable depth;  // set only when the tree is returned for display.

  @computed get isRoot() {
    return (typeof toJS(this.parent) === 'undefined');
  }

  // the index of this node in its parent array
  @computed get index() {
    if (this.isRoot) {
      return undefined;
    }
    // is there any advantage to doing (n === this) versus (n.id === this.id) ?
    const result = this.parent.children.findIndex(node => node === this);
    return result;
  }

  // returns the previous node in the current depth's list.
  @computed get previous() {
    if (this.index === 0) {
      return undefined;
    }
    return this.parent.children[this.index - 1];
  }

  // do I need @computed get depth() ??
  @computed get depth() {
    let n = this;
    let d = 0;
    while (!n.isRoot) {
      n = n.parent;
      d += 1;
    }
    return d;
  }

  // Mark all children nodes the same value as this one recursively
  @action.bound
  setStatus(newStatus) {
   
    this.completed = newStatus;
    let objs =Cookies.get('tasks');
    let tasks=[];
    if(typeof(objs) == 'undefined')
      tasks = [];
    else
      tasks = JSON.parse(objs);
    const index = tasks.findIndex((key)=>key.id==this.taskId);
    if(index>=0)
      tasks[index].completed = this.completed;
    Cookies.set('tasks',JSON.stringify(tasks));
    
    for (const c of this.children) {
      c.setStatus(newStatus);
      let objs =Cookies.get('tasks');
      let tasks=[];
      if(typeof(objs) == 'undefined')
        tasks = [];
      else
        tasks = JSON.parse(objs);
      const index = tasks.findIndex((key)=>key.id==c.taskId);
      if(index>=0)
        tasks[index].completed = c.completed;
      Cookies.set('tasks',JSON.stringify(tasks));
      
    }
  }

  @action.bound
  toggle() {
    let nextHigherNode;
    this.setStatus(!this.completed);
   // if we're marking uncompleted trace up the tree to all consecutive
    // parent nodes that were also marked completed and uncomplete them.
    // this is to prevent the scenario where you have uncompleted items
    // underneath a parent item that is complete.
    if (this.completed === false) {
      nextHigherNode = this.parent;

      while (
        nextHigherNode.completed === true
        && !nextHigherNode.isRoot) {
        // nextHigherNode.setStatus(false);
        nextHigherNode.completed = false;
        nextHigherNode = nextHigherNode.parent;
        let objs =Cookies.get('tasks');
        let tasks=[];
        if(typeof(objs) == 'undefined')
          tasks = [];
        else
          tasks = JSON.parse(objs);
        const index = tasks.findIndex((key)=>key.id==this.parentTaskId);
        if(index>=0)
          tasks[index].completed = nextHigherNode.completed;
        Cookies.set('tasks',JSON.stringify(tasks));
      }
    }
  }

  @action.bound
  update(text) {
    this.text = text;
  //   let objs =Cookies.get('tasks');
  //   let tasks=[];
  //   if(typeof(objs) == 'undefined')
  //     tasks = [];
  //   else
  //     tasks = JSON.parse(objs);
  //   const index = tasks.findIndex((key)=>key.id==this.taskId);
  //   if(index>=0)
  //     tasks[index].text = text;
  //   Cookies.set('tasks',JSON.stringify(tasks));
  }

  @action.bound
  delete() {

    const taskNode = this;
    Swal.fire({
      title: "Eliminar tarea",
      text: "Está seguro que desea eliminar esta tarea?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: '#d33',
      confirmButtonText: "Aceptar",
      confirmButtonColor: '#43AA8B',
  }).then((result)=> {
      if (result.value) {
        let objs =Cookies.get('tasks');
        let tasks=[];
        if(typeof(objs) == 'undefined')
          tasks = [];
        else
          tasks = JSON.parse(objs);
        // const index = tasks.findIndex((key)=>key.id==taskNode.taskId);
        // if(index>=0)
        //   tasks.splice(index,1);
        tasks.filter((key,index)=>{
            if(key.id== taskNode.taskId || key.parentId == taskNode.taskId)
              tasks.splice(index,1);
        })
        Cookies.set('tasks',JSON.stringify(tasks));
        this.parent.children.remove(this);
        return true;
      } else {
          return false;
      }
    }).then((result)=>{
      if(result){
        Swal.fire({
          title: "Tarea eliminada",
          // text: "Eliminada",
          icon: "success",
          // showCancelButton: true,
          // cancelButtonText: "Cancelar",
          // cancelButtonColor: '#d33',
          confirmButtonText: "Ok",
          confirmButtonColor: '#43AA8B'
        })
      }
     
    })
  }
    @action.bound
    save() {
      const taskNode = this;
      Swal.fire({
        title: "Guardar tarea",
        text: "Está seguro que desea guardar esta tarea?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: '#d33',
        confirmButtonText: "Guardar",
        confirmButtonColor: '#43AA8B',
    }).then((result)=> {
        if (result.value) {
          // debugger
          // this.text = text;
          let objs =Cookies.get('tasks');
          let tasks=[];
          if(typeof(objs) == 'undefined')
            tasks = [];
          else
            tasks = JSON.parse(objs);
          const index = tasks.findIndex((key)=>key.id==this.taskId);
          if(index>=0){
            tasks[index].text = this.text;
            if(typeof(this.parent) !='undefined' && this.parent != null)
              tasks[index].parentId = this.parent.taskId;
          }
        
          Cookies.set('tasks',JSON.stringify(tasks));
      
          return true;
        } else {
            return false;
        }
      }).then((result)=>{
        if(result){
          Swal.fire({
            title: "Tarea guardada",
            // text: "Eliminada",
            icon: "success",
            // showCancelButton: true,
            // cancelButtonText: "Cancelar",
            // cancelButtonColor: '#d33',
            confirmButtonText: "Ok",
            confirmButtonColor: '#43AA8B'
          })
        }
       
      })
  
  }

  @action.bound
  indent() {
    if (!this.previous) {
      return;
    }
    const currentParent = this.parent;
    let newParent = this.previous;
    let isParent=false;
    if(typeof(this.parentTaskId) != 'undefined' || this.parentTaskId != null){
      while(!isParent){
        if(typeof(newParent) == 'undefined')
          break;
         if((typeof(newParent.parentTaskId) == 'undefined' || newParent.parentTaskId == null) && newParent.taskId == this.parentTaskId){
          isParent=true;
          break;
         }
 
        newParent = newParent.previous;
      }
    }
    if(typeof(newParent) == 'undefined')
      return;
    this.parentTaskId = newParent.taskId;
      newParent.children.push(this);
      currentParent.children.remove(this);
      this.parent = newParent;
     
    // }
   
  }

  @action.bound
  unindent() {
    if (this.parent.isRoot) {
      return;
    }
    const currentParent = this.parent;
    const newParent = this.parent.parent;
    if(typeof(newParent.taskId) =='undefined')
      this.parentTaskId =null;
    else
      this.parentTaskId =newParent.taskId;
    let objs =Cookies.get('tasks');
    let tasks=[];
    if(typeof(objs) == 'undefined')
      tasks = [];
    else
      tasks = JSON.parse(objs);
    const index = tasks.findIndex((key)=>key.id==this.taskId);
    if(index>=0)
      tasks[index].parentId = this.parentTaskId;
    Cookies.set('tasks',JSON.stringify(tasks));

    // insert this in just after the current parent.
    newParent.children.splice(currentParent.index + 1,
                              0,
                              this);
    currentParent.children.remove(this);
    this.parent = newParent;
  }

  @action.bound
  moveUp() {
    if (this.index === 0) {
      return;
    }
    const a = this.parent.children;
    const i = this.index;
    [a[i - 1], a[i]] = [this, a[i - 1]];
  }

  @action.bound
  moveDown() {
    if (this.index >= this.parent.children.length - 1) {
      return;
    }
    const a = this.parent.children;
    const i = this.index;
    [a[i + 1], a[i]] = [this, a[i + 1]];
  }

  constructor(parent = undefined, text = '',completed=false) {
    this.text = text;
    this.id = nextTodoId;
    nextTodoId += 1;
    this.completed = completed;
    this.parent = parent;
  }
}

export default TodoNode;
