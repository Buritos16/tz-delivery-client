import Shops from "../../shops/Shops.tsx";
import Products from "../../products/Products.tsx";
import style from './Menu.module.css'


const Menu = () => {

    return (
        <div className={style.menu}>
            <Shops />
            <Products />
        </div>
    );
};
export default Menu;
