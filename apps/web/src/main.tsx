import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
<<<<<<< HEAD
import { AuthProvider } from '@/features/auth/context/AuthContext'
=======
import { AuthProvider } from './shared/contexts/AuthContext'
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AUTH_CONFIG } from '@/config/auth.config'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={AUTH_CONFIG.GOOGLE_CLIENT_ID}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </GoogleOAuthProvider>
    </StrictMode>,
)
