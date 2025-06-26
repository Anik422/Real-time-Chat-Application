import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// এটি হলো মূল API slice তৈরি করার কোড।
// RTK Query ব্যবহার করে API এর সাথে যুক্ত থাকার জন্য এভাবে API slice তৈরি করা হয়।

export const apiSlice = createApi({
    // `reducerPath` হলো Redux store-এ এই slice টা কোন key নামে থাকবে তা ঠিক করে।
    reducerPath: "api",

    // `baseQuery` হলো API কল করার মূল ফাংশন। এখানে `fetchBaseQuery` ব্যবহার করা হয়েছে,
    // যা internally fetch() API ব্যবহার করে।
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, // API এর মূল URL এখানে বসানো হয়, .env ফাইল থেকে
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = getState()?.auth.accessToken; // auth slice থেকে access token নেয়া
            if (token) {
                headers.set("Authorization", `Bearer ${token}`); // headers এ token যোগ করা
            }
            return headers; // headers ফেরত দেয়া
        },
    }),

    // `tagTypes` ব্যবহার করা হয় ক্যাশ ম্যানেজমেন্ট ও invalidation এর জন্য।
    tagTypes: [],

    // `endpoints` ফাংশনে আমরা future-এ সব API endpoints define করব।
    endpoints: (builder) => ({})
});
