import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/store';
import {
  IconButton,
  Box,
  useMediaQuery,
  Divider,
  Typography,
  Button,
  Tab,
  Tabs
} from '@mui/material';
// import { getItems } from '../../api/itemsApi';
import { setItems } from '../../state/cartReducer';
import Item from '../Item';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { shades } from '../../theme';
import { fetchItems } from '../../api/itemsApi';

export interface IShoppingList {}

const ShoppingList = (props: IShoppingList) => {
  const [value, setValue] = useState('all');
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  console.log('🚀 ~ file: ShoppingList.tsx:25 ~ ShoppingList ~ items:', items);

  useEffect(() => {
    // const getIt = async () => {
    //   const items = await fetch(`${process.env.STRAPI_HOST}/api/items?populate=image`, {
    //     method: 'GET'
    //   });
    //   const json = await items.json();
    //   console.log('🚀 ~ file: ShoppingList.tsx:34 ~ getIt ~ json:', json.data);
    //   dispatch(setItems(json.data));
    // };
    const loadItems = async () => {
      const json = await fetchItems();
      dispatch(setItems(json));
    };
    loadItems();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box width='80%' margin='90px auto'>
        <Typography variant='h3' textAlign='center'>
          Our Featured products: {items.length};
        </Typography>
      </Box>
      <Box>
        {items.length > 0 &&
          items.map((item, index) => (
            <Box key={`itemlist-image-${index}-${Math.floor(Math.random() * 10000)}`}>
              {item.attributes.name}
            </Box>
          ))}
      </Box>
      {/* <Tabs
        onChange={handleChange}
        textColor='primary'
        indicatorColor='primary'
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap'
          }
        }}
      >
        <Tab label='ALL' value='all'></Tab>
        <Tab label='NEW ARRIVALS' value='newArrivals'></Tab>
        <Tab label='BEST SELLERS' value='bestSellers'></Tab>
        <Tab label='TOP RATED' value='topRated'></Tab>
      </Tabs> */}
    </Box>
  );
};

export default ShoppingList;
