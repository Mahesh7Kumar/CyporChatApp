import { create } from 'zustand';
import { createAuthSlice } from './slices/auth-slice';
import { createChatSlice } from './slices/chat-slice';

// using and set the slice by the store
export const useAppStore = create()((...a)=>({
    // Auth slice data and spread
    ...createAuthSlice(...a),
    // Chat slice data and spread
    ...createChatSlice(...a),
}));