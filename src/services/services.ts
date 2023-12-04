// import { type ListOfTodos } from '../types';

// const URL = 'https://api.jsonbin.io/v3/b/654d176a54105e766fcdb1d3';

// interface Todo {
//     id: string
//     text: string
//     completed: boolean
//     order: number
// };

// const getHeaders = () => ({
//     'Content-Type': 'application/json',
//     'X-Master-Key': import.meta.env.VITE_API_BIN_KEY,
//     'X-Access-Key': '$2a$10$bAgFAyORl7ln4lJrX6oTzOHSfH/8uY8urEJT74g6hvMYN97/KGave',
// });

// export const fetchTodos = async (): Promise<Todo[]> => {
//     try {
//         const res = await fetch(URL, {
//             headers: getHeaders(),
//         });

//         if (!res.ok) {
//             console.error('Error fetching todos. Status:', res.status);
//             const errorData = await res.json();
//             console.error('Error data:', errorData);
//             return [];  // Devuelve un arreglo vacío en caso de error.
//         }

//         const { record: todos } = await res.json() as { record: Todo[] };

//         console.log('Todos from API:', todos);

//         return todos;
//     } catch (error) {
//         console.error('Error:', error);
//         return [];
//     }
// };

// export const createTodo = async (text: string): Promise<Todo | null> => {
//     try {
//         const id = crypto.randomUUID(); // Generar un nuevo ID
//         const res = await fetch(URL, {
//             method: 'POST',
//             headers: getHeaders(),
//             body: JSON.stringify({
//                 id,
//                 text,
//                 completed: false,
//             }),
//         });

//         if (!res.ok) {
//             console.error('Error creating todo. Status:', res.status);
//             const errorData = await res.text();
//             console.error('Error data:', errorData);
//             return null;
//         }

//         const createdTodo = await res.json() as Todo;
//         console.log('Todo created:', createdTodo);

//         return createdTodo;
//     } catch (error) {
//         console.error('Error:', error);
//         return null;
//     }
// };
// export const updateTodos = async ({ todos }: { todos: ListOfTodos }): Promise<boolean> => {
//     console.log("HOLAAA", import.meta.env.VITE_API_BIN_KEY)
//     const res = await fetch(URL, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Master-Key': import.meta.env.VITE_API_BIN_KEY
//         },
//         body: JSON.stringify(todos)
//     });

//     return res.ok
// };