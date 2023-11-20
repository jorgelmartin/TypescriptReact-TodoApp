import { useState } from 'react'

interface Props {
    saveTodo: (id: string, text: string) => void;
}
export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {

    const [inputValue, setInputValue] = useState('')

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter' && inputValue !== '') {
            // Supongamos que no tienes un 'id' aquí y solo necesitas el 'text'
            const id = ''; // Modifica esto según tus necesidades
            saveTodo(id, inputValue);
            setInputValue('');
        }
    };
    return (
        <input
            className="new-todo"
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value)
            }}
            onKeyDown={handleKeyDown}
            placeholder='Escribe tu próxima tarea'
            autoFocus
        />
    )
}