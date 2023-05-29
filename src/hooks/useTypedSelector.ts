import {RootState} from "../store/store.ts";
import {TypedUseSelectorHook, useSelector} from "react-redux";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector