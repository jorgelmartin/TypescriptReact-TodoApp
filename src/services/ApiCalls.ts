import axios, { AxiosResponse } from 'axios';
import { ApiResponse, ApiResponseGetAll, Credentials, LoginResponse, RegisterResponse, TodoCreate } from '../types/api';

const URLAUTH = "http://localhost:3000/auth/";
const URLTODO = "http://localhost:3000/todo/";

//LOGIN
export const loginMe = async (credentials: Credentials): Promise<AxiosResponse<LoginResponse>> => {
    const res = await axios.post(`${URLAUTH}login`, credentials);
    return res.data;
};

//REGISTER
export const Register = async (credentials: Credentials): Promise<AxiosResponse<RegisterResponse>> => {
    const res = await axios.post(`${URLAUTH}register`, credentials);
    return res;
};

//CREATE TODO
export const createTodo = async (todo: TodoCreate, token: string): Promise<AxiosResponse<ApiResponse>> => {
    const res = await axios.post(`${URLTODO}create`, todo, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

//GET MY TODOs
export const getAllMyTodos = async (userId: number, token: string): Promise<AxiosResponse<ApiResponseGetAll>> => {
    const res = await axios.get(`${URLTODO}getAll/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

//UPDATE TODO
export const updateTodoText = async (todoId: number, newText: string, token: string): Promise<AxiosResponse<ApiResponse>> => {
    const res = await axios.put(
        `${URLTODO}update/${todoId}`,
        { text: newText }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );
    return res;
};

//UPDATE COMPLETED TODO
export const updateTodoCompleted = async (todoId: number, newCompleted: boolean, token: string): Promise<AxiosResponse<ApiResponse>> => {
    const res = await axios.put(`${URLTODO}update/${todoId}`,
        { completed: newCompleted }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    );
    return res;
};

//DELETE TODO
export const deleteTodo = async (id: number, token: string): Promise<AxiosResponse<ApiResponse>> => {
    const res = await axios.delete(`${URLTODO}delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};