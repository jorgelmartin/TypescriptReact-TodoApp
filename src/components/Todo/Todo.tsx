import { useEffect, useRef, useState } from "react";
import { PropsTodoComponent } from "../../types/todos";

export const Todo: React.FC<PropsTodoComponent> = ({
    id,
    text,
    completed,
    completedTodo,
    setTitle,
    isEditing,
    setIsEditing,
    removeTodo,
}) => {

    const [editedTitle, setEditedTitle] = useState(text);
    const inputEditTitle = useRef<HTMLInputElement>(null);

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {

            //TRIM WHITESPACE FROM THE EDITED TITLE
            setEditedTitle(editedTitle.trim())

            //UPDATE THE TITLE IF IT HAS CHANGED
            if (editedTitle !== text) {
                setTitle({ id, text: editedTitle })
            }
            if (editedTitle === '') removeTodo(id)
            setIsEditing('')
        };

        //CHECK IF THE 'ESCAPE' KEY IS PRESSED EXIT THE EDITING MODE
        if (e.key === 'Escape') {
            setEditedTitle(text)
            setIsEditing('')
        }
    };
    useEffect(() => {

        //FOCUS ON THE INPUT ELEMENT FOR EDITING THE TITLE WHEN 'isEditing' CHANGES
        inputEditTitle.current?.focus()
    }, [isEditing]);

    return (
        <>
            <div className="view">

                {/* CHECKBOX FOR MARKING THE TODO AS COMPLETED */}
                <input
                    id={`todoCompleted${id}`}
                    className="toggle"
                    checked={completed}
                    type="checkbox"
                    onChange={(e) => { completedTodo(id, e.target.checked) }}
                />

                {/* LABEL TO DISPLAY THE TODO TEXT */}
                <label htmlFor={`todoCompleted${id}`}>{text}</label>

                {/* BUTTON TO REMOVE THE TODO */}
                <button
                    className='destroy'
                    onClick={() => { removeTodo(id) }}
                >
                </button>
            </div>

            {/* INPUT SECTION FOR EDITING THE TODO */}
            <input
                id={`todoEdit${id}`}
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
                name={`todoEdit${id}`}
            />
        </>
    );
};