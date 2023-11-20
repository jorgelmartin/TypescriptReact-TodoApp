import React, { ReactNode, MouseEventHandler } from 'react';
import '../index.css';

interface AkdemyButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  text?: string;
  type?: string;
}

export const AkdemyButton: React.FC<AkdemyButtonProps> = ({ onClick, children, text }: AkdemyButtonProps) => {
  return (
    <div className='borderAkdemy'>
      <button className="akdemyButton" onClick={onClick}>
        {children} {text}
      </button>
    </div>
  );
};