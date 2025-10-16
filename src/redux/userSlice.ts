import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { postData } from "../utils/useAxios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
type UserRole =
    | "teacher"
    | "student"
    | "admin"
    | "super_admin"
    | "principal"
    | "deputy_principal"
    | "bursar"
    | "secretary";

interface UserDetails {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    institution: string | null;
    role: UserRole;
    user_class: string | null;
    loggedIn: boolean
}

interface UserState {
    userDetails: UserDetails;
    loading: boolean;
}

const initialState: UserState = {
    userDetails: {
        username: null,
        first_name: null,
        last_name: null,
        institution: null,
        role: "student",
        user_class: null,
        loggedIn: false
    },
    loading: false,
};

// Thunk to log in a user
export const loginUser = createAsyncThunk<
    any, // return type
    { email: string; password: string }, // argument type
    { rejectValue: string } // error type
>("login/user", async (userData, { rejectWithValue }) => {
    try {
        const resp = await postData("/login", userData);

        if (resp.status === "success") {
            toast.success(resp.message);
            return resp;
        } else {
            toast.error(resp.message);
            return rejectWithValue(resp.message || "Login failed");
        }
    } catch (error: any) {
        toast.error("Login error: " + error.message);
        return rejectWithValue(error.message || "Unexpected error");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
            state.userDetails.first_name = null
            state.userDetails.last_name = null
            state.userDetails.username = null
            state.userDetails.institution = null
            state.userDetails.role = "student"
            state.userDetails.user_class = null
            state.userDetails.loggedIn = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { data } = action.payload.data;

                // Save tokens to localStorage
                const userData = jwtDecode<any>(data.access);
                const expiresAt = new Date(userData.exp * 1000)
                console.log(expiresAt)
                Cookies.set('access_token', data.access, {
                    expires: expiresAt,
                    // secure: true,
                    sameSite: 'Strict'
                })
                Cookies.set('refresh_token', data.refresh, {
                    expires: 90,
                    // secure: true,
                    sameSite: 'Strict'
                })
                state.userDetails.first_name = userData.first_name
                state.userDetails.last_name = userData.last_name
                state.userDetails.username = userData.username
                state.userDetails.institution = userData.institution
                state.userDetails.role = userData.role
                state.userDetails.user_class = userData.user_class
                state.userDetails.loggedIn = true
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

//  Selectors
export const selectUserDetails = (state: RootState) => state.user.userDetails;
export const selectAppState = (state: RootState) => state.user.loading;
export const {logoutUser} = userSlice.actions
// Export reducer
export default userSlice.reducer;
