import { useState } from "react";
import { PropsTodosComponent } from "../../types/todos";
import { Todo } from "../Todo/Todo";

export const Todos: React.FC<PropsTodosComponent> = ({
    todos,
    removeTodo,
    completedTodo,
    setTitle,
}) => {
    const [isEditing, setIsEditing] = useState('')

    return (
        <div className="todo-list">

            {/* MAPPING OVER TODOS AND RENDERING EACH TODO ITEM */}
            {todos?.map((todo) => (
                <li
                    key={todo.id}

                    //DOUBLE-CLICK HANDLER TO ENABLE EDITING MODE FOR THE CLICKED TODO
                    onDoubleClick={() => { setIsEditing(todo.id.toString()) }}

                    //CONDITIONAL CLASS-NAMES BASED ON TODO COMPLETION AND EDITING STATE
                    className={`
                        ${todo.completed ? 'completed' : ''}
                        ${isEditing === todo.id.toString() ? 'editing' : ''}
                        `}
                >
                    {/* TODO COMPONENT */}
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
    );
};