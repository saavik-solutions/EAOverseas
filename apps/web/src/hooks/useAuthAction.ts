import { useState, useCallback } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';

export const useAuthAction = () => {
    const { user } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    const executeAction = useCallback((action) => {
        if (user) {
            action();
        } else {
            console.log("User not logged in, opening modal..."); // Debug log
            setIsLoginModalOpen(true);
            setPendingAction(() => action);
        }
    }, [user]);

    const closeLoginModal = useCallback(() => {
        setIsLoginModalOpen(false);
        setPendingAction(null);
    }, []);

    return {
        isLoginModalOpen,
        closeLoginModal,
        executeAction
    };
};
