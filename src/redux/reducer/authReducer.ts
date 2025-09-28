import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../models/user';


interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
            // console.log("Login action payload:", state.user);
        },
        setIsLoadingTrue(state){
            state.isLoading = true;
        },
        setIsLoadingFalse(state){
            state.isLoading = false;
        }

    }
});

export const { login,setIsLoadingFalse,setIsLoadingTrue } = authSlice.actions;
export default authSlice.reducer;