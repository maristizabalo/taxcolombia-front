import { createSlice } from "@reduxjs/toolkit";

export const EmptyUserState = {
    id: 0,
    correo: "",
    user: ""
}

export const persistLocalStorageUser = (username, user_id, rol, auth_tokens) => {
    const user = {
        'username': username,
        'user_id': user_id,
        'rol': rol
    }
    localStorage.setItem('user', JSON.stringify({ ...user }));
    localStorage.setItem('auth_tokens', JSON.stringify({ ...auth_tokens }));
}

export const clearLocalStorageUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_tokens');
}

const initialStateFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const auth_tokens = JSON.parse(localStorage.getItem('auth_tokens')) || "";

    return {
        user,
        auth_tokens
    };
};

export const userSlice = createSlice({
    name: "user",
    initialState: localStorage.getItem('user') ? initialStateFromLocalStorage() : EmptyUserState,
    reducers: {
        createUser: (state, action) => {
            persistLocalStorageUser(
                action.payload.username,
                action.payload.user_id,
                action.payload.rol,
                action.payload.auth_tokens
            );
            return {
                user: {
                    username: action.payload.username,
                    user_id: action.payload.user_id,
                    rol: action.payload.rol
                },
                auth_tokens: action.payload.auth_tokens
            }
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload };
            persistLocalStorageUser(action.payload.username, action.payload.auth_tokens);
            return result
        },
        resetUser: () => {
            clearLocalStorageUser()
            return EmptyUserState
        }
    }
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;