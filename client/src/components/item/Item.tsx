import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IItem } from '../global/Types';
import { useAppDispatch } from '../../state/store';
import { IconButton, Box, useTheme, Typography, Button } from '@mui/material';
import { shades } from '../../theme';
import { addToCart } from '../../state/cartReducer';

const Item = ({ item }: IItem) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const theme = useTheme();

  const { name, price, image, category } = item.attributes;
  const imageUrl = image?.data?.attributes?.formats?.medium?.url;

  return (
    <Box>
      <Box position='relative'>
        <img
          alt={item.name}
          width='300px'
          height='500px'
          src={`http://localhost:1337${imageUrl}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: 'pointer' }}
        />
      </Box>
      <Box
        marginTop='3px'
        width='100%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        rowGap='10px'
        columnGap='clamp(20px,30px,40px)'
      >
        <Box>
          <Typography color={shades.primary[300]}>
            {/* capitalize first letter */}
            {category.charAt(0).toUpperCase() + category.replace(/([A-Z])/g, ' $1').slice(1)}
          </Typography>
          <Typography>{name}</Typography>
          <Typography fontWeight='bold'>Price: ${price}</Typography>
        </Box>
        <Box margin='auto' display='flex' justifyContent='space-between'>
          {/* amount */}
          <Box display='flex' alignItems='center' bgcolor={shades.neutral[400]} borderRadius='3px'>
            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography color={shades.primary[300]}>{count}</Typography>
            <IconButton onClick={() => setCount(Math.max(count + 1, 1))}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box>
            <Button
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              sx={{
                backgroundColor: shades.primary[300],
                color: 'white'
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
