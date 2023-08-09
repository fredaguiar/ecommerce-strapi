export interface IImage {
  data?: {
    attributes?: {
      url?: string;
      formats?: { medium?: { url?: string } };
    };
  };
}

export interface IItem {
  attributes: {
    name: string;
    price: number;
    image: IImage;
    category: string;
    longDescription: string;
    shortDescription: string;
  };
  name: string;
  id: string;
  count: number;
}
