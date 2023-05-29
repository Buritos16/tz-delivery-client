import {useEffect} from "react";
import {useTypedSelector} from "./hooks/useTypedSelector.ts";
import {useActions} from "./hooks/useActions.ts";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Menu from "./components/screens/menu/Menu.tsx";
import Cart from "./components/screens/cart/Cart.tsx";
import Header from "./components/header/Header.tsx";
import History from "./components/screens/history/History.tsx";

function App() {

    const {setCartFromLocalStorage, setSelectedShop} = useActions()
    const cart = useTypedSelector(state => state.cartReducer)
    const shop = useTypedSelector(state => state.menuReducer.selectedShop)


    useEffect(() => {
        if (localStorage.getItem('cart') !== null && localStorage.getItem('shop') !== null) {
            const cart = JSON.parse(localStorage.getItem('cart') || '');
            const shop = JSON.parse(localStorage.getItem('shop') || '');
            setCartFromLocalStorage(cart);
            setSelectedShop(shop)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('shop', JSON.stringify(shop));
    }, [cart, shop]);

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Navigate to='/menu/products' replace/>}/>
                    <Route path='/menu/products' element={<Menu/>}/>
                    <Route path='/cart/products' element={<Cart/>}/>
                    <Route path='/history' element={<History />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
