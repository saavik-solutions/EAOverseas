import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export const useAuthAction = () => {
    const { user } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void | Promise<void>) | null>(null);
    const isExecutingRef = useRef(false);

    // Automatically execute the pending action when the user logs in
    useEffect(() => {
        if (user && pendingAction && !isExecutingRef.current) {
            isExecutingRef.current = true;
            Promise.resolve(pendingAction()).finally(() => {
                isExecutingRef.current = false;
            });
            setPendingAction(null);
        }
    }, [user, pendingAction]);

    const executeAction = useCallback((action: () => void | Promise<void>) => {
        if (user) {
            Promise.resolve(action()).catch((err) => {
                console.error('[executeAction] Unhandled error in action:', err);
            });
        } else {
            setIsLoginModalOpen(true);
            setPendingAction(() => action);
        }
    }, [user]);

    const closeLoginModal = useCallback(() => {
        setIsLoginModalOpen(false);
        // We don't clear pendingAction here so it can execute if user logged in
    }, []);

    return {
        isLoginModalOpen,
        closeLoginModal,
        executeAction
    };
};
