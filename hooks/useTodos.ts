import { useEffect, useReducer } from 'react';
import { TodoFilters } from '../src/consts';
import { getAllMyTodos, createTodo } from '../src/services/ApiCalls';
import { type ListOfTodos, type filterValue } from '../src/types';

const initialState = {
    sync: false,
    todos: [],
    filterSelected: (() => {
        // read from url query params using URLSearchParams
        const params = new URLSearchParams(window.location.search)
        const filter = params.get('filter') as filterValue | null
        if (filter === null) return TodoFilters.all
        // check filter is valid, if not return ALL
        return Object
            .values(TodoFilters)
            .includes(filter)
            ? filter
            : TodoFilters.all
    })()
}

type Action =
    | { type: 'initTodos', payload: { todos: ListOfTodos } }
    | { type: 'clearCompleted' }
    | { type: 'completed', payload: { id: string, completed: boolean } }
    | { type: 'filterChange', payload: { filter: filterValue } }
    | { type: 'remove', payload: { id: string } }
    | { type: 'save', payload: { id: string, text: string } }
    | { type: 'updateText', payload: { id: string, text: string } }

interface State {
    sync: boolean
    todos: ListOfTodos
    filterSelected: filterValue
}

const reducer = (state: State, action: Action): State => {
    if (action.type === 'initTodos') {
        const { todos } = action.payload
        return {
            ...state,
            sync: false,
            todos
        }
    }

    if (action.type === 'clearCompleted') {
        return {
            ...state,
            sync: true,
            todos: state.todos.filter((todo) => !todo.completed)
        }
    }

    if (action.type === 'completed') {
        const { id, completed } = action.payload
        return {
            ...state,
            sync: true,
            todos: state.todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed
                    }
                }
                return todo
            })
        }
    }

    if (action.type === 'filterChange') {
        const { filter } = action.payload
        return {
            ...state,
            sync: true,
            filterSelected: filter
        }
    }

    if (action.type === 'remove') {
        const { id } = action.payload
        return {
            ...state,
            sync: true,
            todos: state.todos.filter((todo) => todo.id !== id)
        }
    }

    if (action.type === 'save') {
        const { text } = action.payload
        const newTodo = {
            id: crypto.randomUUID(),
            text,
            completed: false
        }

        return {
            ...state,
            sync: true,
            todos: [...state.todos, newTodo]
        }
    }

    if (action.type === 'updateText') {
        const { id, text } = action.payload;
        return {
            ...state,
            sync: true,
            todos: state.todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        text
                    };
                };

                return todo
            }),
        };
    };

    return state
};

export const useTodos = (): {
    activeCount: number
    completedCount: number
    todos: ListOfTodos
    filterSelected: filterValue
    handleClearCompleted: () => void
    handleCompleted: (id: string, completed: boolean) => void
    handleFilterChange: (filter: filterValue) => void
    handleRemove: (id: string) => void
    handleSave: (id: string, Text: string) => void
    handleUpdateText: (params: { id: string, text: string }) => void
} => {
    const [{ sync, todos, filterSelected }, dispatch] = useReducer(reducer, initialState)

    const handleCompleted = (id: string, completed: boolean): void => {
        dispatch({ type: 'completed', payload: { id, completed } })
    }

    const handleRemove = (id: string): void => {
        dispatch({ type: 'remove', payload: { id } })
    }

    const handleUpdateText = ({ id, text }: { id: string, text: string }): void => {
        dispatch({ type: 'updateText', payload: { id, text } })
    }

    const handleSave = async (text: string): Promise<void> => {
        try {
            const newTodo = await createTodo(text);
    
            if (newTodo) {
                dispatch({ type: 'save', payload: { id: newTodo.id, text } });
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    }

    const handleClearCompleted = (): void => {
        dispatch({ type: 'clearCompleted' })
    }

    const handleFilterChange = (filter: filterValue): void => {
        dispatch({ type: 'filterChange', payload: { filter } })

        const params = new URLSearchParams(window.location.search)
        params.set('filter', filter)
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
    }

    const filteredTodos = todos.filter(todo => {
        if (filterSelected === TodoFilters.active) {
            return !todo.completed
        }

        if (filterSelected === TodoFilters.completed) {
            return todo.completed
        }

        return true
    })

    const completedCount = todos.filter((todo) => todo.completed).length
    const activeCount = todos.length - completedCount

    useEffect(() => {
        getAllMyTodos(userId)
          .then(response => {
            if ('todos' in response && Array.isArray(response.todos)) {
              const { todos } = response;
              console.log('Todos received:', todos);
              dispatch({ type: 'initTodos', payload: { todos } });
            } else {
              console.error('Fetch returned invalid data:', response);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }, [userId, dispatch]);

    useEffect(() => {
        if (sync) {
            updateTodos({ todos }).catch(err => { console.error(err) })
        }
    }, [todos, sync])

    return {
        activeCount,
        completedCount,
        filterSelected,
        handleClearCompleted,
        handleCompleted,
        handleFilterChange,
        handleRemove,
        handleSave,
        handleUpdateText,
        todos: filteredTodos
    }
}