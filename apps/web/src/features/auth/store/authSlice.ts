import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  studentId?: string;
  fullName: string;
  name: string;
  email: string;
  role?: string;
  isDemo?: boolean;
  isVirtual?: boolean;
  avatar?: string;
  emailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoginModalOpen: boolean;
}

const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem('eaoverseas_user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  token: localStorage.getItem('eaoverseas_token'),
  isLoginModalOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('eaoverseas_token', token);
      localStorage.setItem('eaoverseas_user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('eaoverseas_token');
      localStorage.removeItem('eaoverseas_user');
    },
    setLoginModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginModalOpen = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('eaoverseas_user', JSON.stringify(state.user));
      }
    },
  },
});

export const { setCredentials, logout, setLoginModalOpen, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
