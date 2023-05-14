import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppSelector, useAppDispatch } from '../state/store';
import { IconButton, Box, Badge, Divider, Typography, Button } from '@mui/material';
import { shades } from '../theme';
import { setIsCartOpen, decreaseCount, increaseCount, removeFromCart } from '../state/cartReducer';

const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const total = cart.cart.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);

  return (
    // Overlay
    <Box
      display={cart.isCartOpen ? 'block' : 'none'}
      bgcolor='rgba(0, 0, 0, 0.4)'
      alignItems='center'
      height='100%'
      width='100%'
      position='fixed'
      top='0'
      left='0'
      zIndex='10'
      overflow='auto'
    >
      {/* Modal */}
      <Box
        position='fixed'
        right='0'
        bottom='0'
        width='max(400px, 30%)'
        height='100%'
        bgcolor='white'
      >
        <Box padding='30px' overflow='auto' height='100%'>
          {/* header */}
          <FlexBox mb='15px'>
            <Typography variant='h3'>SHOPPING BAG ({cart.cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen())}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* items */}
          <Box>
            {cart.cart.map((item) => (
              <Box key={`${item.attribute.name}-${item.id}`}>
                <FlexBox padding='15px 0'>
                  <Box flex='1 1 40%'>
                    <img
                      width='130px'
                      height='170px'
                      alt={item?.name}
                      src={`http://localhost:1337/${item?.attributes?.image?.data?.attributes?.format?.medium?.url}`}
                    />
                  </Box>
                  <Box flex='1 1 60%'>
                    {/* Item name/description */}
                    <FlexBox mb='5px'>
                      <Typography fontWeight='bold'>{item.attribute.name}</Typography>
                      <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attribute.shortDescription}</Typography>
                    {/* // amount */}
                    <FlexBox margin='15px 0'>
                      <Box
                        display='flex'
                        alignItems='center'
                        border={`1px solid ${shades.primary[100]}`}
                      >
                        <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                          <AddIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                      </Box>
                      {/* price */}
                      <Typography fontWeight='bold'>{item.attribute.price}</Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* actions */}
          <Box margin='20px 0'>
            <FlexBox margin='20px 0'>
              <Typography fontWeight='bold'>SUBTOTAL</Typography>
              <Typography fontWeight='bold'>total</Typography>
            </FlexBox>
          </Box>
          <Box margin='20px 0'>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                borderRadius: 0,
                color: 'white',
                minWidth: '100%',
                padding: '20px 40px',
                margin: '20px 0',
              }}
              onClick={() => {
                navigate('/checkout');
                dispatch(setIsCartOpen());
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
