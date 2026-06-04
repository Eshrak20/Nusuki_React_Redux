import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserProfile = {
  profile_photo_url?: string | null;
  avatar?: string | null;
  image?: string | null;
  [key: string]: unknown;
};

export type AuthUser = {
  id?: number | string;
  name?: string;
  email?: string;
  profile?: UserProfile | null;
  profile_photo_url?: string | null;
  avatar?: string | null;
  image?: string | null;
  provider?: "google" | "email" | string;
  [key: string]: unknown;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
};

type AuthPayload = {
  user?: AuthUser | null;
  token?: string | null;
};

type GoogleAuthPayload = {
  user?: AuthUser | null;
  token?: string | null;
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

const safeGetToken = (value: string | null): string | null => {
  if (!value || value === "undefined" || value === "null") {
    return null;
  }

  return value;
};

const savedUser = safeParseUser(localStorage.getItem("user"));
const savedToken = safeGetToken(localStorage.getItem("token"));

const initialState: AuthState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: Boolean(savedToken),
};

const saveAuthToStorage = (user: AuthUser | null, token: string | null) => {
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
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      const { user = null, token = null } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = Boolean(token);

      saveAuthToStorage(user, token);
    },

    setGoogleCredentials: (
      state,
      action: PayloadAction<GoogleAuthPayload>
    ) => {
      const { user = null, token = null } = action.payload;

      const googleUser: AuthUser | null = user
        ? {
            ...user,
            provider: user.provider ?? "google",

            profile: {
              ...(user.profile ?? {}),

              /**
               * Backend sometimes sends image in different fields.
               * Navbar e jodi user.profile.profile_photo_url use koro,
               * tahole ekhane normalize kore rakhlam.
               */
              profile_photo_url:
                user.profile?.profile_photo_url ??
                user.profile_photo_url ??
                user.avatar ??
                user.image ??
                null,
            },
          }
        : null;

      state.user = googleUser;
      state.token = token;
      state.isAuthenticated = Boolean(token);

      saveAuthToStorage(googleUser, token);
    },

    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      const updatedUser = action.payload;

      if (!state.user) {
        state.user = updatedUser as AuthUser;
      } else {
        state.user = {
          ...state.user,
          ...updatedUser,

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

export const {
  setCredentials,
  setGoogleCredentials,
  updateUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;