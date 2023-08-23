import MainCarousel from './MainCarousel';
import ShoppingList from './ShoppingList';

const Home = () => {
  console.log('🚀 ~ file: server.js:23 ~ STRAPI_HOST:', process.env.STRAPI_HOST);
  return (
    <div className='home'>
      <MainCarousel />
      <ShoppingList />
    </div>
  );
};

export default Home;
