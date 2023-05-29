import style from './Shops.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {useActions} from "../../hooks/useActions.ts";

const Shops = () => {

    const shops = useTypedSelector(state => state.menuReducer.shops)
    const cart = useTypedSelector(state => state.cartReducer)
    const selectedShop = useTypedSelector(state => state.menuReducer.selectedShop)
    const {setSelectedShop} = useActions()

    const isDisabled = cart.length !== 0

    return (
        <div className={style.shops}>
            {shops.map((el) => (
                <button
                    disabled={isDisabled && selectedShop !== el}
                    className={style.shop}
                    key={el}
                    style={selectedShop === el ? {backgroundColor: 'black', color: 'white'} : {}}
                    onClick={() => {
                        setSelectedShop(el)
                    }}
                >
                    {el}
                </button>
            ))}
        </div>
    );
};
export default Shops;
