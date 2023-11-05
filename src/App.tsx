import { useState } from 'react'
import { Todos } from './components/Todos';
import { filterValue, type TodoId, type Todo as TodoType } from './types';
import { TodoFilters } from './consts';
import { Footer } from './components/Footer';


const myTodos = [
  {
    id: 1,
    title: 'Hacer portfolio',
    completed: true
  },
  {
    id: 2,
    title: 'Aprender React con Typescript',
    completed: false
  },
  {
    id: 3,
    title: 'Aprender Angular',
    completed: false
  }
]

const App = (): JSX.Element =>  {

  const [todos, setTodos] = useState(myTodos);
  const [filterSelected, setFilterSelected] = useState<filterValue>(TodoFilters.all);


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

  const activeCount = todos.filter(todo =>!todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected == TodoFilters.active) return !todo.completed
    if (filterSelected == TodoFilters.completed) return todo.completed
    return todo
  })

  return (
    <>
      {/* <h1>TODO APP</h1> */}
      <div className='todoapp'>

      <Todos 
      onToggleCompleteTodo={handleCompleted}
      onRemove={handleRemove}
      todos={filteredTodos}/>
      <Footer
      activeCount={activeCount}
      completedCount={completedCount}
      filterSelected={filterSelected}
      onClearCompleted={() => {}}
      handleFilterChange={handleFilterChange}
      />
      </div>
    </>
  )
}
export default App
