import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton, Box, Badge } from '@mui/material';
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { theme, shades } from '../theme';
import { setIsCartOpen } from '../state';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <Box
        display='flex'
        alignItems='center'
        height='60px'
        width='100%'
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
              // badgeContent={cart.length}
              color='secondary'
              // invisible={cart.length === 0}
              sx={{
                '& .MuiBadge-badge': {
                  padding: '0 2px',
                  top: '5',
                  right: '5',
                  height: '14px',
                  minWidth: '14px',
                },
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
    </div>
  );
};

export default Navbar;
