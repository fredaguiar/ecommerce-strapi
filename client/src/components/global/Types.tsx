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
