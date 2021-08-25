export type TUser = {
  id: number;
  gender: number;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  password: string;
  role: string;
  token: string;
};

type TLocation = {
  lat: number;
  lng: number;
};

type TPlace = {
  city: string;
  address: string;
  location: TLocation;
};

export type TBuy = {
  id: number;
  userId: number;
  status: number;
  created: number;
  deleveredAt: number | null;
  productName: string;
  price: number;
  deleveredTo: TPlace;
  deleveredFrom: TPlace;
  description: string;
};
