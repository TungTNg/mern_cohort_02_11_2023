document.addEventListener('DOMContentLoaded', ()=>{
  fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => response.json())
    .then(todoItemsArr => {
      const todoInputElement = document.querySelector('#todoInput')
      const todoAddButtonElement = document.querySelector('#addTodoButton')
      const todoListElement = document.querySelector('#todoList')
    
      const renderTodoItems = () => {
        console.log('rendering todo items....')
    
        todoListElement.innerHTML = ''
    
        todoItemsArr.forEach((todoItem)=>{
          const todoItemElement = document.createElement('li')
          todoItemElement.innerText = todoItem.title
          todoItemElement.setAttribute('data-todo-id', todoItem.id)
          todoItem.completed == true ? todoItemElement.classList.add('completed-task') : todoItemElement.classList.remove('completed-task')
          todoListElement.appendChild(todoItemElement)
          
          const completedCheckBox = document.createElement('input')
          completedCheckBox.setAttribute('type', 'checkbox')
          completedCheckBox.setAttribute('data-todo-id', todoItem.id)
          completedCheckBox.checked = todoItem.completed
          todoItemElement.appendChild(completedCheckBox)

          completedCheckBox.addEventListener('change', ()=>{
            const completedTodoId = completedCheckBox.getAttribute('data-todo-id')
            const completedTodoItem = todoItemsArr.find((todoItem)=>{
              return todoItem.id == completedTodoId
            })
            completedTodoItem.completed = completedCheckBox.checked
            renderTodoItems()
          })

          const deleteTodoButtonElement = document.createElement('button')
          deleteTodoButtonElement.innerText = 'Delete'
          deleteTodoButtonElement.setAttribute('data-todo-id', todoItem.id)
          todoItemElement.appendChild(deleteTodoButtonElement)
    
          deleteTodoButtonElement.addEventListener('click', ()=>{
            const deleteTodoId = deleteTodoButtonElement.getAttribute('data-todo-id')
    
            todoItemsArr = todoItemsArr.filter((todoItem) => {
              return todoItem.id != deleteTodoId;
            })
            
            renderTodoItems()
          })
        })
      }
    
      renderTodoItems()
    
      todoAddButtonElement.addEventListener('click', ()=>{
        const newTodoItem = {
          id: crypto.randomUUID(),
          title: todoInputElement.value,
          completed: false
        }
    
        todoItemsArr.push(newTodoItem)
        todoInputElement.value = ''
        renderTodoItems()
      })    
    })  
})


