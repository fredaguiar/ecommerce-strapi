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
import Item from '../item/Item';
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
          Our Featured products ({items.length})
        </Typography>
      </Box>
      <Tabs
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
      </Tabs>
      <Box
        margin='0 auto'
        display='grid'
        gridTemplateColumns='repeat(auto-fill, 300px)'
        justifyContent='space-around'
        rowGap='20px'
        columnGap='1.33%'
      >
        {value === 'all' &&
          items.map((item) => <Item item={item} key={`${item.name}-${item.id}`} />)}
        {value !== 'all' &&
          items
            .filter((item) => item.attributes.category === value)
            .map((item) => <Item item={item} key={`${item.name}-${item.id}`} />)}
      </Box>
    </Box>
  );
};

export default ShoppingList;
