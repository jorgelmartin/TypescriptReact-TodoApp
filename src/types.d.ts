import { TodoFilters } from "./consts"

export interface Todo {
    id: string,
    text: string,
    completed: boolean,
    // userId: number
}

export type TodoId = Pick<Todo, 'id'>
export type TodoText = Pick<Todo, 'text'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]

export type filterValue = typeof TodoFilters[keyof typeof TodoFilters]