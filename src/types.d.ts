import { TodoFilters } from "./consts";

export interface Todo {
    id: number,
    text: string,
    completed: boolean,
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


export interface User {
    userName?: string;
    email: string;
    password: string;
}



export type ListOfTodos = Todo[]

export type filterValue = typeof TodoFilters[keyof typeof TodoFilters]