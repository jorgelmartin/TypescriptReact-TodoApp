import { TodoFilters } from "./consts";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    user_id: number;
}

export interface UserState {
    credentials: {
        token: string;
    };
    data: {
        userName: string;
        userId: number;
        role: string;
    };
}

export interface UserData {
    user: UserState;
}

export interface LoginResponse {
    success: boolean;
    data: UserData;
}

export interface ApiResponse {
    success: boolean;
    todo: Todo;
}
export interface ApiResponseGetAll {
    success: boolean;
    todos: Todo[];
}

export interface User {
    userName?: string;
    email: string;
    password: string;
}

interface UserError {
    userNameError?: string;
    emailError: string;
    passwordError: string;
    message:string;
}

export type ListOfTodos = Todo[]

export type filterValue = typeof TodoFilters[keyof typeof TodoFilters]