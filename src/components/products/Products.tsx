import {useGetProductsQuery} from "../../store/api/api.ts";
import {IProduct} from "../../types/products.types.ts";
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import style from './Products.module.css'
import Product from "../menuProduct/Product.tsx";

const Products = () => {

    const {isLoading, data} = useGetProductsQuery(null)
    const selectedShop = useTypedSelector(state => state.menuReducer.selectedShop)


    if (isLoading) return <div>Loading...</div>
    return (
        <div className={style.products}>
            {data?.filter((product) =>
                product?.restaurant === selectedShop
            )?.map((product: IProduct) => (
                <Product key={product._id} product={product}/>
            ))}
        </div>
    );
};
export default Products;
