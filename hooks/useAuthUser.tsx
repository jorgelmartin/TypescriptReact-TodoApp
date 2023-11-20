import { useState, useEffect } from 'react';
import { Register, loginMe } from '../src/services/ApiCalls';
import { useDispatch } from "react-redux";
import { login } from "../src/userSlice";

interface User {
    userName?: string;
    email: string;
    password: string;
}

interface UserError {
    emailError: string;
    passwordError: string;
}

export const useAuthUser = (
) => {
    const [user, setUser] = useState<User>({ email: '', password: '' });
    const [userError, setUserError] = useState<UserError>({ emailError: '', passwordError: '' });
    const [userLogin, setUserLogin] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const dispatch = useDispatch();
    const submitHandler = (e: React.MouseEvent<HTMLButtonElement>, body:User) => {
        e.preventDefault();

        //SEND TOKEN AND DATA
        loginMe(body)
            .then((res) => {
                console.log("soyla", res.data);

                setToken(res.data.token);
                setUserLogin(res.data);
            })
            .catch((error) => {
                console.log("Se ha producido un error", error.message);
                // setUserError({ credentials: error.response.data.message });
            });
    };

    const submitHandlerRegister = (e: React.MouseEvent<HTMLButtonElement>, body: User) => {
        e.preventDefault();
        Register(body)
            .then((res) => {
                setUserLogin(res.data);
            })
            .catch((error) => {
                console.log("Se ha producido un error", error.message);
                // setUserError({ credentials: error.response.data.message });
            });
    };

    useEffect(() => {
        if (token) {
            dispatch(
                login({
                    token: userLogin.token,
                    userName: userLogin.userName,
                    userId: userLogin.id,
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
        submitHandler,
        submitHandlerRegister,
    };
};
