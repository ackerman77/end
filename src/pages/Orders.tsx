import React from 'react';
import styles from '../components/Catalog/Catalog.module.scss';
import Product from "../components/Product";
import Button from '../components/Button/';
import AppContext from '../AppContext'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Orders({ onCart, onFavorite }: any) {
    const [order, setOrder] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get('')
            setOrder(data.map((obj: { cartProducts: any; }) => obj.cartProducts).flat());
        }
        fetchData();
    }, [])

    return (
        <section className={styles.catalog}>
            <div className={styles.catalog__container}>
                <h2 className={styles.catalog__title}>
                    Мои заказы
                </h2>
                {
                    order.length > 0 ? (
                        <div className={styles.catalog__content}>
                            {order.map((product: { id: any, title: any; img: any; price: any; }) => (
                                <Product
                                    // key={product.id}
                                    onFavorite={() => onFavorite(product)}
                                    onCart={(obj: any) => onCart(obj)}
                                    {...product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.nullFavorite}>
                            <img
                                src='/assets/icons/smileFav.svg'
                                alt='smileFav'
                                width={70}
                                height={70}
                                className={styles.nullFavorite__img}
                            />
                            <p className={styles.nullFavorite__title}>
                                Заказов нет
                            </p>
                            <p className={styles.nullFavorite__text}>
                                Вы ничего не покупали
                            </p>
                            <Link to='/'>
                                <Button text='Вернуться назад' className={styles.nullFavorite__btn} />
                            </Link>
                        </div>
                    )
                }
            </div >
        </section >
    );
}

export default Orders;