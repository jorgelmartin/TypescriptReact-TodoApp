
import { useState, useEffect } from 'react';
import { Todos } from './components/Todos';
import { Header } from './components/Header';
import { ModalLogin } from './components/ModalLogin';
import { useTodosUser } from '../hooks/useTodosUser';
import { useSelector } from 'react-redux';
import { UserData } from './types';
import { Footer } from './components/Footer';
import './index.css';
import { Container } from 'react-bootstrap';
import { TodoButton } from './components/TodoButton';

const App = (): JSX.Element => {
  const token = useSelector((state: UserData) => state.user.credentials.token);


  const {
    todos,
    addTodo,
    updateCompleted,
    updateText,
    removeTodo,
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleFilterChange

  } = useTodosUser()

  const [showLoginModal, setShowLoginModal] = useState(false);
  useEffect(() => {
    // Check if there is a token available (replace with your actual logic)
    if (!token) {
      setShowLoginModal(true);
    }
  }, []);
  // const handleLoginClick = () => {
  //   // Implement your login logic here
  //   // For simplicity, just closing the modal for demonstration purposes
  //   setShowLoginModal(false);
  // };
  return (

  <>
<Container>
  {/* <TodoButton/> */}
      <div className='todoapp' >
        <Header
          addTodo={addTodo}
        />
        {/* <Todos todos={todos} /> */}
        <Todos
          todos={todos}
          completedTodo={updateCompleted}
          setTitle={updateText}
          //  todos={filteredTodos}
          removeTodo={removeTodo}
        />

        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          onClearCompleted={handleClearCompleted}
          handleFilterChange={handleFilterChange}
        />
        <ModalLogin show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>
      </Container>
      </>

  
  )
}
export default App
