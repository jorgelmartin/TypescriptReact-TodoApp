import React, { ReactNode, MouseEventHandler } from 'react';
import '../index.css';

interface TodoButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  text?: string;
}

export const TodoButton: React.FC<TodoButtonProps> = ({ onClick, children, text }: TodoButtonProps) => {
  return (
    <div className='borderAkdemy'>
      <button className="TodoButton" onClick={onClick}>
        {children} {text}
      </button>
    </div>
  );
};