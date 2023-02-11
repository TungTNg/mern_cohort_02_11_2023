document.addEventListener('DOMContentLoaded', ()=>{
  let todoItemsArr = [
    {
      id: self.crypto.randomUUID(),
      title: 'Go to the store',
      completed: false
    },
    {
      id: self.crypto.randomUUID(),
      title: 'Go to the mall',
      completed: false
    },
    {
      id: self.crypto.randomUUID(),
      title: 'Go to the park',
      completed: true
    }
  ]

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
      todoListElement.appendChild(todoItemElement)


      const deleteTodoButtonElement = document.createElement('button')
      deleteTodoButtonElement.innerText = 'Delete'
      deleteTodoButtonElement.setAttribute('data-todo-id', todoItem.id)
      todoItemElement.appendChild(deleteTodoButtonElement)

      deleteTodoButtonElement.addEventListener('click', ()=>{
        const deleteTodoId = deleteTodoButtonElement.getAttribute('data-todo-id')

        todoItemsArr = todoItemsArr.filter((todoItem) => {
          return todoItem.id !== deleteTodoId;
        })
        
        renderTodoItems()
      })
    })
  }

  renderTodoItems()

  todoAddButtonElement.addEventListener('click', ()=>{
    const newTodoItem = {
      id: self.crypto.randomUUID(),
      title: todoInputElement.value,
      completed: false
    }

    todoItemsArr.push(newTodoItem)
    todoInputElement.value = ''
    renderTodoItems()
  })
  

})


