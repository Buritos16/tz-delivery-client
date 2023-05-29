import {useTypedSelector} from "../../../hooks/useTypedSelector.ts";
import {IProduct} from "../../../types/products.types.ts";
import Product from "../../menuProduct/Product.tsx";
import style from './Cart.module.css'
import {useAddOrderMutation} from "../../../store/api/api.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {useActions} from "../../../hooks/useActions.ts";
import ReCAPTCHA from "react-google-recaptcha";
import {useState} from "react";

type FormValues = {
    name: string
    email: string
    phone: string
    address: string
};

const Cart = () => {

    const [captcha, setCaptcha] = useState(false)
    const {clearCart} = useActions()
    const cart = useTypedSelector(state => state.cartReducer)
    const [addOrder, {data, isLoading}] = useAddOrderMutation()

    let cartSum = 0

    cart.forEach((el) => {
        const count = el.count ? el.count : 1
        cartSum += Number((el.price * count).toFixed(2))
    })


    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
        },
        mode: "all"
    });

    const submitForm: SubmitHandler<FormValues> = async (values) => {
        await addOrder({
            ...values,
            order: cart,
            orderSum: Number(cartSum.toFixed(2))
        })
        clearCart()
        localStorage.setItem('cart', JSON.stringify([]))
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <div className={style.cartContainer}>
            {data?.orderCreated
                ?
                <div className={style.created}>
                    <h3>Your order successfully created!</h3>
                    <div style={{display: "flex", alignItems: 'center', gap: '1rem'}}>
                        <h4>Order id: </h4>
                        <p className={style.orderId}>
                            {data?.id}
                        </p>
                    </div>
                </div>
                :
                <div className={style.cart}>
                    <form className={style.cartForm} onSubmit={handleSubmit(submitForm)}>
                        <div className={style.form}>
                            <div className={style.formEl}>
                                <label>Name:</label>
                                <input
                                    placeholder='Tom'
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                />
                                <div className={style.errors}>{errors?.name &&
                                    <div>
                                        {errors?.name?.message}
                                    </div>}
                                </div>
                            </div>
                            <div className={style.formEl}>
                                <label>Email:</label>
                                <input
                                    placeholder='Enter your email'
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value:
                                                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: 'Please enter valid email'
                                        }
                                    })}
                                />
                                <div className={style.errors}>{errors?.email &&
                                    <div>
                                        {errors?.email?.message}
                                    </div>}
                                </div>
                            </div>
                            <div className={style.formEl}>
                                <label>Phone:</label>
                                <input
                                    placeholder='+380123456789'
                                    {...register('phone', {
                                        required: 'Phone is required',
                                    })}
                                />
                                <div className={style.errors}>{errors?.phone &&
                                    <div>
                                        {errors?.phone?.message}
                                    </div>}
                                </div>
                            </div>
                            <div className={style.formEl}>
                                <label>Address</label>
                                <input
                                    placeholder='Stusa 8/24'
                                    {...register('address', {
                                        required: 'Address is required',
                                    })}
                                />
                                <div className={style.errors}>{errors?.address &&
                                    <div>
                                        {errors?.address?.message}
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                            onChange={() => setCaptcha(true)}
                        />
                        <button
                            className={style.submit}
                            type='submit'
                            disabled={cart.length === 0 || !isValid || !captcha}
                        >
                            Make an order
                        </button>
                        <div className={style.price}>
                            Total price: {cartSum.toFixed(2)} $
                        </div>
                    </form>
                    <div className={style.products}>
                        {cart.map((product: IProduct) => (
                            <Product key={product._id} product={product} isCart={true}/>
                        ))}
                    </div>

                </div>
            }
        </div>
    );


};
export default Cart;
