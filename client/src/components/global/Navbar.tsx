import { useAppDispatch, useAppSelector } from '../../state/store';
import { useNavigate } from 'react-router-dom';
import { IconButton, Box, Badge } from '@mui/material';
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined
} from '@mui/icons-material';
import { shades } from '../../theme';
import { setIsCartOpen } from '../../state/cartReducer';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);

  return (
    <Box
      display='flex'
      alignItems='center'
      bgcolor='rgba(255, 255, 255, 0.8)'
      width='100%'
      height='60px'
      color='black'
      position='fixed'
      top='0'
      left='0'
      zIndex='1'
      border='solid black 1px'
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        width='80%'
        border='solid black 1px'
        margin='auto'
      >
        <Box
          color={shades.secondary[500]}
          onClick={() => navigate('/')}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          Ecommerce
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          columnGap='20px'
          color={shades.secondary[500]}
          zIndex='2'
        >
          <IconButton sx={{ color: 'black' }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: 'black' }}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.cartItems.length}
            color='secondary'
            invisible={cart.cartItems.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                padding: '0 2px',
                top: '5px',
                right: '5px',
                height: '14px',
                minWidth: '14px'
              }
            }}
          >
            <IconButton onClick={() => dispatch(setIsCartOpen())} sx={{ color: 'black' }}>
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: 'black' }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
