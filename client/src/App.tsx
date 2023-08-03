import { useEffect } from 'react';
import { useLocation, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import ItemDetails from './components/item/ItemDetails';
import Checkout from './components/checkout/Checkout';
import Confirmation from './components/checkout/Confirmation';
import Navbar from './components/global/Navbar';
import CartMenu from './components/global/CartMenu';
import Footer from './components/global/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/item/:itemId' element={<ItemDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/success' element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
