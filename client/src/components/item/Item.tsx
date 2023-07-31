import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppDispatch } from '../../state/store';
import { IconButton, Box, useTheme, Typography, Button } from '@mui/material';
import { shades } from '../../theme';
import { addToCart } from '../../state/cartReducer';

export interface IImage {
  data?: {
    attributes?: {
      url?: string;
      formats?: { medium?: { url?: string } };
    };
  };
}

export interface IItemAttributes {
  attributes: {
    name: string;
    price: number;
    image: IImage;
    category: string;
  };
  name: string;
  id: string;
}

export interface IItem {
  item: IItemAttributes;
  // width: string;
}

const Item = ({ item }: IItem) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const { name, price, image, category } = item.attributes;
  const imageUrl = image?.data?.attributes?.formats?.medium?.url;

  return (
    <Box>
      <Box
        position='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.name}
          width='300px'
          height='500px'
          src={`http://localhost:1337${imageUrl}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'block' : 'none'}
          position='absolute'
          bottom='10%'
          left='0'
          width='100%'
          padding='0 5%'
        >
          <Box display='flex' justifyContent='space-between'>
            {/* amount */}
            <Box
              display='flex'
              alignItems='center'
              bgcolor={shades.neutral[400]}
              borderRadius='3px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(Math.max(count + 1, 1))}>
                <AddIcon />
              </IconButton>
            </Box>
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
      <Box marginTop='3px'>
        <Typography variant='subtitle2' color={shades.neutral[400]}>
          {/* capitalize first letter */}
          {category.replace(/([A-Z])/g, ' $1').replace(/ˆ./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight='bold'>{price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
