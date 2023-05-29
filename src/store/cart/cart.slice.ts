import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types/products.types.ts";

const initialState: Array<IProduct> = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: undefined,
    reducers: {
        addProductToCart: (state, {payload: product}: PayloadAction<IProduct>) => {
            state.push({...product, count: 1})
        },
        removeProductFromCart: (state, {payload: id}: PayloadAction<string>) => {
            return state.filter(product => product._id !== id)
        },
        addProductCount: (state, {payload: id}: PayloadAction<string>) => {
            const product = state.find((el) => el._id === id)
            if (product) {
                product.count ? product.count += 1 : null
            }
        },
        removeProductCount: (state, {payload: id}: PayloadAction<string>) => {
            const product = state.find((el) => el._id === id)
            if (product) {
                product.count ? product.count -= 1 : null
            }
        },
        clearCart: (state) => {
            state.length = 0
        },
        setCartFromLocalStorage: (state, {payload: cart}: PayloadAction<IProduct[]>) => {
            state.splice(0, state.length, ...cart);
        }
    }
})

export const {reducer, actions} = cartSlice