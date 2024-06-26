import styles from './Product.module.scss';
import React from 'react';
import ContentLoader from "react-content-loader"
import AppContext from '../../AppContext';

function Product({ id, img, title, price, onFavorite, onCart, isLoading, prod_id=id }: any) {
    const { isAddedProduct, isAddedFavorite } = React.useContext(AppContext);

    const onBasket = () => {
        onCart({ id, img, title, price, prod_id });
    }

    const Favorite = () => {
        onFavorite({ id, img, title, price, prod_id });
    }

    return (
        <section className={styles.product}>
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width={150}
                    height={200}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="5" y="36" rx="10" ry="10" width="136" height="46" />
                    <rect x="5" y="93" rx="0" ry="0" width="136" height="13" />
                    <rect x="34" y="142" rx="0" ry="0" width="36" height="1" />
                    <rect x="5" y="115" rx="0" ry="0" width="82" height="13" />
                    <rect x="3" y="147" rx="0" ry="0" width="72" height="23" />
                    <rect x="91" y="144" rx="8" ry="8" width="29" height="29" />
                </ContentLoader>
            ) : (
                <>
                    <img
                        src={isAddedFavorite(prod_id) ? '/assets/icons/like.svg' : '/assets/icons/notLike.svg'}
                        alt="notLike"
                        width={32}
                        height={32}
                        className={styles.product__likeIcon}
                        onClick={Favorite}
                    />
                    <img
                        src={img}
                        alt='PC'
                        width={133}
                        height={112}
                        className={styles.product__img}
                    />
                    <h3 className={styles.product__title}>
                        {title}
                    </h3>
                    <div className={styles.product__priceBlock}>
                        <img
                            src={isAddedProduct(id) ? '/assets/icons/add.svg' : '/assets/icons/notAdd.svg'}
                            alt="Add"
                            width={32}
                            height={32}
                            className={styles.product__addIcon}
                            onClick={onBasket}
                        />
                        <p className={styles.product__text}>
                            Цена:
                        </p>
                        <p className={styles.product__price}>
                            {price} руб.
                        </p>
                    </div>
                </>
            )
            }
        </section >
    );
}

export default Product;
