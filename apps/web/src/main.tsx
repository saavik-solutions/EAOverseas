import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import { AuthProvider } from './features/auth/context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { Provider } from 'react-redux'
import { store } from './store'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </GoogleOAuthProvider>
    </StrictMode>,
)
