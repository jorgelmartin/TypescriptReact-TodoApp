import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    credentials: {
        token: string;
    };
    data: {
        userName: string;
        userId: number;
    };
}

const initialState: UserState = {
    credentials: {
        token: '',
    },
    data: {
        userName: '',
        userId: 0,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; userName: string; userId: number }>) => {
            const { token, userName, userId } = action.payload;
            state.credentials = {
                token,
            };
            state.data = {
                userName,
                userId,
            };
        },
        logout: (state) => {
            return {
                ...state,
                credentials: {
                    token: '',
                },
                data: {
                    userName: '',
                    userId: 0,
                },
            };
        },
    },
});

// EXPORT.....
export const { login, logout } = userSlice.actions;

export const userData = (state: { user: UserState }) => state.user;

export default userSlice.reducer;