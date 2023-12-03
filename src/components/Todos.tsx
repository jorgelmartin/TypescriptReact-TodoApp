
import { useState } from "react"
import { type Todo as TodoType } from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: TodoType[]
    completedTodo: (id: number, completed: boolean) => void
    setTitle: (params: Omit<TodoType, 'completed'>) => void
    removeTodo: (id: number) => void
}

export const Todos: React.FC<Props> = ({
    todos,
    removeTodo,
    completedTodo,
    setTitle,
}) => {
    console.log('Todos received:', todos);
    const [isEditing, setIsEditing] = useState('')

    return (
        <div className="todo-list">
            {todos?.map((todo) => (
                <li
                    key={todo.id}
                    onDoubleClick={() => { setIsEditing(todo.id.toString()) }}
                    className={`
                        ${todo.completed ? 'completed' : ''}
                        ${isEditing === todo.id.toString() ? 'editing' : ''}
                        `}
                >
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        completedTodo={completedTodo}
                        setTitle={setTitle}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        removeTodo={removeTodo}
                    />
                </li>
            ))
            }
        </div >
    )
}