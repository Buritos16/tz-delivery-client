import {IProduct} from "../../types/products.types.ts";
import {useActions} from "../../hooks/useActions.ts";
import style from './Product.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";

type Props = {
    product: IProduct
    isCart?: boolean
    isHistory?: boolean
};
const Product = ({product, isCart = false, isHistory = false}: Props) => {

    const {addProductToCart, removeProductFromCart, addProductCount, removeProductCount} = useActions()
    const cart = useTypedSelector(state => state.cartReducer)
    const isAdded = cart.some(r => r._id === product._id)

    return (
        <div className={isHistory ? style.history : style.product} key={product._id}>
            <div className={style.productItem}>
                <h4 className={style.productName}>
                    {product.name}
                </h4>
                <p className={style.productDescription}>
                    {product.description}
                </p>
                <h4 className={style.productPrice}>
                    {product.price} $ {isHistory ? `X ${product.count}` : ''}
                </h4>
            </div>
            {!isHistory && <button
                className={style.productButton}
                onClick={() => {
                    isAdded ? removeProductFromCart(product._id) : addProductToCart(product)
                }}
            >
                {isAdded ? 'Remove from cart' : 'Add to cart'}
            </button>}
            {isCart &&
                <div className={style.buttons}>
                    Count:
                    <button
                        className={style.productButtons}
                        disabled={product.count === 1}
                        onClick={() => removeProductCount(product._id)}
                    >
                        -
                    </button>
                    <div className={style.count}>
                        {product.count}
                    </div>
                    <button
                        className={style.productButtons}
                        onClick={() => addProductCount(product._id)}
                    >
                        +
                    </button>
                </div>}
        </div>
    );
};
export default Product;
