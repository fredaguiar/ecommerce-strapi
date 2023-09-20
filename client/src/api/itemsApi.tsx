// import { useAppDispatch } from '../state/store';
import { setItems } from "../state/cartReducer";

const fetchItems = async () => {
  const items = await fetch(
    `${process.env.STRAPI_HOST}/api/items?populate=image`,
    {
      method: "GET",
    }
  );
  const json = await items.json();
  if (!json.data) return [];
  return json.data;
};

const fetchItem = async (id: string) => {
  const item = await fetch(
    `${process.env.STRAPI_HOST}/api/items/${id}?populate=image`,
    {
      method: "GET",
    }
  );
  const json = await item.json();
  return json.data;
};

export { fetchItems, fetchItem };
