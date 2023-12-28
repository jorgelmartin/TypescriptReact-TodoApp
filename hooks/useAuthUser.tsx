import { useState, useEffect } from 'react';
import { Credentials, Register, loginMe } from '../src/services/ApiCalls';
import { useDispatch } from "react-redux";
import { login } from "../src/userSlice";
import { User, UserError } from '../src/types';
import { useNavigate } from 'react-router-dom';


export const useAuthUser = (
) => {
    const [user, setUser] = useState<User>({ userName:'', email: '', password: '' });
    const [userError, setUserError] = useState<UserError>({ userNameError:'', emailError: '', passwordError: '', message: '' });


    const [userLogin, setUserLogin] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandlerLogin = (e: React.MouseEvent<HTMLButtonElement>, body:User) => {
        e.preventDefault();

        //SEND TOKEN AND DATA
        loginMe(body)
            .then((res) => {
                setToken(res.data.token);
                setUserLogin(res.data);
                navigate('/Todos'); 
            })
            .catch((error) => {
                setUserError({
                    emailError: error.response.data.emailError || '',  
                    passwordError: error.response.data.passwordError || '', 
                    message: error.response.data.message || '', 
                });
            });
    };

    const submitHandlerRegister = (e: React.MouseEvent<HTMLButtonElement>, body: User) => {
    e.preventDefault();
    const { userName, email, password } = body;
    const credentials: Credentials = { email, password };
    if (userName) {
        credentials.user_name = userName; 
    }
    Register(credentials)
    
        .then((res) => {
            setUserLogin(res.data);
            navigate('/Todos'); 
        })
        .catch((error) => {
            setUserError({
                userNameError: error.response.data.userNameError || '',
                emailError: error.response.data.emailError || '', 
                passwordError: error.response.data.passwordError || '',
                message: error.response.data.message || '',  
            });
        });
};

    useEffect(() => {
        if (token && userLogin) {
            dispatch(
                login({
                    token: userLogin.token,
                    userName: userLogin.user.user_name,
                    userId: userLogin.user.id,
                    role: userLogin.user.role
                })
            );
        }
    }, [token, userLogin]);

    return {
        user,
        setUser,
        userError,
        setUserError,
        userLogin,
        setUserLogin,
        submitHandlerLogin,
        submitHandlerRegister,
    };
};
