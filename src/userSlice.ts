import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types/users';

const initialState: UserState = {
    credentials: {
        token: '',
    },
    data: {
        username: '',
        userId: 0,
        role: '',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; username: string; userId: number, role: string }>) => {
            const { token, username, userId, role } = action.payload;
            state.credentials = {
                token,
            };
            state.data = {
                username,
                userId,
                role,
            };
        },
        logout: (state) => {
            return {
                ...state,
                credentials: {
                    token: '',
                },
                data: {
                    username: '',
                    userId: 0,
                    role: '',
                },
            };
        },
    },
});

// EXPORT.....
export const { login, logout } = userSlice.actions;

export const userData = (state: { user: UserState }) => state.user;

export default userSlice.reducer;