import React from 'react';
import Catalog from '../components/Catalog';

function Home({ cartProducts, setCartProducts, onFavorite, onCart, isLoading }: any) {
    return (
        <>
            
            <Catalog
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                onFavorite={onFavorite}
                onCart={onCart}
                isLoading = {isLoading}
            />
        </>
    );
}

export default Home;