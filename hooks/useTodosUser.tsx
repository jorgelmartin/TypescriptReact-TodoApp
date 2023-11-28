import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
// import { TodoFilters } from '../src/consts';
import { getAllMyTodos, createTodo, updateTodoText, updateTodoCompleted, deleteTodo  } from '../src/services/ApiCalls';
import { UserData, type Todo as TodoType, Todo, ApiResponse } from '../src/types';
import { log } from 'console';

export const useTodosUser = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
  // const [filter, setFilter] = useState<filterValue>(TodoFilters.all);
  const { credentials: { token }, data: { userId } } = useSelector((state: UserData) => state.user);

  // console.log('User State:', { userId, token });
  


  useEffect(() => {
    // Lógica para obtener todas las tareas del usuario cuando el componente se monta
    getAllMyTodos(userId, token).then((response) => {
        setTodos(response.data.todos); // Asegúrate de ajustar según la estructura real de tu respuesta
    });
}, [userId]);
// console.log('Todos recibidos:', todos);
  // console.log('Todos receiddholaaaddved:', todos);

  const addTodo = (text: string) => {
    createTodo({ text, user_id: userId }, token)
        .then((response) => {
          console.log("Todo created", response);
          
          const responseData = response.data as ApiResponse;
          setTodos((prevTodos) => [...prevTodos, responseData.todo]);
        })
        .catch((error) => {
            console.error('Error creating todo:', error);
        });
};

  const updateText = (params: { id: number, text: string }) => {
    // Lógica para actualizar el texto de una tarea
    const { id, text } = params;
    updateTodoText(id, text, token)
      .then((response) => {
        // Actualizar el estado de las tareas después de la actualización
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, text: response.data.todo.text } : todo
          )
        );
      })
      .catch((error) => {
        console.error('Error updating todo text:', error);
      });
};


  const updateCompleted = (id: number, completed: boolean) => {
    // Lógica para actualizar el estado completado de una tarea
    updateTodoCompleted(id, completed, token)
      .then((response) => {
        // Actualizar el estado de las tareas después de la actualización
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

  const removeTodo = (id: number) => {
    deleteTodo(id, token)
        .then(() => {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        })
        .catch((error) => {
            console.error('Error al borrar el todo:', error);
        });
};
    return{ 
        todos,
        updateText,
        updateCompleted,
        removeTodo,
        // filter,
        // setFilter,
        addTodo,
    }
}