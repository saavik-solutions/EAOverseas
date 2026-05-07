import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { Provider } from 'react-redux'
import { store } from './store'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            {GOOGLE_CLIENT_ID ? (
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <App />
                </GoogleOAuthProvider>
            ) : (
                <App />
            )}
        </Provider>
    </StrictMode>,
)
