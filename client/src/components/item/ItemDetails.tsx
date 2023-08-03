import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppDispatch } from '../../state/store';
import { IconButton, Box, useTheme, Typography, Button, Tab, Tabs } from '@mui/material';
import { shades } from '../../theme';
import { addToCart } from '../../state/cartReducer';
import { IImage, IItemAttributes, IItem } from '../global/Types';
import Item from './Item';
import { fetchItem, fetchItems } from '../../api/itemsApi';

const ItemDetails = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState();
  const { itemId } = useParams();
  const [count, setCount] = useState(1);
  const [item, setItem] = useState<IItemAttributes>();
  const [items, setItems] = useState<IItem[]>([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadItem = async () => {
      console.log('🚀 ~ itemId:::::::', itemId);
      const json = await fetchItem(itemId);
      console.log('🚀 ~ file: ============', json);
      setItem(await fetchItem(itemId));
    };
    loadItem();
  }, [itemId]);

  console.log('🚀 ~ file: ItemDetails.tsx:33 ~ ItemDetails ~ ITEM>>>>>>>>>>>>:', item);
  const attributes = item?.attributes;
  const imageUrl = attributes?.image?.data?.attributes?.formats?.medium?.url;

  return (
    <Box width='80%' m='80px auto'>
      <Box>
        {/* Image */}
        <Box mt='40px'>
          IMG:{imageUrl}
          <img width='100%' height='100%' src={`http://localhost:1337${imageUrl}`} />
        </Box>
        {/* Actions */}
        <Box>
          <Box display='flex' justifyContent='space-between'>
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h3'>{attributes?.name}</Typography>
            <Typography>${attributes?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>${attributes?.price}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
