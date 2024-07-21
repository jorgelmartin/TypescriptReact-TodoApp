import { useState, useEffect } from 'react';
import { Register, loginMe } from '../src/services/ApiCalls';
import { useDispatch } from "react-redux";
import { login } from "../src/userSlice";
import { User, UserError } from '../src/types/users';
import { Credentials, LoginResponse, RegisterResponse } from '../src/types/api';

export const useAuthUser = (
) => {
    const [user, setUser] = useState<User>({
        username: '',
        id: 0,
        role: '',
        email: '',
        password: '',
    });
    const [userError, setUserError] = useState<UserError>({
        usernameError: '',
        emailError: '',
        passwordError: '',
        message: ''
    });
    const [userLogin, setUserLogin] = useState<LoginResponse | ''>('');
    const [userRegister, setUserRegister] = useState<RegisterResponse | ''>('');
    const [token, setToken] = useState<string | ''>('');
    const dispatch = useDispatch();

    // LOGIN
    const submitHandlerLogin = (e: React.MouseEvent<HTMLButtonElement>, body: User, onClose: () => void) => {
        e.preventDefault();
        //SEND TOKEN AND DATA
        loginMe(body)
            .then((res) => {
                setToken(res.data.token);
                setUserLogin(res.data);
                onClose();
            })
            .catch((error) => {
                setUserError({
                    emailError: error.response.data.emailError || '',
                    passwordError: error.response.data.passwordError || '',
                    message: error.response.data.message || '',
                });
            });
    };

    // REGISTER
    const submitHandlerRegister = (e: React.MouseEvent<HTMLButtonElement>, body: User, onClose: () => void) => {
        e.preventDefault();
        const { username, email, password } = body;

        const credentials: Credentials = { username, email, password };
        Register(credentials)
            .then((res) => {
                setToken(res.data.token);
                setUserRegister(res.data);
                onClose();
            })
            .catch((error) => {
                setUserError({
                    usernameError: error.response.data.usernameError || '',
                    emailError: error.response.data.emailError || '',
                    passwordError: error.response.data.passwordError || '',
                    message: error.response.data.message || '',
                });
            });
    };

    // DISPATCH WITH LOGIN
    useEffect(() => {
        if (token && userLogin) {
            dispatch(
                login({
                    token: userLogin.token,
                    username: userLogin.user.username,
                    userId: userLogin.user.id,
                    role: userLogin.user.role
                })
            );
        }
    }, [token, userLogin]);

    // DISPATCH WITH REGISTER
    useEffect(() => {
        if (token && userRegister) {
            dispatch(
                login({
                    token: userRegister.token,
                    username: userRegister.userRegistered.username,
                    userId: userRegister.userRegistered.userId,
                    role: userRegister.userRegistered.role
                })
            );
        }
    }, [token, userRegister]);

    return {
        user,
        setUser,
        userError,
        userRegister,
        setUserRegister,
        setUserError,
        userLogin,
        setUserLogin,
        submitHandlerLogin,
        submitHandlerRegister,
    };
};