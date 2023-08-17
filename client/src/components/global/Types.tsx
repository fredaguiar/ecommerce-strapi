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
export interface IAddress {
  firstName: string;
  lastName: string;
  street1: string;
  street2: string;
  country: string;
  city: string;
  state: string;
  postal: string;
  isSameAddress?: boolean;
}

export interface IAddressesAll {
  billingAddress: IAddress;
  shippingAddress: IAddress;
  email: string;
  phone: string;
}
