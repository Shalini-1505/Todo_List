//Model 
let todos;
const savedTodos=JSON.parse(localStorage.getItem('todolist')); //parse converts string to array
if(Array.isArray(savedTodos)){
  todos=savedTodos;
}
else{
  todos=[
    {title: 'Upload projects in Github',
     id: '1'
  },{
    title: 'Study React',
    id: '2'
  }];
}

//Create a todo
function createTodo(title){
  const id=''+new Date().getTime(); //Will give the number of ms since Jan 1, 1970 -> Always a unique number

  todos.unshift({
     title: title,
     id:id,
     isDone: false
    });
    saveTodos();
}

//To remove a todo
function removeTodo(idToDel){
  todos=todos.filter(function (curr_todo){
    if(idToDel === curr_todo.id){
      return false;
    }
    else{
      return true;
    }
  });
  saveTodos();
}
function toggleTodo(todoId, checked) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.isDone = checked;
    }
  });
}

function saveTodos(){
  localStorage.setItem('todolist', JSON.stringify(todos)); //setItem takes a key and a string is stored. JSON.stringify converts the array to string
}
//View
function render(){
  todolist.innerHTML="";

  todos.forEach(function (todo){

  const element = document.createElement('div');
  const inside = document.createElement('div');
  inside.className = "check-title";
  element.className = "todo-item";
  const title = document.createElement('p')
  title.innerText = todo.title;
  
  const checkbox=document.createElement('input');
  checkbox.type='checkbox';
  checkbox.onchange=checkTodo;
  checkbox.dataset.todoId = todo.id;
    if (todo.isDone === true) {
      checkbox.checked = true;
      element.classList="checked";
    } else {
      checkbox.checked = false;
    }
  const deletebut = document.createElement('button');
  deletebut.innerText = 'Delete';
  deletebut.className = 'delete-but';
  deletebut.style='margin-left:13px';
  deletebut.onclick=deleteTodo;
  deletebut.id=todo.id;
  inside.appendChild(checkbox);
  inside.appendChild(title);
  element.appendChild(inside);
  element.appendChild(deletebut);

  const todolist=document.getElementById('todolist');
  todolist.appendChild(element);
  console.log(checkbox.checked);
});
}

//Controller
function deleteTodo(event){
  const deletebutton=event.target;
  const idToDel=deletebutton.id;
  removeTodo(idToDel);
  render();
}
function getTodo(){

  const newtodo=document.getElementById('input-name');
  const title=newtodo.value;
  if(title==""){
    document.getElementByClassName("add-todo-but").disabled = true;
  }
  else{
    createTodo (title);
    render();
    newtodo.value=''; //To reset the input box after a value is added
}
}
function checkTodo(event){
  const checkbox = event.target;

  const todoId = checkbox.dataset.todoId;
  const checked = checkbox.checked;

  toggleTodo(todoId, checked);
  render();
}

render();