//API INTERFACES
export interface ApiResponse {
    success: boolean;
    todo: Todo;
};

export interface ApiResponseGetAll {
    success: boolean;
    todos: Todo[];
};

export interface Credentials {
    username?: string;
    email: string;
    password: string;
};

export interface LoginResponse {
    token: string;
    user: User;
};

export interface TodoCreate {
    text: string;
    user_id: number;
};

export interface RegisterResponse {
    success: boolean;
    message: string;
    userRegistered: {
        username: string;
        email: string;
        userId: number;
        role: string;
    };
    token: string;
};

export interface ModalLoginRegisterProps {
    show: boolean;
    onClose: () => void;
};