import { useState } from 'react';
import { PropsCreateTodo } from '../../types/todos';

export const CreateTodo: React.FC<PropsCreateTodo> = ({ addTodo, errorMessage  }) => {
    const [inputValue, setInputValue] = useState('');

    //CHECK IF THE PRESSED KEY IS 'ENTER' AND CALL ADDTODO WITH THE VALUE OF INPUTVALUE
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter' && inputValue !== '') {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    return (
        <div style={{ 
                marginTop: '-4.6em',
                textAlign:'center',
                userSelect: 'none'
            }}> 
            <input
                id="new-todo"
                className="new-todo"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder='Write your task'
                autoFocus
            />
            {errorMessage && <div className="errorText">{errorMessage.message}</div>}
        </div>
    );
};