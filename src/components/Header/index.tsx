import React from 'react';
import AppContext from '../../AppContext';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

function Header() {
    const { setBasketOpened, cartProducts } = React.useContext(AppContext);
    const price = cartProducts.reduce((sum, obj) => obj.price + sum, 0)

    return (
        <section className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__logoBlock}>
                    <Link to='/'>
                        <img
                            src='/assets/icons/loga.jpg'
                            alt='logo'
                            width={40}
                            height={40}
                            className={styles.header__logo}
                        />
                        <h1 className={styles.header__title}>
                            ТехноМаркет
                        </h1>
                        <p className={styles.header__text}>
                            Магазин ПК и мобильных телефонов
                        </p>
                    </Link>
                </div>
                <ul className={styles.header__list}>
                    <li className={styles.header__item} onClick={() => setBasketOpened(true)}>
                        <img
                            src='/assets/icons/basket.svg'
                            alt="Basket"
                            width={18}
                            height={18}
                            className={styles.header__icon}
                        />
                        <p className={styles.header__iconText}>
                            {price} руб.
                        </p>
                    </li>
                    <li>
                        <Link to='/favorites' className={styles.header__item}>
                            <img
                                src='/assets/icons/bookmarks.svg'
                                alt="Bookmarks"
                                width={18}
                                height={18}
                                className={styles.header__icon}
                            />
                            <p className={styles.header__iconText}>
                                Закладки
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/orders' className={styles.header__item}>
                            <img
                                src='/assets/icons/profile.svg'
                                alt="Profile"
                                width={18}
                                height={18}
                                className={styles.header__icon}
                            />
                            <p className={styles.header__iconText}>
                                Профиль
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Header;
