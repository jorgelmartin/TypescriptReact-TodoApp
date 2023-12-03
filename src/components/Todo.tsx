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
        if (e.key === 'Enter') {
            setEditedTitle(editedTitle.trim())

            if (editedTitle !== text) {
                setTitle({ id, text: editedTitle })
            }

            if (editedTitle === '') removeTodo(id)

            setIsEditing('')
        }

        if (e.key === 'Escape') {
            setEditedTitle(text)
            setIsEditing('')
        }
    }
    useEffect(() => {
        inputEditTitle.current?.focus()
    }, [isEditing])

    return (
        <>
            <div className="view">
                <input
                    className="toggle"
                    checked={completed}
                    type="checkbox"
                    onChange={(e) => { completedTodo(id, e.target.checked) }}
                />
                <label>{text}</label>

                <button
                    className='destroy'
                    onClick={() => { removeTodo(id) }}
                >
                </button>
            </div>
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