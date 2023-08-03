// import { useAppDispatch } from '../state/store';
import { setItems } from '../state/cartReducer';

const fetchItems = async () => {
  const items = await fetch(`${process.env.STRAPI_HOST}/api/items?populate=image`, {
    method: 'GET'
  });
  const json = await items.json();
  return json.data;
};

const fetchItem = async (id) => {
  const item = await fetch(`${process.env.STRAPI_HOST}/api/items/${id}?populate=image`, {
    method: 'GET'
  });
  const json = await item.json();
  console.log('🚀 ~ file: itemsApi.tsx:15 ~ fetchItem ~ json.data:', json.data);
  return json.data;
};

export { fetchItems, fetchItem };
