import './style/style.scss';

//*****************************************************************************************
//------------------------- Print out todays date and week --------------------------------
//*****************************************************************************************

const headerDate = document.querySelector('#headerDate');
const headerWeek = document.querySelector('#headerWeek');
const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();
const week = getWeek(now)
const today = day + '/' + month + ' - ' + year;

function getWeek(date) {
    let startDate = new Date(date.getFullYear(), 0, 1);
    let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

headerDate.innerHTML = today;
headerWeek.innerHTML = 'Week ' + week;

//*****************************************************************************************
//--------------------------------------- Add Todo Item -----------------------------------
//*****************************************************************************************

//selectors for form and inputs 
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoInputDueDate = document.querySelector('.todo-input-date');
const todoItemsList = document.querySelector('.todo-items');
let todoItemsLi = document.querySelectorAll('.item');

let todos = [];

// eventlistener on form, call addtodo function
todoForm.addEventListener('submit', addTodo);

// addtodo function that checks if item and dueDate is not empty create object todo. Pushes it to todos array. Else throw an alert in users face.
function addTodo(e) {
  e.preventDefault();
    if (todoInputDueDate.value !== '' && todoInput.value !== '') {
      const todo = {
        id: Date.now(),
        name: todoInput.value,
        completed: false,
        dueDate: todoInputDueDate.value,
      };
      todos.push(todo);
      toLocalStorage(todos);
    } else {
      alert('Make sure to type a Todo and also choose a due date and category!');
    }
};

//*****************************************************************************************
//---------------------------------- Render out Todo items --------------------------------
//*****************************************************************************************

// function to render out the todos
function renderTodos(todos) {
  todoItemsList.innerHTML = '';
  todos.forEach(function(item) {
    const checked = item.completed ? 'checked' : null;  //ternary operator, fancy if else statement to check if todo is completed
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);

    if(item.completed === true) {   // if todo is completed add class checked, css will handle the rest
      li.classList.add('checked');
    }
      li.innerHTML = `
        <i class="fa-solid fa-house-user"></i>${item.name}
          <div class="icons-duedate">
            <div>
              <input class="checkbox" type="checkbox" ${checked}>
              <button class="delete-button" data-id="${item.id}"><i class="fa-solid fa-trash-can trashcan"></i></button>
            </div>
            <span>Due date ${item.dueDate}</span>
          </div>
      `;
    todoItemsList.append(li); // append the li element to the ul
  });
  todoItemsLi = document.querySelectorAll('.item');   //eventlistener for the delete button
  todoItemsLi.forEach(todo => {
    const delBtn = todo.querySelector('.delete-button');
    delBtn.addEventListener('click', removeTodo);
  });
}

//*****************************************************************************************
//------------------------ Push and get items from local storage --------------------------
//*****************************************************************************************

// function stringify and adds todos array to localstorage
function toLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos)); // stringify the array with key 'todos' and sends it to storage
  renderTodos(todos);
}

// function to get array from local storage
function getLocalStorage() {
  const todoList = localStorage.getItem('todos'); // store the local storage items in todoList variable
  if (todoList) {   
    todos = JSON.parse(todoList); // make it an array again and store it in the todos array.
    renderTodos(todos);
  }
}

//*****************************************************************************************
//------------------------------ Checkbox and Remove-button -------------------------------
//*****************************************************************************************

// removeTodo funtion that gets the ID from the delete button on the event (eventlistener in renderTodos function)
// gets the index of the object in the array and splice 1 element. updates localstorage (that function also rerenders the todolist)
function removeTodo(e) {
  const getDeleteId = Number(e.currentTarget.dataset.id);
  const getDeleteIndex = todos.findIndex(todo => todo.id === getDeleteId);
  todos.splice(getDeleteIndex, 1);
  toLocalStorage(todos);
}

getLocalStorage();


/* function checked(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  toLocalStorage(todos);
}

todoItemsList.addEventListener('click', function(e) {

  // check if target clicked is a checkbox, run function checked  with the correct ID to mark correct todo as complete TODO: gör om från anonym funktion
  if (e.currentTarget.type === 'checkbox') { 
    const checkCheckbox = e.currentTarget.closest('data-key');
    const getCheckboxId = checkCheckbox.getAttribute('data-key');
    checked(getCheckboxId);
  }
});

getLocalStorage(); */

