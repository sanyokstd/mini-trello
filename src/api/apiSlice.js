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
        updateColumnNotRender: builder.mutation({
            query: ({colId, newCol}) => {
                console.log('1')
                return {
                    url: `/columns/${colId}`,
                    method: 'PUT',
                    body: newCol
                }
            },
        }),
        updateColumn: builder.mutation({
            query: ({colId, newCol}) => {
                console.log('2')
                return {
                    url: `/columns/${colId}`,
                    method: 'PUT',
                    body: newCol
                }
            },
            invalidatesTags: ['Columns']
        }),
        
    }),
})

export const {useGetColumnsQuery, useAddColumnsMutation, useDeleteColMutation, useUpdateColumnMutation, useUpdateColumnNotRenderMutation} = apiSlice