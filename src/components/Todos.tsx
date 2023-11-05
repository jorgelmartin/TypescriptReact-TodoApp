import { type ListOfTodos } from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: ListOfTodos
}

export const Todos: React.FC<Props> = ({todos}) => {
    return (
        <div className="todo-list">
            {todos.map(todo =>(
                <li 
                key={todo.id}
                className={`${todo.completed ? 'completed' : '' }`}>
                    <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    />
                </li>
            ))}
        </div>
    )
}