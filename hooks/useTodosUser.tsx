import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { TodoFilters } from '../src/consts';
import { getAllMyTodos, createTodo, updateTodoText, updateTodoCompleted, deleteTodo } from '../src/services/ApiCalls';
import { UserData } from '../src/types/users';
import { filterValue, TodoError, TodosUser, TodoType } from '../src/types/todos';
import { ApiResponse } from '../src/types/api';

export const useTodosUser = (): TodosUser => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { credentials: { token }, data: { userId } } = useSelector((state: UserData) => state.user);
  const [filterSelected, setFilterSelected] = useState<filterValue>(TodoFilters.all);
  const [errorMessage, setErrorMessage] = useState<TodoError | ''>('');

  // GET ALL MY TODOS
  useEffect(() => {
    if (!token) {
      setTodos([]);
      setErrorMessage('');
      return;
    }
    getAllMyTodos(userId, token).then((response) => {
      setTodos(response.data.todos);
    });
  }, [userId, token]);

  // CREATE A TODO
  const addTodo = (text: string) => {
    createTodo({ text, user_id: userId }, token)
      .then((response) => {
        const responseData = response.data as ApiResponse;
        setTodos((prevTodos) => [...prevTodos, responseData.todo]);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.response?.data || { success: false });
      });
  };

  // UPDATE TODO
  const updateTodo = (params: { id: number; text: string }) => {
    const { id, text } = params;
    const newText = text.trim();

    updateTodoText(id, newText, token)
      .then((response) => {
        console.log('Update successful. Response:', response);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          )
        );
        setErrorMessage('');
      })
      .catch((error) => {
        
        console.error('Error updating todo text:', error);
        setErrorMessage(error.response?.data || { success: false });
      });
  };

  // UPDATE COMPLETE TODO
  const updateCompleted = (id: number, completed: boolean) => {
    updateTodoCompleted(id, completed, token)
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: response.data.todo.completed } : todo
          )
        );
      })
      .catch((error) => {
        console.error('Error updating todo completed state:', error);
      });
  };

  // REMOVE TODO
  const removeTodo = (id: number) => {
    deleteTodo(id, token)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error('Error al borrar el todo:', error);
      });
  };

  // FILTER TODOS
  const filterTodos = todos.filter((todo) => {
    if (filterSelected === TodoFilters.active) {
      return !todo.completed;
    }
    if (filterSelected === TodoFilters.completed) {
      return todo.completed;
    }
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const handleFilterChange = (filter: filterValue) => {
    setFilterSelected(filter);
  };

  // DELETE COMPLETED TODOS
  const handleClearCompleted = () => {
    const completedTodoIds = todos
      .filter((todo) => todo.completed)
      .map((completedTodo) => completedTodo.id);
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    completedTodoIds.forEach((id) => removeTodo(id));
  };

  const setFilter = (filter: filterValue) => {
    setFilterSelected(filter);
  };

  return {
    updateTodo,
    updateCompleted,
    removeTodo,
    todos: filterTodos,
    // filter,
    errorMessage,
    setFilter,
    activeCount,
    setErrorMessage,
    completedCount,
    addTodo,
    handleFilterChange,
    handleClearCompleted,
    filterSelected,
  };
};