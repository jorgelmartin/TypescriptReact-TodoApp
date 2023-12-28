import { useEffect, useRef, useState } from "react";

interface Props {
    id: number;
    text: string;
    completed: boolean;
    completedTodo: (id: number, completed: boolean) => void;
    setTitle: (params: { id: number; text: string }) => void;
    isEditing: string
    setIsEditing: (completed: string) => void
    removeTodo: (id: number) => void;
}

export const Todo: React.FC<Props> = ({
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

        //CHECK IF THE 'ENTER' KEY IS PRESSED
        if (e.key === 'Enter') {

            //TRIM WHITESPACE FROM THE EDITED TITLE
            setEditedTitle(editedTitle.trim())

            //UPDATE THE TITLE IF IT HAS CHANGED
            if (editedTitle !== text) {
                setTitle({ id, text: editedTitle })
            }

            //REMOVE THE TODO IF THE EDITED TITLE IS EMPTY
            if (editedTitle === '') removeTodo(id)

            //EXIT THE EDITING MODE
            setIsEditing('')
        }

        //CHECK IF THE 'ESCAPE' KEY IS PRESSED
        if (e.key === 'Escape') {

            //RESET THE EDITED TITLE TO THE ORIGINAL TEXT
            setEditedTitle(text)

            //EXIT THE EDITING MODE
            setIsEditing('')
        }
    }
    useEffect(() => {

        //FOCUS ON THE INPUT ELEMENT FOR EDITING THE TITLE WHEN 'isEditing' CHANGES
        inputEditTitle.current?.focus()
    }, [isEditing])

    return (
        <>
            <div className="view">

                {/* CHECKBOX FOR MARKING THE TODO AS COMPLETED */}
                <input
                    className="toggle"
                    checked={completed}
                    type="checkbox"
                    onChange={(e) => { completedTodo(id, e.target.checked) }}
                />

                {/* LABEL TO DISPLAY THE TODO TEXT */}
                <label>{text}</label>

                {/* BUTTON TO REMOVE THE TODO */}
                <button
                    className='destroy'
                    onClick={() => { removeTodo(id) }}
                >
                </button>
            </div>

            {/* INPUT SECTION FOR EDITING THE TODO */}
            <input
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
            />
        </>
    )
}