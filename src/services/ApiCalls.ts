import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../types';

const URLAUTH = "/api/auth/";
const URLTODO = "/api/todo/";

export interface Credentials {
    user_name?: string;
    email: string;
    password: string;
}
interface Todo {
    text: string;
    user_id: number;
    completed?: boolean;
}
interface LoginResponse {
    token: string;
    // Otras propiedades según la respuesta real del servidor
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    userRegistered: {
        email: string;
    };
    token: string;
}
// LOGIN 
export const loginMe = async (credentials: Credentials): Promise<AxiosResponse<LoginResponse>> => {
    try {
        const res = await axios.post(`${URLAUTH}login`, credentials);
        console.log("Respuesta exitosa:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

export const Register = async (credentials: Credentials): Promise<AxiosResponse<RegisterResponse>> => {
    try {
        const res = await axios.post(`${URLAUTH}register`, credentials);
        console.log("Respuesta exitosa:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

export const createTodo = async (todo: Todo, token: string): Promise<AxiosResponse<ApiResponse>> => {
    try {
        const res = await axios.post(`${URLTODO}create`, todo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Respuesta exitosa:', res);
        return res;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const getAllMyTodos = async (userId: number, token: string): Promise<AxiosResponse<ApiResponse>> => {
    try {
        const res = await axios.get(`${URLTODO}getAll/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Asegúrate de ajustar según tus necesidades
                // Otros encabezados si es necesario
            },
        });
        console.log('Respuesta exitosa:', res.data);
        return res;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const updateTodoText = async (todoId: number, newText: string, token: string): Promise<AxiosResponse<ApiResponse>> => {
    try {
        const res = await axios.put(
            `${URLTODO}update/${todoId}`,
            { text: newText },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('Respuesta exitosa al actualizar texto:', res.data);
        return res;
    } catch (error) {
        console.error('Error al actualizar texto del todo:', error);
        throw error;
    }
};

export const updateTodoCompleted = async (todoId: number, newCompleted: boolean, token: string): Promise<AxiosResponse<ApiResponse>> => {
    try {
        const res = await axios.put(
            `${URLTODO}update/${todoId}`,
            { completed: newCompleted },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        console.log('Respuesta exitosa al actualizar estado completed:', res.data);
        return res;
    } catch (error) {
        console.error('Error al actualizar estado completed del todo:', error);
        throw error;
    }
};

export const deleteTodo = async (id: number, token: string): Promise<AxiosResponse<ApiResponse>> => {
    try {
        const res = await axios.delete(`${URLTODO}delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Respuesta exitosa al borrar Todo:', res.data);
        return res;
    } catch (error) {
        console.error('Error en la solicitud para borrar Todo:', error);
        throw error;
    }
};