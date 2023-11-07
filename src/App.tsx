import { Todos } from './components/Todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useTodos } from '../hooks/useTodos'

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

  return (
    <>
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
    </>
  )
}
export default App
