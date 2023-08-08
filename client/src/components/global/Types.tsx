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
  };
  name: string;
  id: string;
}
