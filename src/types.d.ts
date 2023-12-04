import { TodoFilters } from "./consts";

export interface Todo {
    id: number,
    text: string,
    completed: boolean,
}

export interface UserData {
    user: {
        credentials: {
            token: string;
        };
        data: {
            userName: string;
            userId: number;
        };
    };
}

export interface ApiResponse {
    success: boolean;
    todo: Todo; 
}

export type TodoId = Pick<Todo, 'id'>
export type TodoText = Pick<Todo, 'text'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]

export type filterValue = typeof TodoFilters[keyof typeof TodoFilters]