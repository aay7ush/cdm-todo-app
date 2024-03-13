const form = document.querySelector('form')
const input = document.querySelector('input')
const todoList = document.getElementById('todo-list')
const itemsLeft = document.getElementById('items-left')
const clearButton = document.getElementById('clear-btn')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const newTodo = document.createElement('li')
  newTodo.classList.add('flex', 'items-center', 'gap-3', 'py-3', 'px-4')
  newTodo.innerHTML = `
    <button class="check-btn unchecked">
      <img src="/assets/check.svg" alt="check icon" class="hidden ml-0.5"/>
    </button>
    <p>${input.value}</p>
    <button class="delete-btn ml-auto">
      <img src="/assets/trash.svg" alt="trash icon"/>
    </button>
  `
  todoList.appendChild(newTodo)
  todoList.innerHTML += '<hr class="border" />'
  input.value = ''
  itemsLeft.textContent++
})

todoList.addEventListener('click', (e) => {
  const checkButton = e.target.closest('.check-btn')

  if (checkButton) {
    const li = checkButton.closest('li')
    li.classList.toggle('completed')

    checkButton.classList.toggle('unchecked')
    checkButton.classList.toggle('checked')
    checkButton.firstElementChild.classList.toggle('hidden')

    let todo = checkButton.nextElementSibling
    todo.classList.toggle('line-through')
    todo.classList.toggle('decoration-red-600')
    todo.classList.toggle('text-zinc-600')

    itemsLeft.textContent =
      todoList.querySelectorAll('li:not(.completed)').length
  }

  if (e.target.parentElement.classList.contains('delete-btn')) {
    const li = e.target.closest('li')
    const hr = li.nextElementSibling

    hr.remove()
    li.remove()
    itemsLeft.textContent =
      todoList.querySelectorAll('li:not(.completed)').length
  }
})

clearButton.addEventListener('click', () => {
  const completedTodos = todoList.querySelectorAll('li.completed')
  completedTodos.forEach((todo) => {
    todo.nextElementSibling.remove()
    todo.remove()
  })
})
