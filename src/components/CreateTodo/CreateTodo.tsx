import { useState } from 'react'

interface Props {
    addTodo: (text: string) => void;
}

export const CreateTodo: React.FC<Props> = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter' && inputValue !== '') {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    return (
        <div style={{ marginTop: '-3em' }}>
            <input
                className="new-todo"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder='Write your task'
                autoFocus
            />
        </div>
    );
};