import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";
import { io } from "socket.io-client";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all conversations for user
        getConversations: builder.query({
            query: (email) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_API_CONVERSATION_PER_PAGE}`,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                //create a socket connection
                const socket = io(import.meta.env.VITE_API_URL, {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttempts: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });
                try {
                    await cacheDataLoaded;
                    // Listen for 'conversation' events from the server
                    socket.on("conversation", (data) => {
                        // Update the cache with the new conversation data
                        updateCachedData((draft) => {
                            const existingConversation = draft.find(
                                (conv) => conv.id == data?.data?.id
                            );

                            if (existingConversation?.id) {
                                existingConversation.message = data.data.message;
                                existingConversation.timestamp = data.data.timestamp;
                            } else {
                                // Double check there is no duplicate before adding
                                const alreadyExists = draft.some((conv) => conv.id == data?.data?.id);
                                if (!alreadyExists) {
                                    draft.unshift(data.data);
                                }
                            }
                        });

                    });
                } catch (error) { }
                await cacheEntryRemoved;
                socket.close(); // Close the socket connection when the cache entry is removed
            }
        }),

        // Fetch specific conversation between two users
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&participants_like=${participantEmail}-${userEmail}`,
        }),

        // Add a new conversation
        addConversation: builder.mutation({
            query: ({ sender, data }) => ({
                url: "/conversations",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: conversation } = await queryFulfilled;

                    if (conversation?.id) {
                        //optimistically update the conversation end
                        const users = arg.data.users;
                        const senderUser = users.find((user) => user.email === arg.sender);
                        const receiverUser = users.find((user) => user.email !== arg.sender);

                        // silent entry to message table
                        dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp,
                            })
                        );
                    }
                } catch (error) {
                    console.error("Error adding conversation or dispatching message:", error);
                }
            },
        }),

        // Edit existing conversation
        editConversation: builder.mutation({
            query: ({ id, data, sender }) => ({
                url: `/conversations/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                //optimistically update the conversation start
                const pathResult = dispatch(apiSlice.util.updateQueryData("getConversations", arg.sender, (draft) => {
                    const draftConversation = draft.find((conv) => conv.id == arg.id);
                    if (draftConversation) {
                        draftConversation.message = arg.data.message;
                        draftConversation.timestamp = arg.data.timestamp;
                    }
                }));
                //optimistically update the conversation end

                try {
                    const conversation = await queryFulfilled;
                    if (conversation?.data?.id) {
                        // silent entry to message table
                        const users = arg.data.users;
                        const senderUser = users.find(
                            (user) => user.email === arg.sender
                        );
                        const receiverUser = users.find(
                            (user) => user.email !== arg.sender
                        );

                        const res = await dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp,
                            })
                        ).unwrap();
                        dispatch(apiSlice.util.updateQueryData(
                            "getMessages",
                            res.conversationId.toString(),
                            (draft) => {
                                draft.push(res);
                            }
                        ));
                    }
                } catch (error) {
                    pathResult.undo(); // rollback optimistic update
                    console.error("Error editing conversation or dispatching message:", error);
                }
            },
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation,
    useEditConversationMutation,
} = conversationsApi;
