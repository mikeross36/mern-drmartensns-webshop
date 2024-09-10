export type CartItemType = {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
};

export type ShippingAddressType = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};
