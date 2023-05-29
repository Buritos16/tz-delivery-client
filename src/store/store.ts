import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {api} from "./api/api.ts";
import {reducer as menuReducer} from "./menu/menu.slice.ts";
import {reducer as cartReducer} from "./cart/cart.slice.ts";


const reducers = combineReducers({
    [api.reducerPath]: api.reducer,
    menuReducer,
    cartReducer,
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>