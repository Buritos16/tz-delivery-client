import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "@reduxjs/toolkit";
import {actions as menuActions} from "../store/menu/menu.slice.ts";
import {actions as cartActions} from "../store/cart/cart.slice.ts";


const rootActions = {
    ...menuActions,
    ...cartActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}