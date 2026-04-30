// Feed feature — public exports
export { default as Feed } from './pages/Feed';
export { default as FeedDetails } from './pages/FeedDetails';
export { feedService } from './services/feedService';
export { PostsProvider, usePosts } from './services/PostsContext';
export type { Post } from './services/PostsContext';
