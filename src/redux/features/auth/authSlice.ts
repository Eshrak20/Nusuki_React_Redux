import { createSlice } from "@reduxjs/toolkit";

type UserProfile = {
  profile_photo_url?: string | null;
  [key: string]: unknown;
};

export type AuthUser = {
  id?: number | string;
  name?: string;
  email?: string;
  profile?: UserProfile | null;
  [key: string]: unknown;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
};

const safeParseUser = (value: string | null): AuthUser | null => {
  if (!value || value === "undefined" || value === "null") {
    return null;
  }

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const savedUser = safeParseUser(localStorage.getItem("user"));
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: savedUser,
  token: savedToken && savedToken !== "undefined" ? savedToken : null,
  isAuthenticated: Boolean(savedToken && savedToken !== "undefined"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.user = user ?? null;
      state.token = token ?? null;
      state.isAuthenticated = Boolean(token);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }

      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload as Partial<AuthUser>;

      if (!state.user) {
        state.user = updatedUser as AuthUser;
      } else {
        state.user = {
          ...state.user,
          ...updatedUser,

          // profile object thakle nested merge korbe
          profile: {
            ...(state.user.profile ?? {}),
            ...(updatedUser.profile ?? {}),
          },
        };
      }

      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;