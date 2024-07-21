import { MouseEventHandler } from "react";
import { TodoFilters } from "../consts";
import { User, UserError } from "./users";

//TODOS INTERFACES
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    user_id?: number;
};

export interface TodoError {
    success: boolean;
    message: string;
};

export type TodoType = Todo;

export interface TodosUser {
    todos: TodoType[];
    addTodo: (text: string) => void;
    updateCompleted: (id: number, completed: boolean) => void;
    removeTodo: (id: number) => void;
    updateTodo: (params: { id: number; text: string }) => void;
    setFilter: (filter: filterValue) => void;
    activeCount: number;
    completedCount: number;
    handleFilterChange: (filter: filterValue) => void;
    handleClearCompleted: () => void;
    filterSelected: filterValue;
    errorMessage: TodoError | '';
    setErrorMessage: React.Dispatch<React.SetStateAction<TodoError | ''>>;
};

export interface PropsFilterTodos {
    onFilterChange: (filter: filterValue) => void;
    filterSelected: filterValue;
};

export interface PropsFooterTodos {
    activeCount: number;
    completedCount: number;
    filterSelected: filterValue;
    onClearCompleted: () => void;
    handleFilterChange: (filter: filterValue) => void;
};

export interface PropsHeaderTodos {
    addTodo: (text: string) => void;
    errorMessage: TodoError | '';
};

export interface InputTextProps {
    type: string;
    design?: string;
    placeholder: string;
    name: string;
    state: React.Dispatch<React.SetStateAction<User>>;
    errorState: React.Dispatch<React.SetStateAction<UserError>>;
    autoCompleteValue: string;
};

export interface PropsTodoComponent {
    id: number;
    text: string;
    completed: boolean;
    completedTodo: (id: number, completed: boolean) => void;
    setTitle: (params: { id: number; text: string }) => void;
    isEditing: string;
    setIsEditing: (completed: string) => void;
    removeTodo: (id: number) => void;
};

export interface TodoButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    text?: string;
};

export interface PropsTodosComponent {
    todos: TodoType[]
    completedTodo: (id: number, completed: boolean) => void;
    setTitle: (params: { id: number; text: string }) => void;
    removeTodo: (id: number) => void;
};

export interface PropsCreateTodo {
    addTodo: (text: string) => void;
    errorMessage: TodoError | '';
};

export type ListOfTodos = Todo[];

export type filterValue = typeof TodoFilters[keyof typeof TodoFilters];