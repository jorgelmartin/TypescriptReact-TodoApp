
import { useState, useEffect } from 'react';
import { Todos } from './components/Todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useTodos } from '../hooks/useTodos'
import { ModalLogin } from './components/ModalLogin';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (): JSX.Element =>  {

  const {
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleCompleted,
    handleFilterChange,
    handleRemove,
    handleSave,
    todos: filteredTodos
  } = useTodos()


  const [showLoginModal, setShowLoginModal] = useState(false);
  useEffect(() => {
    // Check if there is a token available (replace with your actual logic)
    const token = localStorage.getItem('token');
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
    <Provider store={store}>
      <div className='todoapp'>
      <Header 
      saveTodo={handleSave}
      />

      <Todos 
      completedTodo={handleCompleted}
      onRemove={handleRemove}
      todos={filteredTodos}
      />

      <Footer
      activeCount={activeCount}
      completedCount={completedCount}
      filterSelected={filterSelected}
      onClearCompleted={handleClearCompleted}
      handleFilterChange={handleFilterChange}
      />
      </div>
      <ModalLogin show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </Provider>
    </>
  )
}
export default App
