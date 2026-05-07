import { apiSlice } from './apiSlice';

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<any[], void>({
      query: () => '/api/chat/conversations',
      providesTags: ['Chat'],
    }),
    getMessages: builder.query<any[], string>({
      query: (conversationId) => `/api/chat/conversations/${conversationId}/messages`,
      providesTags: (result, error, id) => [{ type: 'Chat', id }],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: '/api/chat/messages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),
    createConversation: builder.mutation({
      query: (data) => ({
        url: '/api/chat/conversations',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useCreateConversationMutation,
} = chatApi;
