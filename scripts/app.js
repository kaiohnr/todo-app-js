const todoTextInput = document.querySelector('.write-todo');
const btnAddTodo = document.querySelector('.add-btn');
const todoCheckbtn = document.querySelectorAll('.check-todo');
const todosListEl = document.querySelector('.todo__list');
const restingTodos = document.querySelector('.resting-todos');
const btnShowAllTodos = document.getElementById('show-all-todos');
const btnActiveTodos = document.getElementById('show-active-todos');
const btnCompletedTodos = document.getElementById('show-completed-todos');
const btnDeleteCompletedTodos = document.querySelector(
  '.delete-complete-todos'
);
const todoListDisplay = document.querySelectorAll(
  '.displays-todos__container p'
);

// Check todo as completed
todosListEl.addEventListener('click', function (event) {
  if (event.target.classList.contains('check-todo')) {
    event.target.parentElement.parentElement.parentElement.classList.toggle(
      'marked'
    );
    event.target.classList.toggle('checked-todo');
    event.target.parentElement.parentElement.children[1].children[0].classList.toggle(
      'text-line'
    );
    countLeftTodos();
    localStorage.setItem('todos', todosListEl.innerHTML);
    localStorage.setItem('restingTodos', restingTodos.textContent);
  }
  if (event.target.classList.contains('check')) {
    event.target.parentElement.classList.toggle('checked-todo');
    event.target.parentElement.parentElement.parentElement.parentElement.classList.toggle(
      'marked'
    );
    event.target.parentElement.parentElement.parentElement.children[1].children[0].classList.toggle(
      'text-line'
    );
    countLeftTodos();
    localStorage.setItem('todos', todosListEl.innerHTML);
    localStorage.setItem('restingTodos', restingTodos.textContent);
  }
});

// Change color in display list
todoListDisplay.forEach((el) => {
  el.addEventListener('click', function () {
    todoListDisplay.forEach((el) => {
      el.classList.remove('display-active');
    });
    this.classList.add('display-active');
  });
});

// Create a todo
const createTodo = function () {
  const todoText = todoTextInput.value;
  if (!todoText) return;
  generateTodoMarkup(todoText);
};

// Create a todo markup and add to the list
const generateTodoMarkup = function (text) {
  const markup = `
  <li class="todo__item draggable" draggable="true">
    <div class="to-do">
      <div class="check-btn">
          <span class="check-todo">
            <img
              src="./images/icon-check.svg"
              class="check"
              alt="check-todo"
            />
          </span>
      </div>

      <div class="todo-text">
        <p class="todo-description">${text}</p>
      </div>

      <div class="delete-todo">
        <i class="fa-solid fa-xmark delete-icon"></i>
      </div>
    </div>
  </li>`;
  todosListEl.insertAdjacentHTML('afterbegin', markup);
  todoTextInput.value = '';
  countLeftTodos();
  localStorage.setItem('restingTodos', restingTodos.textContent);
  dragElements();
  localStorage.setItem('todos', todosListEl.innerHTML);
  removeTodo();
};

// Count left todos
const countLeftTodos = function () {
  const createdTodos = document.querySelectorAll('.todo__item').length;
  const markedTodos = document.querySelectorAll('.marked').length;
  const leftTodos = createdTodos - markedTodos;
  restingTodos.textContent = leftTodos;
};

// Delete completed todos
const deleteCompletedTodos = function () {
  const completedTodos = document.querySelectorAll('.marked');
  completedTodos.forEach((el) => {
    el.remove();
    localStorage.setItem('todos', todosListEl.innerHTML);
    localStorage.setItem('restingTodos', restingTodos.textContent);
  });
};

// Remove todo
const removeTodo = function () {
  console.log('te');
  const deleteIcon = document.querySelectorAll('.delete-icon');
  deleteIcon.forEach((el) => {
    el.addEventListener('click', function (event) {
      event.target.parentElement.parentElement.parentElement.remove();
      countLeftTodos();
      localStorage.setItem('todos', todosListEl.innerHTML);
      localStorage.setItem('restingTodos', restingTodos.textContent);
    });
  });
};

// Drag todos and change the orther
const dragElements = function () {
  const draggables = document.querySelectorAll('.todo__item');
  const draggableContainer = document.querySelector('.todo__list');

  draggables.forEach((el) => {
    el.addEventListener('dragstart', function () {
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', function () {
      el.classList.remove('dragging');
    });
  });

  draggableContainer.addEventListener('dragover', function (event) {
    event.preventDefault();
    const afterElement = getDragAfterElement(draggableContainer, event.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      draggableContainer.appendChild(draggable);
    } else {
      draggableContainer.insertBefore(draggable, afterElement);
    }
  });
};

const getDragAfterElement = function (container, y) {
  const draggablesElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggablesElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

const showActiveTodos = function () {
  const allTodos = document.querySelectorAll('.todo__item:not(.marked)');
  const completedTodos = document.querySelectorAll('.marked');
  completedTodos.forEach((el) => {
    el.style.display = 'none';
  });
  allTodos.forEach((el) => {
    el.style.display = 'block';
  });
};

const showCompletedTodos = function () {
  const allTodos = document.querySelectorAll('.todo__item:not(.marked)');
  const completedTodos = document.querySelectorAll('.marked');

  completedTodos.forEach((el) => {
    el.style.display = 'block';
  });
  allTodos.forEach((el) => {
    el.style.display = 'none';
  });
};

const showAllTodos = function () {
  const allTodos = document.querySelectorAll('.todo__item');
  allTodos.forEach((el) => {
    el.style.display = 'block';
  });
};

// Save and load created todos in local storage
const saveTodos = function () {
  const savedTodos = localStorage.getItem('todos');
  const savedRestingTodos = localStorage.getItem('restingTodos');
  if (savedTodos) {
    removeTodo();
    todosListEl.innerHTML = savedTodos;
  }
  if (savedRestingTodos > 0) {
    removeTodo();
    restingTodos.textContent = savedRestingTodos;
  }
  dragElements();
  removeTodo();
};
saveTodos();

btnShowAllTodos.addEventListener('click', showAllTodos);
btnCompletedTodos.addEventListener('click', showCompletedTodos);
btnActiveTodos.addEventListener('click', showActiveTodos);
btnDeleteCompletedTodos.addEventListener('click', deleteCompletedTodos);

btnAddTodo.addEventListener('click', createTodo);
