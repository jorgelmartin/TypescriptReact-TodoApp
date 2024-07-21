import React, { ChangeEvent, ReactElement } from 'react';
import '../../index.css';
import { checkError } from '../../services/useful';
import { InputTextProps } from '../../types/todos';

export const InputText: React.FC<InputTextProps> = ({
    type,
    design,
    placeholder,
    name,
    state,
    errorState,
    autoCompleteValue
}: InputTextProps): ReactElement => {

    //INPUTHANDLER FUNCTION
    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        state((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // CHECKERROR FUNCTION
    const inputCheck = (e: ChangeEvent<HTMLInputElement>): void => {
        let { name, value } = e.target;

        // VERIFY THE VALUE IN THE INPUT USING THE FUNCTION CHECKERROR
        let errorMessage = checkError(name, value);
        errorState((prevState) => ({
            ...prevState,
            [name + 'Error']: errorMessage, 
        }));
    };

    // GETTING INPUT CLASS NORMAL AND ERROR
    const getInputClass = (): string => {
        let inputClass = 'normalInput';
        if (design === 'errorInput') {
            inputClass += ' errorInput';
        }
        return inputClass;
    };

    return (
        // RENDER THE INPUT TEXT
        <input
                id={name}
                name={name}
                type={type}
                className={getInputClass()}
                placeholder={placeholder}
                onChange={inputHandler}
                onBlur={inputCheck}
                autoComplete={autoCompleteValue}
            />
    );
};