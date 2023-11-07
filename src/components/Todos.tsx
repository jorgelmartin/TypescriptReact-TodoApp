import { type TodoId, type Todo as TodoType } from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: TodoType[]
    completedTodo: (id: string, completed: boolean) => void
    onRemove: ( id: string ) => void
}

export const Todos: React.FC<Props> = ({
    todos, 
    onRemove, 
    completedTodo
}) => {

    return (
        <div className="todo-list">
            {todos?.map(todo =>(
                <li 
                key={todo.id}
                className={`${todo.completed ? 'completed' : '' }`}
                >
                    
                    <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    completedTodo={completedTodo}
                    onRemove={onRemove}
                    />
                </li>
            ))}
        </div>
    )
}