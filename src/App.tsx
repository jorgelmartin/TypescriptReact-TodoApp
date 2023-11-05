import { useState } from 'react'
import { Todos } from './components/Todos';

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
  
  return (
    <>
      {/* <h1>TODO APP</h1> */}
      <div className='todoapp'>
      <Todos todos={todos}/>
      </div>
    </>
  )
}
export default App
