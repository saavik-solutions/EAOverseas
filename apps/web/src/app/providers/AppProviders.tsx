/**
 * AppProviders — Composes all context providers in one place
 * This replaces the deeply nested provider tree that was in App.tsx
 */
import React from 'react';
import { NotificationProvider } from '../../features/notifications';
import { SavedItemsProvider } from '../../features/saved-items';
import { UserProfileProvider } from '../../features/profile';
import { PostsProvider } from '../../features/feed';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <SavedItemsProvider>
        <UserProfileProvider>
          <PostsProvider>
            {children}
          </PostsProvider>
        </UserProfileProvider>
      </SavedItemsProvider>
    </NotificationProvider>
  );
};

export default AppProviders;
