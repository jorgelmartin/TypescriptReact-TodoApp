
import { useState, useEffect } from 'react';
import { Todos } from './components/Todos';
// import { Footer } from './components/Footer';
import { Header } from './components/Header';
// import { useTodos } from '../hooks/useTodos'
import { ModalLogin } from './components/ModalLogin';
import { useTodosUser } from '../hooks/useTodosUser';
import { useSelector } from 'react-redux';
import { UserData } from './types';

const App = (): JSX.Element => {
  const token = useSelector((state: UserData) => state.user.credentials.token);


  const {
    todos,
    addTodo,
    updateCompleted,
    updateText,
    removeTodo
    
  } = useTodosUser()
  console.log('Todos rdddeceived:', todos);

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
      <div className='todoapp'>
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

        {/* <Footer
      activeCount={activeCount}
      completedCount={completedCount}
      filterSelected={filterSelected}
      onClearCompleted={handleClearCompleted}
      handleFilterChange={handleFilterChange}
      /> */}
      </div>
      <ModalLogin show={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}
export default App
