import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import userSlice from '../userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware: Middleware[] = [thunk];

export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

export const persistor = persistStore(store);