import { createSlice } from '@reduxjs/toolkit';
import { asyncStatus } from '../../utils/asyncStatus';

// import { checkAuthAsync, loginAsync, signupAsync, logoutAsync } from '../Services/authService';

const initialState = {
    // ── Auth bootstrap ────────────────────────────────────────────────────
    check_auth_status: asyncStatus.IDLE,
    check_auth_data: null,
    check_auth_error: null,

    // ── Logged-in user ────────────────────────────────────────────────────
    user_data: null,
    user_auth: null,

    // ── Login ─────────────────────────────────────────────────────────────
    login_status: asyncStatus.IDLE,
    login_data: null,
    login_error: null,

    // ── Signup ────────────────────────────────────────────────────────────
    signup_status: asyncStatus.IDLE,
    signup_data: null,
    signup_error: null,

    // ── Logout ────────────────────────────────────────────────────────────
    logout_auth_status: asyncStatus.IDLE,
    logout_auth_data: null,
    logout_auth_error: null,

    // ── Forgot / Reset password ───────────────────────────────────────────
    forgot_password_status: asyncStatus.IDLE,
    forgot_password_error: null,

    reset_password_status: asyncStatus.IDLE,
    reset_password_error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setInitialAuth: (state, action) => {
            state.check_auth_status = asyncStatus.SUCCEEDED;
            if (action.payload === false) {
                state.user_data = null;
                state.user_auth = null;
            }
        },
        setlogoutStatus: (state) => {
            state.logout_auth_status = asyncStatus.IDLE;
            state.user_data = null;
            state.user_auth = null;
        },
        clearLoginStatus: (state) => {
            state.login_status = asyncStatus.IDLE;
            state.login_error = null;
        },
        clearSignupStatus: (state) => {
            state.signup_status = asyncStatus.IDLE;
            state.signup_error = null;
        },
        clearForgotPasswordStatus: (state) => {
            state.forgot_password_status = asyncStatus.IDLE;
            state.forgot_password_error = null;
        },
    },

    // TODO: [FUNCTIONAL] Uncomment extraReducers when Services are implemented
    // extraReducers: (builder) => {
    //   // checkAuth
    //   builder
    //     .addCase(checkAuthAsync.pending, (state) => {
    //       state.check_auth_status = asyncStatus.LOADING;
    //     })
    //     .addCase(checkAuthAsync.fulfilled, (state, action) => {
    //       state.check_auth_status = asyncStatus.SUCCEEDED;
    //       state.user_data = action.payload;
    //       state.user_auth = action.payload?.accessToken || null;
    //     })
    //     .addCase(checkAuthAsync.rejected, (state, action) => {
    //       state.check_auth_status = asyncStatus.ERROR;
    //       state.check_auth_error = action.payload;
    //       state.user_data = null;
    //     });
    //   // login
    //   builder
    //     .addCase(loginAsync.pending, (state) => {
    //       state.login_status = asyncStatus.LOADING;
    //     })
    //     .addCase(loginAsync.fulfilled, (state, action) => {
    //       state.login_status = asyncStatus.SUCCEEDED;
    //       state.user_data = action.payload;
    //       state.user_auth = action.payload?.accessToken || null;
    //       state.check_auth_status = asyncStatus.SUCCEEDED;
    //     })
    //     .addCase(loginAsync.rejected, (state, action) => {
    //       state.login_status = asyncStatus.ERROR;
    //       state.login_error = action.payload;
    //     });
    //   // signup
    //   builder
    //     .addCase(signupAsync.pending, (state) => {
    //       state.signup_status = asyncStatus.LOADING;
    //     })
    //     .addCase(signupAsync.fulfilled, (state, action) => {
    //       state.signup_status = asyncStatus.SUCCEEDED;
    //       state.user_data = action.payload;
    //       state.user_auth = action.payload?.accessToken || null;
    //       state.check_auth_status = asyncStatus.SUCCEEDED;
    //     })
    //     .addCase(signupAsync.rejected, (state, action) => {
    //       state.signup_status = asyncStatus.ERROR;
    //       state.signup_error = action.payload;
    //     });
    //   // logout
    //   builder
    //     .addCase(logoutAsync.pending, (state) => {
    //       state.logout_auth_status = asyncStatus.LOADING;
    //     })
    //     .addCase(logoutAsync.fulfilled, (state) => {
    //       state.logout_auth_status = asyncStatus.SUCCEEDED;
    //     })
    //     .addCase(logoutAsync.rejected, (state, action) => {
    //       state.logout_auth_status = asyncStatus.ERROR;
    //       state.logout_auth_error = action.payload;
    //     });
    //   // forgot password
    //   builder
    //     .addCase(forgotPasswordAsync.pending, (state) => {
    //       state.forgot_password_status = asyncStatus.LOADING;
    //     })
    //     .addCase(forgotPasswordAsync.fulfilled, (state) => {
    //       state.forgot_password_status = asyncStatus.SUCCEEDED;
    //     })
    //     .addCase(forgotPasswordAsync.rejected, (state, action) => {
    //       state.forgot_password_status = asyncStatus.ERROR;
    //       state.forgot_password_error = action.payload;
    //     });
    // },
});

export const {
    setInitialAuth,
    setlogoutStatus,
    clearLoginStatus,
    clearSignupStatus,
    clearForgotPasswordStatus,
} = authSlice.actions;

export default authSlice.reducer;
