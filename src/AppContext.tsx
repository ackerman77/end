import React from 'react';

interface AppContextType {
    favorite: any[];
    products: any[];
    cartProducts: any[];
    setCartProducts: any;
    isAddedProduct: any;
    setBasketOpened: any;
    isAddedFavorite: any;
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export default AppContext;