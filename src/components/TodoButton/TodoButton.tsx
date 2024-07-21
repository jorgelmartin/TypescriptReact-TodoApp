import React from 'react';
import '../../index.css';
import { TodoButtonProps } from '../../types/todos';

//TODO BUTTON
export const TodoButton: React.FC<TodoButtonProps> = ({ onClick, text }: TodoButtonProps) => {
  return (
    <div className='borderAkdemy'>
      <button className="TodoButton" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};