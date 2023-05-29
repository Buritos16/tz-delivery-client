import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMenu} from "../../types/products.types.ts";

const initialState: IMenu = {
    selectedShop: "Mcgregor's",
    shops: ["Mcgregor's", "FKC", "Buckstars", "Card's pizza"]
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    extraReducers: undefined,
    reducers: {
        setSelectedShop: (state, {payload: shop}: PayloadAction<string>) => {
            state.selectedShop = shop
        }
    }
})

export const {reducer, actions} = menuSlice