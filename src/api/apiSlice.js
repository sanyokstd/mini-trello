import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Columns'],
    endpoints: builder => ({
        getColumns: builder.query({
            query: () => '/columns',
            providesTags: ['Columns']
        }),
        addColumns: builder.mutation({
            query: col => ({
                url: '/columns',
                method: 'POST',
                body: col
            }),
            invalidatesTags: ['Columns']
        }),
        deleteCol: builder.mutation({
            query: id => ({
                url: `/columns/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Columns']
        }),
        getColumn: builder.query({
            query: (id) => `/columns/${id}`
        }),
        updateColumn: builder.mutation({
            query: ({colId, newCol}) => {
                return {
                    url: `/columns/${colId}`,
                    method: 'PUT',
                    body: newCol
                }
            },
            invalidatesTags: ['Columns']
        }),
        updateColumn2: builder.mutation({
            query: ({sourceCol, destinationCol}) => {
            console.log(sourceCol, destinationCol)
                // return {
                //     url: `/columns/${colId}`,
                //     method: 'PUT',
                //     body: newCol
                // }
            },
        }),
    }),
})

export const {useGetColumnsQuery, useAddColumnsMutation, useDeleteColMutation, useGetColumnQuery, useUpdateColumnMutation, useUpdateColumn2Mutation} = apiSlice