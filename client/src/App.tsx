import { useEffect } from 'react';
import { useLocation, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ItemDetails from './components/ItemDetails';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import Navbar from './components/Navbar';

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
          <Route path='/home' element={<Home />} />
          <Route path='/item/:itemId' element={<ItemDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/success' element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
