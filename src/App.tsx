import { useState } from 'react'
import { Todos } from './components/Todos';
import { filterValue, type TodoTitle, type TodoId, type Todo as TodoType } from './types';
import { TodoFilters } from './consts';
import { Footer } from './components/Footer';
import { Header } from './components/Header';


const myTodos = [
  {
    id: 1,
    title: 'Portfolio',
    completed: false
  },
  {
    id: 2,
    title: 'Proyecto React-Typescript',
    completed: false
  },
  {
    id: 3,
    title: 'Proyecto Angular',
    completed: false
  }
]

const App = (): JSX.Element =>  {

  const [todos, setTodos] = useState(myTodos);
  const [filterSelected, setFilterSelected] = useState<filterValue>(TodoFilters.all);
  const [nextId, setNextId] = useState(4)

  const handleRemove = ({id}: TodoId): void => {
      const newTodos = todos.filter(todo => todo.id !== id)
      setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>
    ): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo;
    })
  
    setTodos(newTodos);
  }
  
  const handleFilterChange = (filter: filterValue): void => {
    setFilterSelected(filter);
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }
  const activeCount = todos.filter(todo =>!todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected == TodoFilters.active) return !todo.completed
    if (filterSelected == TodoFilters.completed) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      title,
      id: nextId,
      completed: false
    }
    console.log("Nuevo ID de tarea creada:", nextId)
    const newTodos = [
      ...todos,
      newTodo
    ]
    setTodos(newTodos)
    setNextId(nextId + 1)
  } 

  return (
    <>
      {/* <h1>TODO APP</h1> */}
      <div className='todoapp'>
      <Header onAddTodo={handleAddTodo}/>
      <Todos 
      onToggleCompleteTodo={handleCompleted}
      onRemove={handleRemove}
      todos={filteredTodos}/>
      <Footer
      activeCount={activeCount}
      completedCount={completedCount}
      filterSelected={filterSelected}
      onClearCompleted={handleRemoveAllCompleted}
      handleFilterChange={handleFilterChange}
      />
      </div>
    </>
  )
}
export default App
