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

// 🔐 Save tokens to localStorage
const setTokens = (data: { refresh: string; access: string }) => {
    Cookies.set("access_token", data.access);
    Cookies.set("refresh_token", data.refresh);
};

// 🚀 Thunk to log in a user
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { data } = action.payload.data;

                // Save tokens to localStorage
                setTokens(data);
                const userData = jwtDecode<any>(data.access);
                console.log(userData)
                state.userDetails.first_name = userData.first_name
                state.userDetails.last_name = userData.last_name
                state.userDetails.username = userData.username
                state.userDetails.institution = userData.institution
                state.userDetails.role = userData.role
                state.userDetails.user_class = userData.user_class
                state.userDetails.loggedIn = true
                state.loading = false;
                console.log("after assigning")
                console.log(state.userDetails)
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

// 🧠 Selectors
export const selectUserDetails = (state: RootState) => state.user.userDetails;
export const selectAppState = (state: RootState) => state.user.loading;

// 🔁 Export reducer
export default userSlice.reducer;
