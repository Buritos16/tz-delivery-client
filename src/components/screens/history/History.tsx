import style from './History.module.css'
import {useState} from "react";
import {useGetOrdersQuery} from "../../../store/api/api.ts";
import {IProduct} from "../../../types/products.types.ts";
import Product from "../../menuProduct/Product.tsx";

const History = () => {

    const [email, setEmail] = useState<string>('romatypylo21@gmail.com')
    const [phone, setPhone] = useState<string>('0974845422')
    const [orderParams, setOrderParams] = useState({
        email: '',
        phone: ''
    })

    const {isLoading, data} = useGetOrdersQuery(orderParams)

    const handleSubmitFind = () => {
        setOrderParams({email: email, phone: phone})


    }

    if (isLoading) return <div>Loading...</div>
    return (
        <div className={style.history}>
            <div className={style.historyForm}>
                <div className={style.inputForm}>
                    <label>Email:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={style.inputForm}>
                    <label>Phone:</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button
                    className={style.button}
                    onClick={handleSubmitFind}
                >
                    Find
                </button>
            </div>
            <div className={style.orders}>
                {data?.map(({order, orderSum, _id, name, phone}) => (
                    <div key={_id} className={style.order}>
                        <div className={style.sum}>
                            <div>{name}</div>
                            <div>{phone}</div>
                            <h3>{orderSum} $</h3>
                        </div>
                        <div className={style.products}>
                            {order.map((product: IProduct) => (
                                <Product key={product._id} product={product} isHistory={true}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default History;
