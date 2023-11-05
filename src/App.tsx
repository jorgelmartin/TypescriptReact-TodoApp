import { useState } from 'react'
import { Todos } from './components/Todos';
import { TodoId, type Todo as TodoType } from './types';


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
  
  return (
    <>
      {/* <h1>TODO APP</h1> */}
      <div className='todoapp'>

      <Todos 
      onToggleCompleteTodo={handleCompleted}
      onRemove={handleRemove}
      todos={todos}/>
      </div>
    </>
  )
}
export default App
