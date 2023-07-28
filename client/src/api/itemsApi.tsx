// import { useAppDispatch } from '../state/store';
import { setItems } from '../state/cartReducer';

const fetchItems = async () => {
  const items = await fetch(`${process.env.STRAPI_HOST}/api/items?populate=image`, {
    method: 'GET'
  });
  const json = await items.json();
  console.log('🚀 ~ file: itemsApi.tsx:9 ~ getItems ~ json:', json);

  return json.data;
};

export { fetchItems };
