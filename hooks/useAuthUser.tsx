import { useState, useEffect } from 'react';
import { Credentials, Register, loginMe } from '../src/services/ApiCalls';
import { useDispatch } from "react-redux";
import { login } from "../src/userSlice";
import { User } from '../src/types';


interface UserError {
    emailError: string;
    passwordError: string;
};

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
                console.log("soyla", res);

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
    const { userName, email, password } = body;
    const credentials: Credentials = { email, password };
    if (userName) {
        credentials.user_name = userName; 
    }
    Register(credentials)
    
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
        submitHandler,
        submitHandlerRegister,
    };
};
