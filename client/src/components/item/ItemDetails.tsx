import { useState, useEffect, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch } from "../../state/store";
import {
  IconButton,
  Box,
  useTheme,
  Typography,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import { shades } from "../../theme";
import { addToCart } from "../../state/cartReducer";
import { IItem } from "../global/Types";
import Item from "./Item";
import { fetchItem, fetchItems } from "../../api/itemsApi";

const ItemDetails = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("description");
  const { itemId } = useParams();
  const [count, setCount] = useState(1);
  const [item, setItem] = useState<IItem>();
  const [items, setItems] = useState<IItem[]>([]);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadItem = async () => {
      setItem(await fetchItem(itemId as string));
    };
    const loadRelatedItems = async () => {
      setItems(await fetchItems());
    };
    loadItem();
    loadRelatedItems();
  }, [itemId]);

  const attributes = item?.attributes;
  const imageUrl = attributes?.image?.data?.attributes?.formats?.medium?.url;

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* Image */}
        <Box flex="1 1 40%" mb="40px">
          <img
            src={`${process.env.STRAPI_HOST}${imageUrl}`}
            alt={attributes?.name}
            width="300px"
            height="500px"
            style={{ objectFit: "contain" }}
          />
        </Box>
        {/* Actions */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>
          <Box m="65px 0 25px 0">
            <Typography variant="h3">{attributes?.name}</Typography>
            <Typography>${attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {attributes?.longDescription}
            </Typography>
          </Box>

          {/* buttons */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1px solid ${shades.neutral[300]} `}
              mr="20px"
              p="2px 5px"
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
                color: "white",
                ":hover": {
                  bgcolor: "#cccccc",
                  color: "white",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlined />
              <Typography sx={{ ml: "5px" }}>Add to whishlist</Typography>
            </Box>
            <Box>
              {/* capitalize first letter */}
              <Typography>
                {`Category: ${attributes?.category
                  .charAt(0)
                  .toUpperCase()}${attributes?.category
                  .replace(/([A-Z])/g, " $1")
                  .slice(1)}`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box m="20px 0">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Description" value="description"></Tab>
            <Tab label="Reviews" value="reviews"></Tab>
          </Tabs>
          <Box mt="20px" display="flex" flexWrap="wrap" gap="15px">
            {(value === "description" || !value) && attributes?.longDescription}
            {value === "reviews" && "reviews"}
          </Box>
          <Box />
        </Box>

        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Related Products
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            mt="20px"
            columnGap="1.33%"
            justifyContent="space-between"
          >
            {items.slice(0, 4).map((related) => (
              <Item
                item={related}
                key={`${related.name}-${related.id}`}
                width="150px"
                height="250px"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
