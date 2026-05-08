import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  setCredentials, 
  logout as logoutAction, 
  setLoginModalOpen as setLoginModalOpenAction 
} from '../store/authSlice';
import { 
  useLoginMutation, 
  useRegisterMutation, 
  useGoogleLoginMutation, 
  useVerifyOTPMutation, 
  useResendOTPMutation 
} from '../store/authApi';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const isLoginModalOpen = useAppSelector((state) => state.auth.isLoginModalOpen);
  
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegistering }] = useRegisterMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoggingIn }] = useGoogleLoginMutation();
  const [verifyOTPMutation] = useVerifyOTPMutation();
  const [resendOTPMutation] = useResendOTPMutation();

  const login = useCallback(async (email: string, password: string) => {
    // 1. Check for Virtual Consultants (Legacy Logic)
    const savedConsultants = localStorage.getItem('eao_consultants');
    if (savedConsultants) {
      try {
        const consultants = JSON.parse(savedConsultants);
        const match = consultants.find((c: any) => 
          c.email.toLowerCase() === email.toLowerCase() && 
          c.password === password
        );

        if (match) {
          const virtualUser = {
            id: match.id || match.name.replace(/\s+/g, '-').toLowerCase(),
            fullName: match.name,
            name: match.name,
            email: match.email,
            role: 'counsellor',
            avatar: match.avatar,
            isVirtual: true
          };
          const virtualToken = 'virtual-token-' + Date.now();
          dispatch(setCredentials({ user: virtualUser, token: virtualToken }));
          return virtualUser;
        }
      } catch (e) {
        console.error("Error checking virtual consultants", e);
      }
    }

    // 2. Real API login
    const result = await loginMutation({ email, password }).unwrap();
    const userData = {
      ...result.user,
      name: result.user.fullName || result.user.name
    };
    dispatch(setCredentials({ user: userData, token: result.token }));
    return userData;
  }, [dispatch, loginMutation]);

  const loginWithGoogle = useCallback(async (token: string) => {
    const result = await googleLoginMutation(token).unwrap();
    if (result.isNewUser) return result;

    const userData = {
      ...result.user,
      name: result.user.fullName || result.user.name
    };
    dispatch(setCredentials({ user: userData, token: result.token }));
    return userData;
  }, [dispatch, googleLoginMutation]);

  const signup = useCallback(async (userDetails: any) => {
    const result = await registerMutation({
      ...userDetails,
      fullName: userDetails.name
    }).unwrap();
    
    const userData = {
      ...result.user,
      name: result.user.fullName || result.user.name
    };
    dispatch(setCredentials({ user: userData, token: result.token }));
    return userData;
  }, [dispatch, registerMutation]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const setLoginModalOpen = useCallback((open: boolean) => {
    dispatch(setLoginModalOpenAction(open));
  }, [dispatch]);

  const requireAuth = useCallback((callback: () => void) => {
    if (!user) {
      dispatch(setLoginModalOpenAction(true));
    } else {
      callback();
    }
  }, [user, dispatch]);

  const verifyOTP = useCallback(async (otp: string) => {
    return await verifyOTPMutation(otp).unwrap();
  }, [verifyOTPMutation]);

  const resendOTP = useCallback(async () => {
    return await resendOTPMutation({}).unwrap();
  }, [resendOTPMutation]);

  return {
    user,
    token,
    login,
    loginWithGoogle,
    signup,
    logout,
    loading: false, // Loading is handled by RTK Query's isFetching/isLoading on demand
    isLoginModalOpen,
    setLoginModalOpen,
    requireAuth,
    verifyOTP,
    resendOTP,
    isLoggingIn,
    isRegistering,
    isGoogleLoggingIn
  };
};
