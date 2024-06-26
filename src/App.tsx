import React from 'react';
import axios from 'axios';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './AppContext';
import Orders from './pages/Orders';

function App() {
  const [BasketOpen, setBasketOpened] = React.useState(false);
  const [products, setProducts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [favorite, setFavorite] = React.useState<any[]>([]);
  const [cartProducts, setCartProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (BasketOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    async function fetchData() {
      const cartResponce = await axios.get('https://65a7c5a394c2c5762da7817d.mockapi.io/cart');
      const favoriteResponce = await axios.get('https://65aa1b5e081bd82e1d961920.mockapi.io/favorite');
      const productsResponce = await axios.get('https://65a7c5a394c2c5762da7817d.mockapi.io/products');

      setIsLoading(false);

      setCartProducts(cartResponce.data);
      setFavorite(favoriteResponce.data);
      setProducts(productsResponce.data);
    }
    fetchData();
  }, [BasketOpen]);

  const onFavorite = async (obj: any) => {
    try {
      const existingProduct = favorite.find((prodObj: { prod_id: any; }) => Number(prodObj.prod_id) === Number(obj.prod_id));
      if (existingProduct) {
        await axios.delete(`https://65aa1b5e081bd82e1d961920.mockapi.io/favorite/${existingProduct.id}`);
        setFavorite((prev: any) => prev.filter((prodObj: { prod_id: any; }) => prodObj.prod_id !== obj.prod_id));
      } else {
        const { data } = await axios.post('https://65aa1b5e081bd82e1d961920.mockapi.io/favorite', obj);
        setFavorite((prev: any) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить товар в корзину');
    }
  };

  const onCart = async (obj: any) => {
    try {
      const existingProduct = cartProducts.find((prodObj: { prod_id: any; }) => Number(prodObj.prod_id) === Number(obj.prod_id));
      if (existingProduct) {
        await axios.delete(`https://65a7c5a394c2c5762da7817d.mockapi.io/cart/${existingProduct.id}`);
        setCartProducts((prev: any) => prev.filter((prodObj: { prod_id: any; }) => prodObj.prod_id !== obj.prod_id));
      } else {
        const { data } = await axios.post('https://65a7c5a394c2c5762da7817d.mockapi.io/cart', obj);
        setCartProducts((prev: any) => [...prev, data]);
      }
    } catch (error) {

      alert('Не удалось добавить товар в корзину');
    }
  };

  const isAddedProduct = (id: any) => {
    return cartProducts.find((prodObj: { prod_id: any; }) => Number(prodObj.prod_id) === Number(id));
  }

  const isAddedFavorite = (id: any) => {
    return favorite.find((prodObj: { prod_id: any; }) => Number(prodObj.prod_id) === Number(id));
  }

  return (
    <AppContext.Provider value={{ products, favorite, cartProducts, setCartProducts, isAddedProduct, setBasketOpened, isAddedFavorite }}>
      <section className="App" >
        {
          BasketOpen ?
            <Drawer
              setCartProducts={setCartProducts}
              onCart={onCart}
            />
            : null
        }
        <Header />

        <Routes>
          <Route
            path='/'
            element={
              <Home
                onFavorite={onFavorite}
                onCart={onCart}
                setCartProducts={setCartProducts}
                setFavorite={setFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path='/favorites'
            element={
              <Favorites
                onCart={onCart}
                onFavorite={onFavorite}
              />
            }
          />
          <Route
            path='/orders'
            element={
              <Orders
                onCart={onCart}
                onFavorite={onFavorite}
              />
            }
          />
        </Routes>
      </section >
    </AppContext.Provider >
  );
}

export default App;
