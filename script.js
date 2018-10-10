var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;  
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.todos.forEach(function(todo) {
            if(completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
};

/*
var displayTodosBtn = document.getElementById('display');
var toggleTodosBtn = document.getElementById('toggle');

displayTodosBtn.addEventListener('click', function() {
    todoList.displayTodos();
});

toggleTodosBtn.addEventListener('click', function() {
    todoList.toggleAll();
}); */

var handlers = {
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleTodoPositionInput = document.getElementById('toggleTodoPositionInput');
        todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
        toggleTodoPositionInput.value = '';
        view.displayTodos();
    }
};

var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = '';
            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }
            todoLi.id = position; //чтобы не вводить номер позиции в массиве, номер должен храниться здесь
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton()); //созданную ф-цию "добавить кнопку" мы добавляем к каждому эл-ту li
            todosUl.appendChild(todoLi);
        }, this);
    }, createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) { //доступ к id элемента для кдаления
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); 
            }
        });
    }
};

view.setUpEventListeners();

//setTimeout(function() {
    //console.log('Wake up!');
//}, 5000)



