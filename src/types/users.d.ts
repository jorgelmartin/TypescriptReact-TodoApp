//USER INTERFACES
export interface UserState {
    credentials: {
        token: string;
    };
    data: {
        username: string;
        userId: number;
        role: string;
    };
};

export interface UserData {
    user: UserState;
};

export interface User {
    username: string;
    id: number;
    role: string;
    email: string;
    password: string;
};

export interface UserError {
    usernameError?: string;
    emailError: string;
    passwordError: string;
    message: string;
};