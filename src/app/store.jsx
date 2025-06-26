import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import conversationsSliceReducer from '../features/conversations/conversationsSlice';
import messagesSliceReducer from '../features/messages/messagesSlice';

// Redux store তৈরি করা হচ্ছে এবং সব slice এখানে একত্রিত করা হচ্ছে
export const store = configureStore({
  reducer: {
    // RTK Query API slice এর reducer যোগ করা হচ্ছে
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Authentication সংক্রান্ত slice (login, logout, user info ইত্যাদি)
    auth: authSliceReducer,

    // Conversations সংক্রান্ত slice (যেমন: chat list, active convo)
    conversations: conversationsSliceReducer,

    // Messages সংক্রান্ত slice (message send/receive ইত্যাদি)
    messages: messagesSliceReducer,
  },

  // Redux DevTools শুধুমাত্র development mode-এ চালু থাকবে
  // (production এ থাকলে performance কমে যেতে পারে)
  devTools: import.meta.env.MODE !== 'production',


  // Middleware configuration:
  // defaultMiddleware এর সাথে RTK Query এর middleware যুক্ত করা হয়েছে
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
