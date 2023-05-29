import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IOrder, IProduct} from "../../types/products.types.ts";

const API_URL = import.meta.env.VITE_API_URL

type argsEmailPhone = {
    email: string
    phone: string
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: builder => ({
        getProducts: builder.query<IProduct[], null>({
            query: () => 'menu/products'
        }),
        addOrder: builder.mutation({
            query: order => ({
                body: order,
                url: 'cart/order',
                method: 'POST'
            }),
        }),
        getOrders: builder.query<IOrder[], argsEmailPhone>({
            query: (arg) => {
                const {email, phone} = arg;
                return {
                    url: 'history/orders',
                    params: {email, phone},
                };
            },
        }),
    })
})

export const {useGetProductsQuery, useAddOrderMutation, useGetOrdersQuery} = api