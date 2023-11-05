import { type ListOfTodos, type TodoId, type Todo as TodoType } from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: ListOfTodos
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemove: ( id: TodoId ) => void
}

export const Todos: React.FC<Props> = ({todos, onRemove, onToggleCompleteTodo}) => {
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
                    onToggleCompleteTodo={onToggleCompleteTodo}
                    onRemove={(id) => onRemove(id)}
                    />
                </li>
            ))}
        </div>
    )
}