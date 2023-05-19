const HOST = `${process.env.REACT_APP_API_HOST}`;
const getItems = async () => {
  const items = await fetch('http://localhost:1337/api/items?populate=image', { method: 'GET' });
};

export { getItems };
