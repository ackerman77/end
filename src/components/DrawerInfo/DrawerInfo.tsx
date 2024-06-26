import React from 'react'
import Button from '../Button'
import styles from './DrawerInfo.module.scss'
import AppContext from '../../AppContext';

const DrawerInfo = ({ title, description, img }: any) => {
    const { setBasketOpened } = React.useContext(AppContext);

    return (
        <div className={styles.nullBasket}>
            <img
                src={img}
                alt="nullBasket"
                width={120}
                height={120}
                className={styles.nullBasket__img}
            />
            <p className={styles.nullBasket__title}>
                {title}
            </p>
            <p className={styles.nullBasket__text}>
                {description}
            </p>
            <Button text='Вернуться назад' className={styles.nullBasket__btn} onClick={() => setBasketOpened(false)} />
        </div>
    )
}

export default DrawerInfo