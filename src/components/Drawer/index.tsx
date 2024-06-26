import styles from './Drawer.module.scss';
import CartItem from '../CartItem';
import Button from '../Button';
import React from 'react';
import AppContext from '../../AppContext';
import DrawerInfo from '../DrawerInfo/DrawerInfo';
import axios from 'axios';

function Drawer({ onCart }: any) {
    const [isOrder, setIsOrder] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const { cartProducts, setBasketOpened, setCartProducts } = React.useContext(AppContext);

    const price = cartProducts.reduce((sum, obj) => obj.price + sum, 0);
    const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

    const isOrderComplete = async () => {
        try {
            const { data } = await axios.post('https://65aa1b5e081bd82e1d961920.mockapi.io/order', { cartProducts });
            setOrderId(data.id);
            setIsOrder(true);
            setCartProducts([]);

            for (let i = 0; i < cartProducts.length; i++) {
                const item = cartProducts[i];
                await axios.delete('https://65a7c5a394c2c5762da7817d.mockapi.io/cart/' + item.id);
                await delay(1000);
            }

        } catch (error) {
            alert('Не удалось создать заказ!')
        }
    }

    return (
        <section className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className={`${styles.drawer__title} ${styles.cross}`} onClick={() => setBasketOpened(false)}>Корзина</h2>
                {
                    cartProducts.length > 0 ? (
                        <>
                            <ul className={styles.cards__list}>
                                {cartProducts.map((item: any) => (
                                    <CartItem
                                        key={item.id}
                                        onCart={(obj: any) => onCart(obj)}
                                        {...item}
                                    />
                                ))}
                            </ul>
                            <ul className={styles.drawer__priceBlock}>
                                <li className={styles.price__item}>
                                    <p className={styles.price__text}>
                                        Итого:
                                    </p>
                                    <div className={styles.gray__line}></div>
                                    <p className={styles.price__textPrice}>
                                        {price} руб.
                                    </p>
                                </li>
                                <li className={styles.price__item}>
                                    <p className={styles.price__text}>
                                        Налог 5%:
                                    </p>
                                    <div className={styles.gray__line}></div>
                                    <p className={styles.price__textPrice}>
                                        {Math.round(price / 100 * 5)} руб.
                                    </p>
                                </li>
                                <li className={styles.price__item}>
                                    <Button onClick={isOrderComplete} text='Оформить заказ' className={styles.price__btn} />
                                </li>
                            </ul>
                        </>
                    ) : (
                        <DrawerInfo
                            title={isOrder ? 'Заказ оформлен!' : 'Корзина пустая'}
                            description={
                                isOrder
                                    ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке`
                                    : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                            }
                            img={isOrder ? '/assets/icons/order.svg' : '/assets/icons/nullBasket.svg'}
                        />
                    )}
            </div>
        </section >
    );
}

export default Drawer;
