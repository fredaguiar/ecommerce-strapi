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
  Tabs,
} from '@mui/material';
import { setItems } from '../../state/cartReducer';
import Item from '../Item';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { shades } from '../../theme';

export interface IShoppingList {}

const ShoppingList = (props: IShoppingList) => {
  const [value, setValue] = useState('all');
  const isNonMobile = useMediaQuery('(min-width:600px)');
  // const items = useAppSelector((state) => state.cart.items);
  // console.log('🚀 ~ file: ShoppingList.tsx:25 ~ ShoppingList ~ items:', items);
  const dispatch = useAppDispatch();

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return <Box>ssssss</Box>;
};

export default ShoppingList;
