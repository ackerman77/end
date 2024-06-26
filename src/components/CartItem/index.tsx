import styles from './CartItem.module.scss';

function CartItem({ id, img, title, price, onCart, prod_id=id }: any) {
    const onBasket = () => {
        onCart({ id, img, title, price, prod_id });
    }

    return (
        <li className={styles.cart__item}>
            <img
                src={img}
                alt='Sneaker'
                width={70}
                height={70}
                className={styles.cart__img}
            />
            <h3 className={styles.cart__title}>
                {title}
            </h3>
            <p className={styles.cart__price}>
                {price} руб.
            </p>
            <img
                src='/assets/icons/cross.svg'
                alt='Сross'
                width={32}
                height={32}
                className={styles.cart__cross}
                onClick={onBasket}
            />
        </li>
    )
}

export default CartItem;
