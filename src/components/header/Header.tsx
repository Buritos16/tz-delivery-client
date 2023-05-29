import {Link} from "react-router-dom";
import style from './Header.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";

const Header = () => {

    const cart = useTypedSelector(state => state.cartReducer)

    return (
        <nav className={style.header}>
            <Link to='/menu/products'>Shop</Link>
            <Link to='/cart/products'>
                <div style={{display: "flex", gap: '0.5rem'}}>
                    Shopping cart
                    <div className={style.cart}
                         style={cart.length ? {} : {color: 'rgb(248, 244, 235, 0.9)'}}
                    >
                        {cart.length}
                    </div>
                </div>
            </Link>
            <Link to='/history'>History</Link>
        </nav>
    );
};
export default Header;
