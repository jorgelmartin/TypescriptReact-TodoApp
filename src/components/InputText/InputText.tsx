import React, { ChangeEvent, ReactElement } from 'react';
import '../../index.css';
import { checkError } from '../../services/useful';
import { User, UserError } from '../../types';

// interface User {
//     email: string;
//     password: string;
// }

// interface UserError {
//     userNameError?: string;
//     emailError: string;
//     passwordError: string;
// }

interface InputTextProps {
    type: string;
    design?: string;
    placeholder: string;
    name: string;
    state: React.Dispatch<React.SetStateAction<User>>; // Ajustado a User
    errorState: React.Dispatch<React.SetStateAction<UserError>>;
}

export const InputText: React.FC<InputTextProps> = ({
    type,
    design,
    placeholder,
    name,
    state,
    errorState,
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

        // MAKE A COPY AND SET THE NEW STATE
        errorState((prevState) => ({
            ...prevState,
            [name + 'Error']: errorMessage, // Replace 'errorMessage' with the actual error message
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
            type={type}
            className={getInputClass()}
            placeholder={placeholder}
            name={name}
            onChange={inputHandler}
            onBlur={inputCheck}
        />
    );
};